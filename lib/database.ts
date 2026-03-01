import sqlite3 from 'sqlite3'
import path from 'path'
import { promisify } from 'util'

const dbPath = path.join(process.cwd(), 'blog.db')
const db = new sqlite3.Database(dbPath)

// Promisify database methods for easier async/await usage
const dbRun = promisify(db.run.bind(db)) as (
  sql: string,
  ...params: any[]
) => Promise<any>
const dbGet = promisify(db.get.bind(db)) as (
  sql: string,
  ...params: any[]
) => Promise<any>
const dbAll = promisify(db.all.bind(db)) as (
  sql: string,
  ...params: any[]
) => Promise<any[]>

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON')

// Create tables
const createTables = async () => {
  // Blog posts table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      content TEXT NOT NULL,
      featured BOOLEAN DEFAULT FALSE,
      published BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      published_at DATETIME,
      reading_time INTEGER,
      cover_image TEXT,
      author TEXT DEFAULT 'Claude'
    )
  `)

  // Blog tags table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS blog_tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      color TEXT DEFAULT '#06b6d4'
    )
  `)

  // Blog post tags junction table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS blog_post_tags (
      post_id INTEGER,
      tag_id INTEGER,
      PRIMARY KEY (post_id, tag_id),
      FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES blog_tags(id) ON DELETE CASCADE
    )
  `)

  // Update trigger for updated_at
  await dbRun(`
    CREATE TRIGGER IF NOT EXISTS update_blog_posts_updated_at
    AFTER UPDATE ON blog_posts
    BEGIN
      UPDATE blog_posts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END
  `)
}

// Initialize database
createTables().catch(console.error)

export interface BlogPost {
  id: number
  slug: string
  title: string
  description: string | null
  content: string
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
  published_at: string | null
  reading_time: number | null
  cover_image: string | null
  author: string
  tags?: BlogTag[]
}

export interface BlogTag {
  id: number
  name: string
  slug: string
  description: string | null
  color: string
}

export interface CreateBlogPost {
  slug: string
  title: string
  description?: string
  content: string
  featured?: boolean
  published?: boolean
  published_at?: string
  reading_time?: number
  cover_image?: string
  author?: string
  tags?: string[]
}

// Blog post operations
export const blogDb = {
  // Get all published posts
  getPublishedPosts: async (): Promise<BlogPost[]> => {
    const posts = (await dbAll(`
      SELECT * FROM blog_posts 
      WHERE published = 1 
      ORDER BY published_at DESC, created_at DESC
    `)) as BlogPost[]

    // Convert boolean fields
    return posts.map(post => ({
      ...post,
      featured: Boolean(post.featured),
      published: Boolean(post.published),
    }))
  },

  // Get all posts (including drafts)
  getAllPosts: async (): Promise<BlogPost[]> => {
    const posts = (await dbAll(`
      SELECT * FROM blog_posts 
      ORDER BY created_at DESC
    `)) as BlogPost[]

    return posts.map(post => ({
      ...post,
      featured: Boolean(post.featured),
      published: Boolean(post.published),
    }))
  },

  // Get post by slug
  getPostBySlug: async (slug: string): Promise<BlogPost | null> => {
    const post = (await dbGet(
      `
      SELECT * FROM blog_posts 
      WHERE slug = ?
    `,
      slug
    )) as BlogPost | undefined

    if (!post) return null

    // Convert boolean fields
    const convertedPost = {
      ...post,
      featured: Boolean(post.featured),
      published: Boolean(post.published),
    }

    // Get tags for this post
    const tags = (await dbAll(
      `
      SELECT t.* FROM blog_tags t
      JOIN blog_post_tags pt ON t.id = pt.tag_id
      WHERE pt.post_id = ?
    `,
      [post.id]
    )) as BlogTag[]

    convertedPost.tags = tags

    return convertedPost
  },

  // Get featured posts
  getFeaturedPosts: async (limit: number = 3): Promise<BlogPost[]> => {
    const posts = (await dbAll(
      `
      SELECT * FROM blog_posts 
      WHERE published = 1 AND featured = 1 
      ORDER BY published_at DESC, created_at DESC 
      LIMIT ?
    `,
      [limit]
    )) as BlogPost[]

    return posts.map(post => ({
      ...post,
      featured: Boolean(post.featured),
      published: Boolean(post.published),
    }))
  },

  // Create new post
  createPost: async (post: CreateBlogPost): Promise<number> => {
    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO blog_posts (
          slug, title, description, content, featured, published, 
          published_at, reading_time, cover_image, author
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          post.slug,
          post.title,
          post.description || null,
          post.content,
          post.featured ? 1 : 0,
          post.published ? 1 : 0,
          post.published_at || null,
          post.reading_time || null,
          post.cover_image || null,
          post.author || 'Claude',
        ],
        async function (err) {
          if (err) {
            reject(err)
            return
          }

          const postId = this.lastID

          // Add tags if provided
          if (post.tags && post.tags.length > 0) {
            try {
              await blogDb.addTagsToPost(postId, post.tags)
            } catch (error) {
              reject(error)
              return
            }
          }

          resolve(postId)
        }
      )
    })
  },

  // Update post
  updatePost: async (
    id: number,
    post: Partial<CreateBlogPost>
  ): Promise<void> => {
    const ALLOWED_FIELDS = new Set([
      'slug',
      'title',
      'description',
      'content',
      'featured',
      'published',
      'published_at',
      'reading_time',
      'cover_image',
      'author',
    ])

    const fields = Object.keys(post).filter(
      key => key !== 'tags' && ALLOWED_FIELDS.has(key)
    )
    const values = fields.map(field => (post as any)[field])

    if (fields.length > 0) {
      const setClause = fields.map(field => `${field} = ?`).join(', ')
      await dbRun(`UPDATE blog_posts SET ${setClause} WHERE id = ?`, [
        ...values,
        id,
      ])
    }

    // Update tags if provided
    if (post.tags) {
      await blogDb.updatePostTags(id, post.tags)
    }
  },

  // Delete post
  deletePost: async (id: number): Promise<void> => {
    await dbRun('DELETE FROM blog_posts WHERE id = ?', [id])
  },

  // Tag operations
  getAllTags: async (): Promise<BlogTag[]> => {
    return (await dbAll('SELECT * FROM blog_tags ORDER BY name')) as BlogTag[]
  },

  createTag: async (
    name: string,
    slug: string,
    description?: string,
    color?: string
  ): Promise<number> => {
    const result = (await dbRun(
      `
      INSERT INTO blog_tags (name, slug, description, color) 
      VALUES (?, ?, ?, ?)
    `,
      [name, slug, description || null, color || '#06b6d4']
    )) as any
    return result.lastID
  },

  addTagsToPost: async (postId: number, tagNames: string[]): Promise<void> => {
    for (const tagName of tagNames) {
      const slug = tagName.toLowerCase().replace(/\s+/g, '-')

      // Insert tag if it doesn't exist
      await dbRun(
        `
        INSERT OR IGNORE INTO blog_tags (name, slug) 
        VALUES (?, ?)
      `,
        [tagName, slug]
      )

      // Get tag ID
      const tag = (await dbGet(
        'SELECT id FROM blog_tags WHERE name = ?',
        tagName
      )) as { id: number } | undefined

      if (tag) {
        // Link post to tag
        await dbRun(
          `
          INSERT OR IGNORE INTO blog_post_tags (post_id, tag_id) 
          VALUES (?, ?)
        `,
          [postId, tag.id]
        )
      }
    }
  },

  updatePostTags: async (postId: number, tagNames: string[]): Promise<void> => {
    // Remove existing tags
    await dbRun('DELETE FROM blog_post_tags WHERE post_id = ?', [postId])

    // Add new tags
    if (tagNames.length > 0) {
      await blogDb.addTagsToPost(postId, tagNames)
    }
  },

  // Get posts by tag
  getPostsByTag: async (tagSlug: string): Promise<BlogPost[]> => {
    const posts = (await dbAll(
      `
      SELECT p.* FROM blog_posts p
      JOIN blog_post_tags pt ON p.id = pt.post_id
      JOIN blog_tags t ON pt.tag_id = t.id
      WHERE t.slug = ? AND p.published = 1
      ORDER BY p.published_at DESC, p.created_at DESC
    `,
      [tagSlug]
    )) as BlogPost[]

    return posts.map(post => ({
      ...post,
      featured: Boolean(post.featured),
      published: Boolean(post.published),
    }))
  },
}

export default db

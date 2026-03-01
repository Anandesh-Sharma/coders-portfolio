import { NextRequest } from 'next/server'
import { blogDb } from '@/lib/database'
import {
  validateAuth,
  createAuthResponse,
  createErrorResponse,
  createSuccessResponse,
} from '@/lib/auth'
import { generateSlug, estimateReadingTime } from '@/lib/mdx-utils'
import { validateBlogPost } from '@/lib/validation'

// GET /api/blog - Get all posts (published only for unauthenticated, all for authenticated)
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const includeUnpublished =
      url.searchParams.get('includeUnpublished') === 'true'

    if (includeUnpublished) {
      // Require authentication for unpublished posts
      if (!validateAuth(request)) {
        return createAuthResponse()
      }
      const posts = await blogDb.getAllPosts()
      return createSuccessResponse({ posts })
    } else {
      const posts = await blogDb.getPublishedPosts()
      return createSuccessResponse({ posts })
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return createErrorResponse('Failed to fetch posts', 500)
  }
}

// POST /api/blog - Create a new blog post
export async function POST(request: NextRequest) {
  if (!validateAuth(request)) {
    return createAuthResponse()
  }

  try {
    const body = await request.json()

    // Validate input
    const validation = validateBlogPost(body)
    if (!validation.valid) {
      return createErrorResponse(
        validation.errors.map(e => e.message).join('; ')
      )
    }

    const {
      title,
      description,
      content,
      featured,
      published,
      published_at,
      cover_image,
      author,
      tags,
    } = body

    // Generate slug from title if not provided
    const slug = body.slug || generateSlug(title)

    // Calculate reading time
    const reading_time = estimateReadingTime(content)

    // Create the post
    await blogDb.createPost({
      slug,
      title,
      description,
      content,
      featured: featured || false,
      published: published || false,
      published_at:
        published_at || (published ? new Date().toISOString() : null),
      reading_time,
      cover_image,
      author: author || 'Claude',
      tags: tags || [],
    })

    // Get the created post
    const createdPost = await blogDb.getPostBySlug(slug)

    return createSuccessResponse(
      {
        message: 'Post created successfully',
        post: createdPost,
      },
      201
    )
  } catch (error) {
    console.error('Error creating post:', error)
    if (
      error instanceof Error &&
      error.message.includes('UNIQUE constraint failed')
    ) {
      return createErrorResponse('A post with this slug already exists')
    }
    return createErrorResponse('Failed to create post', 500)
  }
}

// DELETE /api/blog - Delete all posts (dangerous operation, requires special header)
export async function DELETE(request: NextRequest) {
  if (!validateAuth(request)) {
    return createAuthResponse()
  }

  const confirmHeader = request.headers.get('X-Confirm-Delete-All')
  if (confirmHeader !== 'yes-delete-all-posts') {
    return createErrorResponse(
      'This operation requires X-Confirm-Delete-All header with value "yes-delete-all-posts"'
    )
  }

  try {
    // This is a dangerous operation - delete all posts
    // We'll implement this by getting all posts and deleting them individually
    const allPosts = await blogDb.getAllPosts()
    for (const post of allPosts) {
      await blogDb.deletePost(post.id)
    }
    return createSuccessResponse({
      message: `Deleted ${allPosts.length} posts successfully`,
    })
  } catch (error) {
    console.error('Error deleting all posts:', error)
    return createErrorResponse('Failed to delete posts', 500)
  }
}

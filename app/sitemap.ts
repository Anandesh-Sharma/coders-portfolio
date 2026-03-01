import { MetadataRoute } from 'next'
import { blogDb } from '@/lib/database'
import { siteConfig } from '@/lib/siteConfig'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url || 'http://localhost:3000'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // Get all published blog posts
  const posts = await blogDb.getPublishedPosts()

  const blogPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Get all tags
  const tags = await blogDb.getAllTags()

  const tagPages = tags.map(tag => ({
    url: `${baseUrl}/blog?tag=${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }))

  return [...staticPages, ...blogPages, ...tagPages]
}

import { Metadata } from 'next'
import { blogDb } from '@/lib/database'
import { BlogListClient } from '@/components/blog/BlogListClient'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Latest posts about web development, technology, and coding insights.',
  openGraph: {
    title: 'Blog - Claude Portfolio',
    description:
      'Latest posts about web development, technology, and coding insights.',
    url: `${siteConfig.url}/blog`,
  },
}

// Enable dynamic rendering to show new posts immediately
export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await blogDb.getPublishedPosts()
  const featuredPosts = await blogDb.getFeaturedPosts(3)
  const allTags = await blogDb.getAllTags()

  return (
    <div className="min-h-screen bg-bg">
      <BlogListClient
        posts={posts}
        featuredPosts={featuredPosts}
        tags={allTags}
      />
    </div>
  )
}

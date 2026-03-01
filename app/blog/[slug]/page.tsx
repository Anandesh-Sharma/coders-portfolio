import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogDb } from '@/lib/database'
import { BlogPostClient } from '@/components/blog/BlogPostClient'
import { siteConfig } from '@/lib/siteConfig'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await blogDb.getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.description || undefined,
    openGraph: {
      title: post.title,
      description: post.description || undefined,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at,
      authors: [post.author],
      images: post.cover_image ? [post.cover_image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || undefined,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  }
}

// Remove generateStaticParams to enable dynamic rendering
// This allows new posts added via API to be immediately accessible
export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await blogDb.getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same tags, excluding current post)
  const allPosts = await blogDb.getPublishedPosts()
  const relatedPosts = allPosts
    .filter(
      p =>
        p.id !== post.id &&
        p.tags?.some(tag => post.tags?.some(postTag => postTag.id === tag.id))
    )
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-bg">
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </div>
  )
}

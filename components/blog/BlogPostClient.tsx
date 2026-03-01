'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Tag, Share, Check } from 'lucide-react'
import Link from 'next/link'
import { BlogPost } from '@/lib/database'
import { SimpleMDXRenderer } from './SimpleMDXRenderer'

interface BlogPostClientProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleShare = async () => {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description || '',
          url: url,
        })
      } catch (error) {
        // Fallback to copy
        copyToClipboard(url)
      }
    } else {
      copyToClipboard(url)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-text-secondary hover:text-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog</span>
        </Link>
      </motion.div>

      {/* Article Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        {post.featured && (
          <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full border border-accent/20 mb-4">
            Featured Post
          </span>
        )}

        <h1 className="text-3xl md:text-5xl font-bold text-text mb-6 leading-tight">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            {post.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-6 text-text-secondary text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.published_at || post.created_at}>
              {formatDate(post.published_at || post.created_at)}
            </time>
          </div>

          {post.reading_time && (
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{post.reading_time} min read</span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <span>By {post.author}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-text-secondary hover:text-accent transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share className="h-4 w-4" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center space-x-3 mt-6">
            <Tag className="h-4 w-4 text-text-secondary" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link
                  key={tag.id}
                  href={`/blog?tag=${tag.slug}`}
                  className="px-3 py-1 bg-bg-secondary border border-border rounded-full text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.header>

      {/* Article Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="blog-content max-w-none"
      >
        <SimpleMDXRenderer content={post.content} />
      </motion.div>

      {/* Article Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 pt-8 border-t border-border"
      >
        <div className="flex items-center justify-between">
          <div className="text-text-secondary">
            <p>
              Published on {formatDate(post.published_at || post.created_at)}
            </p>
            {post.updated_at !== post.created_at && (
              <p className="text-sm">
                Updated on {formatDate(post.updated_at)}
              </p>
            )}
          </div>

          <button onClick={handleShare} className="btn-secondary">
            Share Article
          </button>
        </div>
      </motion.footer>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold text-text mb-8">Related Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <motion.article
                key={relatedPost.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${relatedPost.slug}`}>
                  <div className="card-hover h-full p-6">
                    <div className="flex items-center space-x-2 text-text-secondary text-sm mb-3">
                      <Calendar className="h-4 w-4" />
                      <time
                        dateTime={
                          relatedPost.published_at || relatedPost.created_at
                        }
                      >
                        {formatDate(
                          relatedPost.published_at || relatedPost.created_at
                        )}
                      </time>
                    </div>

                    <h3 className="font-bold text-text mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>

                    {relatedPost.description && (
                      <p className="text-sm text-text-secondary line-clamp-3">
                        {relatedPost.description}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.section>
      )}

      {/* Newsletter CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-20"
      >
        <div className="card p-8 text-center bg-gradient-to-r from-bg-secondary/50 to-bg/50">
          <h3 className="text-xl font-bold text-text mb-4">
            Enjoyed this post?
          </h3>
          <p className="text-text-secondary mb-6">
            Subscribe to get notified when I publish new content about web
            development and technology.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-bg border border-border rounded-lg text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </motion.section>
    </article>
  )
}

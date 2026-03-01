'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import { BlogPost, BlogTag } from '@/lib/database'

interface BlogListClientProps {
  posts: BlogPost[]
  featuredPosts: BlogPost[]
  tags: BlogTag[]
}

export function BlogListClient({
  posts,
  featuredPosts,
  tags,
}: BlogListClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTag =
      selectedTag === null || post.tags?.some(tag => tag.slug === selectedTag)

    return matchesSearch && matchesTag
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTag(null)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">Blog</h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Thoughts, tutorials, and insights about web development, technology,
          and best practices.
        </p>
      </motion.div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-text mb-8">Featured Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="card-hover h-full p-6">
                    <div className="flex items-center space-x-4 text-text-secondary text-sm mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.published_at || post.created_at}>
                          {formatDate(post.published_at || post.created_at)}
                        </time>
                      </div>
                      {post.reading_time && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.reading_time} min read</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-text mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {post.description && (
                      <p className="text-text-secondary mb-4 line-clamp-3">
                        {post.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
                        Featured
                      </span>
                      <span className="text-accent hover:text-accent-hover transition-colors text-sm font-medium">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.section>
      )}

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-12"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-bg-secondary border border-border rounded-lg text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-bg-secondary border border-border rounded-lg text-text hover:border-accent transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Tags */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-bg-secondary border border-border rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text">Filter by Tags</h3>
              {(searchTerm || selectedTag) && (
                <button
                  onClick={clearFilters}
                  className="text-accent hover:text-accent-hover text-sm"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag.slug ? null : tag.slug)
                  }
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    selectedTag === tag.slug
                      ? 'bg-accent text-bg border-accent'
                      : 'bg-bg border-border text-text-secondary hover:border-accent hover:text-text'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Posts Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-text">
            All Posts {filteredPosts.length > 0 && `(${filteredPosts.length})`}
          </h2>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="card-hover h-full p-6">
                    <div className="flex items-center space-x-4 text-text-secondary text-sm mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.published_at || post.created_at}>
                          {formatDate(post.published_at || post.created_at)}
                        </time>
                      </div>
                      {post.reading_time && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.reading_time} min read</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-text mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>

                    {post.description && (
                      <p className="text-text-secondary mb-4 line-clamp-3">
                        {post.description}
                      </p>
                    )}

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center space-x-2 mb-4">
                        <Tag className="h-4 w-4 text-text-secondary" />
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag.id}
                              className="px-2 py-1 bg-bg-secondary border border-border rounded text-xs text-text-secondary"
                            >
                              {tag.name}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs text-accent">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      {post.featured && (
                        <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
                          Featured
                        </span>
                      )}
                      <span className="text-accent hover:text-accent-hover transition-colors text-sm font-medium ml-auto">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-text-secondary mb-4">
              {searchTerm || selectedTag
                ? 'No posts found matching your criteria.'
                : 'No posts available yet.'}
            </p>
            {(searchTerm || selectedTag) && (
              <button
                onClick={clearFilters}
                className="text-accent hover:text-accent-hover"
              >
                Clear filters to see all posts
              </button>
            )}
          </div>
        )}
      </motion.section>

      {/* Newsletter Signup */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-20"
      >
        <div className="card p-8 text-center bg-gradient-to-r from-bg-secondary/50 to-bg/50">
          <h3 className="text-2xl font-bold text-text mb-4">Stay Updated</h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Get notified when I publish new posts about web development,
            technology insights, and coding tutorials.
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
          <p className="text-sm text-text-secondary mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </motion.section>
    </div>
  )
}

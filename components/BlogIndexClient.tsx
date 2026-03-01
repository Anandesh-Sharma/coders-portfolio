'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'
import { BlogPost } from '@/lib/database'

interface BlogIndexClientProps {
  posts: BlogPost[]
}

export function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section id="blog" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="heading-2 text-text mb-4"
            >
              Latest Blog Posts
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="body-large max-w-2xl mx-auto"
            >
              Thoughts, tutorials, and insights about web development,
              technology, and best practices.
            </motion.p>
          </div>

          {/* Blog Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="card-hover h-full p-6">
                      {/* Post Meta */}
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

                      {/* Post Title */}
                      <h3 className="heading-4 text-text mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Post Description */}
                      {post.description && (
                        <p className="body-base mb-4 line-clamp-3">
                          {post.description}
                        </p>
                      )}

                      {/* Tags */}
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
                              <span className="px-2 py-1 bg-bg-secondary border border-border rounded text-xs text-accent">
                                +{post.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Featured Badge */}
                      {post.featured && (
                        <div className="mb-4">
                          <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
                            Featured Post
                          </span>
                        </div>
                      )}

                      {/* Read More */}
                      <div className="flex items-center text-accent group-hover:text-accent-hover transition-colors">
                        <span className="text-sm font-medium">Read More</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="ml-2"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <div className="card p-8">
                <h3 className="heading-3 text-text mb-4">Coming Soon</h3>
                <p className="body-large mb-8">
                  I&apos;m working on some exciting blog posts about web
                  development, best practices, and the latest technologies. Stay
                  tuned!
                </p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/rss.xml"
                  className="btn-secondary"
                >
                  Subscribe to RSS
                </motion.a>
              </div>
            </motion.div>
          )}

          {/* View All Posts Link */}
          {posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/blog"
                className="btn-secondary"
              >
                View All Posts
              </motion.a>
            </motion.div>
          )}

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="card p-8 text-center bg-gradient-to-r from-bg-secondary/50 to-bg/50">
              <h3 className="heading-3 text-text mb-4">Stay Updated</h3>
              <p className="body-large mb-8 max-w-2xl mx-auto">
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn-primary"
                >
                  Subscribe
                </motion.button>
              </form>

              <p className="body-small mt-4">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { ArrowUp, Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'
import { scrollToElement } from '@/lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail,
  }

  return (
    <footer id="contact" className="bg-bg-secondary/50 border-t border-border">
      <div className="container">
        {/* Main Footer Content */}
        <div className="section-padding">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* About Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="heading-3 text-text mb-4">
                  Let&apos;s Work Together
                </h3>
                <p className="body-large mb-6 max-w-lg">
                  I&apos;m always interested in new opportunities and exciting
                  projects. Whether you have a project in mind or just want to
                  chat about technology, feel free to reach out.
                </p>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${siteConfig.author.email}`}
                  className="btn-primary"
                >
                  Get In Touch
                </motion.a>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="heading-4 text-text mb-6">Quick Links</h4>
                <nav className="space-y-3">
                  {siteConfig.navigation.map(item => (
                    <button
                      key={item.name}
                      onClick={() =>
                        scrollToElement(item.href.replace('#', ''))
                      }
                      className="block text-text-secondary hover:text-accent transition-colors"
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>
              </motion.div>
            </div>

            {/* Connect */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="heading-4 text-text mb-6">Connect</h4>
                <div className="space-y-4">
                  {Object.entries(siteConfig.social).map(([platform, url]) => {
                    const Icon =
                      socialIcons[platform as keyof typeof socialIcons]
                    if (!Icon) return null

                    return (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-3 text-text-secondary hover:text-accent transition-colors group"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="capitalize">{platform}</span>
                      </motion.a>
                    )
                  })}
                </div>

                {/* Additional Contact Info */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="body-small mb-2">
                    <strong className="text-text">Email:</strong>
                  </p>
                  <a
                    href={`mailto:${siteConfig.author.email}`}
                    className="text-accent hover:text-accent-hover transition-colors"
                  >
                    {siteConfig.author.email}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center space-x-1 text-text-secondary"
            >
              <span>
                © {currentYear} {siteConfig.author.name}. Made with
              </span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>and lots of</span>
              <span className="text-accent">code</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center space-x-6"
            >
              {/* Tech Stack */}
              <div className="flex items-center space-x-2 text-text-secondary text-sm">
                <span>Built with</span>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover transition-colors"
                >
                  Next.js
                </a>
                <span>&</span>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover transition-colors"
                >
                  Tailwind CSS
                </a>
              </div>

              {/* Back to Top */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleScrollToTop}
                className="p-2 bg-bg-secondary rounded-full text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors"
                aria-label="Back to top"
              >
                <ArrowUp className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

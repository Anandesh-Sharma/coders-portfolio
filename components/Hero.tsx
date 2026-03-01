'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'
import { scrollToElement } from '@/lib/utils'

export function Hero() {
  const handleScrollToAbout = () => {
    scrollToElement('about')
  }

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail,
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg to-bg-secondary" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-accent font-medium"
            >
              Hello, I&apos;m
            </motion.p>

            <h1 className="heading-1 text-text">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block"
              >
                {siteConfig.author.name}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-secondary"
            >
              {siteConfig.author.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-2xl mx-auto body-large"
            >
              Specializing in modern web technologies, TypeScript, and creating
              exceptional user experiences. Let&apos;s build something amazing
              together.
            </motion.p>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center space-x-6 mt-8"
          >
            {Object.entries(siteConfig.social).map(([platform, url]) => {
              const Icon = socialIcons[platform as keyof typeof socialIcons]
              if (!Icon) return null

              return (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-bg-secondary/50 border border-border text-text-secondary hover:text-accent hover:border-accent/50 transition-all duration-300"
                  aria-label={`Follow on ${platform}`}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              )
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollToAbout}
              className="btn-primary"
            >
              Learn More About Me
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View My Work
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={handleScrollToAbout}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 text-text-secondary hover:text-accent transition-colors"
              aria-label="Scroll to content"
            >
              <ArrowDown className="h-6 w-6" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

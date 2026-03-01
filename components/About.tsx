'use client'

import { motion } from 'framer-motion'
import { MapPin, Mail, Calendar } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'

export function About() {
  return (
    <section id="about" className="section-padding bg-bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
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
              About Me
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="body-large max-w-2xl mx-auto"
            >
              Get to know more about my background, skills, and what drives me
              as a developer.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="card p-6">
                <h3 className="heading-4 text-text mb-6">Personal Info</h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="body-base">
                      {siteConfig.author.location}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                    <a
                      href={`mailto:${siteConfig.author.email}`}
                      className="body-base link"
                    >
                      {siteConfig.author.email}
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="body-base">Available for projects</span>
                  </div>
                </div>

                {/* Download Resume Button */}
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="/resume.pdf"
                  download
                  className="btn-primary w-full mt-6"
                >
                  Download Resume
                </motion.a>
              </div>
            </motion.div>

            {/* Bio and Story */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="heading-4 text-text mb-4">My Story</h3>
                  <div className="prose prose-lg max-w-none text-text-secondary space-y-4">
                    <p>{siteConfig.author.bio}</p>

                    <p>
                      My approach to development is centered around creating
                      solutions that are not only technically sound but also
                      accessible, performant, and user-friendly. I believe in
                      writing clean, maintainable code and following best
                      practices that scale with growing teams and products.
                    </p>

                    <p>
                      Whether it&apos;s architecting a complex web application,
                      optimizing for performance, or implementing accessibility
                      features, I&apos;m passionate about leveraging technology
                      to solve real-world problems and create meaningful digital
                      experiences.
                    </p>
                  </div>
                </div>

                {/* Current Focus */}
                <div>
                  <h3 className="heading-4 text-text mb-4">Current Focus</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="card p-4">
                      <h4 className="font-semibold text-text mb-2">
                        Modern Web Development
                      </h4>
                      <p className="body-small">
                        Building scalable applications with Next.js, React, and
                        TypeScript
                      </p>
                    </div>

                    <div className="card p-4">
                      <h4 className="font-semibold text-text mb-2">
                        Developer Experience
                      </h4>
                      <p className="body-small">
                        Creating tools and processes that improve developer
                        productivity
                      </p>
                    </div>

                    <div className="card p-4">
                      <h4 className="font-semibold text-text mb-2">
                        Accessibility
                      </h4>
                      <p className="body-small">
                        Ensuring web applications are usable by everyone,
                        regardless of ability
                      </p>
                    </div>

                    <div className="card p-4">
                      <h4 className="font-semibold text-text mb-2">
                        Performance
                      </h4>
                      <p className="body-small">
                        Optimizing applications for speed, efficiency, and great
                        user experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

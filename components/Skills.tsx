'use client'

import { motion } from 'framer-motion'
import {
  Code,
  Database,
  Wrench,
  Palette,
  Globe,
  Server,
  Smartphone,
  Zap,
} from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'

const skillIcons = {
  'Frontend Development': Code,
  'Backend Development': Server,
  'Tools & Technologies': Wrench,
  'Design & UX': Palette,
  'Web Technologies': Globe,
  Database: Database,
  'Mobile Development': Smartphone,
  Performance: Zap,
}

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-bg-secondary/30">
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
              Skills & Technologies
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="body-large max-w-2xl mx-auto"
            >
              A comprehensive overview of my technical expertise and the tools I
              use to bring ideas to life.
            </motion.p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {Object.entries(siteConfig.skills).map(
              ([category, skills], index) => {
                const IconComponent =
                  skillIcons[category as keyof typeof skillIcons] || Code

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="card-hover h-full p-8">
                      {/* Category Header */}
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                          <IconComponent className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="heading-4 text-text">{category}</h3>
                      </div>

                      {/* Skills List */}
                      <div className="space-y-3">
                        {skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.1 + skillIndex * 0.05,
                            }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-3 group/skill"
                          >
                            <div className="w-2 h-2 bg-accent rounded-full group-hover/skill:scale-125 transition-transform" />
                            <span className="body-base group-hover/skill:text-text transition-colors">
                              {skill}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Skill Count */}
                      <div className="mt-6 pt-6 border-t border-border">
                        <span className="text-sm text-text-secondary">
                          {skills.length}{' '}
                          {skills.length === 1 ? 'skill' : 'skills'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              }
            )}
          </div>

          {/* Additional Skills Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="card p-8 text-center">
              <h3 className="heading-3 text-text mb-4">Always Learning</h3>
              <p className="body-large mb-8 max-w-3xl mx-auto">
                Technology evolves rapidly, and I&apos;m committed to staying
                current with the latest tools, frameworks, and best practices.
                I&apos;m always exploring new technologies and methodologies to
                enhance my development capabilities.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-bg-secondary rounded-lg border border-border">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-3">
                    <Code className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="font-semibold text-text mb-2">Clean Code</h4>
                  <p className="body-small">
                    Writing maintainable, readable, and efficient code
                  </p>
                </div>

                <div className="p-4 bg-bg-secondary rounded-lg border border-border">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-3">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="font-semibold text-text mb-2">Performance</h4>
                  <p className="body-small">
                    Optimizing applications for speed and efficiency
                  </p>
                </div>

                <div className="p-4 bg-bg-secondary rounded-lg border border-border">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-3">
                    <Globe className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="font-semibold text-text mb-2">
                    Accessibility
                  </h4>
                  <p className="body-small">
                    Building inclusive web experiences for all users
                  </p>
                </div>

                <div className="p-4 bg-bg-secondary rounded-lg border border-border">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-3">
                    <Palette className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="font-semibold text-text mb-2">UX Focus</h4>
                  <p className="body-small">
                    Prioritizing user experience in every design decision
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

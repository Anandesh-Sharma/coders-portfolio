'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'

export function Experience() {
  return (
    <section id="experience" className="section-padding">
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
              Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="body-large max-w-2xl mx-auto"
            >
              My professional journey and the experiences that have shaped my
              development skills.
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-12">
              {siteConfig.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative flex"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-accent rounded-full border-4 border-bg z-10" />

                  {/* Content */}
                  <div className="ml-20 flex-1">
                    <div className="card p-6 hover:border-accent/50 transition-colors duration-300">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <h3 className="heading-4 text-text">{exp.role}</h3>
                          <p className="text-lg font-semibold text-accent mt-1">
                            {exp.company}
                          </p>
                        </div>

                        <div className="flex flex-col sm:items-end space-y-1 mt-2 sm:mt-0">
                          <div className="flex items-center space-x-2 text-text-secondary">
                            <Calendar className="h-4 w-4" />
                            <span className="body-small">{exp.period}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-text-secondary">
                            <MapPin className="h-4 w-4" />
                            <span className="body-small">{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="body-base mb-4">{exp.description}</p>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-text mb-3 flex items-center">
                          <Briefcase className="h-4 w-4 mr-2" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map(
                            (achievement, achievementIndex) => (
                              <li
                                key={achievementIndex}
                                className="body-base flex items-start"
                              >
                                <span className="text-accent mr-2 mt-1.5 block w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                {achievement}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold text-text mb-3">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map(tech => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-bg-secondary border border-border rounded-full text-sm text-text-secondary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <h3 className="heading-3 text-text mb-4">
              Interested in working together?
            </h3>
            <p className="body-large mb-8">
              I&apos;m always open to discussing new opportunities and
              challenging projects.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${siteConfig.author.email}`}
              className="btn-primary"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

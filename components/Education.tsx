'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'

export function Education() {
  return (
    <section id="education" className="section-padding bg-bg-secondary/30">
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
              Education
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="body-large max-w-2xl mx-auto"
            >
              My educational background and continuous learning journey in
              technology.
            </motion.p>
          </div>

          {/* Education Items */}
          <div className="space-y-8">
            {siteConfig.education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="card-hover p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Institution Info */}
                    <div className="md:col-span-2">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <GraduationCap className="h-6 w-6 text-accent" />
                        </div>

                        <div className="flex-1">
                          <h3 className="heading-4 text-text mb-2">
                            {edu.degree}
                          </h3>
                          <p className="text-lg font-semibold text-accent mb-1">
                            {edu.institution}
                          </p>
                          <p className="body-base mb-4">{edu.field}</p>

                          <div className="flex items-center space-x-2 text-text-secondary mb-4">
                            <Calendar className="h-4 w-4" />
                            <span className="body-small">{edu.period}</span>
                          </div>

                          <p className="body-base mb-6">{edu.description}</p>

                          {/* Achievements */}
                          {edu.achievements && (
                            <div>
                              <h4 className="font-semibold text-text mb-3 flex items-center">
                                <Award className="h-4 w-4 mr-2" />
                                Key Learning Outcomes
                              </h4>
                              <ul className="space-y-2">
                                {edu.achievements.map(
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
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Visual Element */}
                    <div className="md:col-span-1 flex items-center justify-center">
                      <div className="relative">
                        {/* Decorative background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl transform rotate-6" />
                        <div className="relative bg-bg-secondary border border-border rounded-2xl p-6 text-center">
                          <GraduationCap className="h-12 w-12 text-accent mx-auto mb-3" />
                          <p className="font-semibold text-text text-sm">
                            {edu.degree}
                          </p>
                          <p className="text-accent text-xs mt-1">
                            {edu.period}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Continuous Learning Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="card p-8 text-center">
              <h3 className="heading-3 text-text mb-4">Continuous Learning</h3>
              <p className="body-large mb-8 max-w-2xl mx-auto">
                Technology evolves rapidly, and I believe in staying current
                through continuous learning and hands-on practice with the
                latest tools and frameworks.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-bg-secondary rounded-lg">
                  <h4 className="font-semibold text-text mb-2">
                    Online Courses
                  </h4>
                  <p className="body-small">
                    Regular participation in advanced web development courses
                  </p>
                </div>

                <div className="p-4 bg-bg-secondary rounded-lg">
                  <h4 className="font-semibold text-text mb-2">
                    Tech Communities
                  </h4>
                  <p className="body-small">
                    Active member of developer communities and forums
                  </p>
                </div>

                <div className="p-4 bg-bg-secondary rounded-lg">
                  <h4 className="font-semibold text-text mb-2">Open Source</h4>
                  <p className="body-small">
                    Contributing to open-source projects and learning from peers
                  </p>
                </div>

                <div className="p-4 bg-bg-secondary rounded-lg">
                  <h4 className="font-semibold text-text mb-2">Conferences</h4>
                  <p className="body-small">
                    Attending tech conferences and workshops regularly
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

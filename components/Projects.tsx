'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { siteConfig } from '@/lib/siteConfig'
import { ProjectCard } from './ProjectCard'

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
  category: string
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<'all' | 'featured' | string>('all')

  const categories = [
    'all',
    'featured',
    ...Array.from(new Set(siteConfig.projects.map(p => p.category))),
  ]

  const filteredProjects = siteConfig.projects.filter(project => {
    if (filter === 'all') return true
    if (filter === 'featured') return project.featured
    return project.category === filter
  })

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="section-padding">
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
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="body-large max-w-2xl mx-auto"
            >
              A showcase of my recent work, featuring modern web applications
              built with cutting-edge technologies.
            </motion.p>
          </div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === category
                    ? 'bg-accent text-bg'
                    : 'bg-bg-secondary text-text-secondary hover:text-text border border-border'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="body-large">No projects found for this category.</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-bg border border-border rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-bg/80 backdrop-blur-sm rounded-full text-text hover:text-accent transition-colors"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="overflow-y-auto max-h-[90vh]">
                {/* Project Image */}
                <div className="relative h-64 sm:h-80">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />

                  {/* Project badges */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span className="px-3 py-1 bg-bg/80 backdrop-blur-sm text-text text-sm font-medium rounded-full border border-border">
                      {selectedProject.category}
                    </span>
                    {selectedProject.featured && (
                      <span className="px-3 py-1 bg-accent text-bg text-sm font-semibold rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <h3 className="heading-2 text-text mb-4">
                    {selectedProject.title}
                  </h3>

                  <p className="body-large mb-6">
                    {selectedProject.longDescription}
                  </p>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="heading-4 text-text mb-4">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-bg-secondary border border-border rounded-full text-sm text-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>View Live Demo</span>
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center justify-center space-x-2"
                    >
                      <Github className="h-5 w-5" />
                      <span>View Source Code</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

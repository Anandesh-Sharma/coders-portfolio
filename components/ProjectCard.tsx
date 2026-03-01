'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'

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

interface ProjectCardProps {
  project: Project
  index: number
  onViewDetails: (project: Project) => void
}

export function ProjectCard({
  project,
  index,
  onViewDetails,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="card-hover h-full overflow-hidden">
        {/* Project Image */}
        <div className="relative h-48 bg-bg-secondary overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 bg-accent text-bg text-xs font-semibold rounded-full">
                Featured
              </span>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 bg-bg/80 backdrop-blur-sm text-text text-xs font-medium rounded-full border border-border">
              {project.category}
            </span>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick actions */}
          <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-bg/80 backdrop-blur-sm rounded-full text-text hover:text-accent transition-colors"
              aria-label="View live project"
            >
              <ExternalLink className="h-4 w-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-bg/80 backdrop-blur-sm rounded-full text-text hover:text-accent transition-colors"
              aria-label="View source code"
            >
              <Github className="h-4 w-4" />
            </motion.a>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="heading-4 text-text mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          <p className="body-base mb-4 line-clamp-3">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 4).map(tech => (
              <span
                key={tech}
                className="px-2 py-1 bg-bg-secondary border border-border rounded text-xs text-text-secondary"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-bg-secondary border border-border rounded text-xs text-accent">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:text-accent-hover transition-colors flex items-center space-x-1"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-text transition-colors flex items-center space-x-1"
              >
                <Github className="h-4 w-4" />
                <span>Code</span>
              </a>
            </div>

            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => onViewDetails(project)}
              className="text-sm text-accent hover:text-accent-hover transition-colors flex items-center space-x-1"
            >
              <span>View Details</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

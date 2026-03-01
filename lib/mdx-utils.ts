import { compile } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'

export interface MdxProcessingOptions {
  rehypePlugins?: any[]
  remarkPlugins?: any[]
}

export async function processMdx(
  content: string,
  options: MdxProcessingOptions = {}
) {
  const {
    rehypePlugins = [rehypeHighlight, rehypeSlug],
    remarkPlugins = [remarkGfm],
  } = options

  try {
    const compiled = await compile(content, {
      outputFormat: 'function-body',
      development: process.env.NODE_ENV === 'development',
      remarkPlugins,
      rehypePlugins,
      jsx: true,
      jsxImportSource: 'react',
      jsxRuntime: 'automatic',
    })

    return compiled.toString()
  } catch (error) {
    console.error('MDX compilation error:', error)
    throw new Error('Failed to compile MDX content')
  }
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

export function estimateReadingTime(content: string): number {
  // Remove MDX/HTML tags and count words
  const plainText = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .replace(/[#*_~`]/g, '') // Remove markdown formatting
    .trim()

  const wordCount = plainText
    .split(/\s+/)
    .filter(word => word.length > 0).length
  const wordsPerMinute = 200 // Average reading speed
  return Math.ceil(wordCount / wordsPerMinute)
}

export function extractMetaFromMdx(content: string) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) return { content, meta: {} }

  const frontmatter = frontmatterMatch[1]
  const contentWithoutFrontmatter = content.replace(
    /^---\n([\s\S]*?)\n---\n?/,
    ''
  )

  // Simple frontmatter parser
  const meta: Record<string, any> = {}
  const lines = frontmatter.split('\n')

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()

      // Handle arrays (tags, etc.)
      if (value.startsWith('[') && value.endsWith(']')) {
        meta[key.trim()] = value
          .slice(1, -1)
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, ''))
      }
      // Handle booleans
      else if (value === 'true' || value === 'false') {
        meta[key.trim()] = value === 'true'
      }
      // Handle strings
      else {
        meta[key.trim()] = value.replace(/^["']|["']$/g, '')
      }
    }
  }

  return { content: contentWithoutFrontmatter, meta }
}

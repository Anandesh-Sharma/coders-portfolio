'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Copy, Check } from 'lucide-react'
import Prism from 'prismjs'

// Import Prism languages
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-diff'

interface MDXRendererProps {
  content: string
}

export function MDXRenderer({ content }: MDXRendererProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Apply Prism highlighting after component renders
    setTimeout(() => Prism.highlightAll(), 100)
  }, [content])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Normalize language names for Prism
  const normalizeLanguage = (lang: string) => {
    const languageMap: { [key: string]: string } = {
      js: 'javascript',
      ts: 'typescript',
      py: 'python',
      sh: 'bash',
      shell: 'bash',
      html: 'markup',
      xml: 'markup',
      md: 'markdown',
      yml: 'yaml',
      yaml: 'yaml',
    }
    return languageMap[lang?.toLowerCase()] || lang?.toLowerCase() || 'text'
  }

  const components = {
    // Headers with proper styling
    h1: ({ children }: any) => (
      <h1 className="text-4xl md:text-5xl font-bold text-text mb-8 mt-12 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-4xl font-bold text-text mb-6 mt-10 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-3xl font-bold text-text mb-4 mt-8 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl md:text-2xl font-bold text-text mb-4 mt-6 leading-tight">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-lg md:text-xl font-bold text-text mb-3 mt-6 leading-tight">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-base md:text-lg font-bold text-text mb-3 mt-4 leading-tight">
        {children}
      </h6>
    ),

    // Paragraphs with proper spacing
    p: ({ children }: any) => (
      <p className="text-text-secondary leading-relaxed mb-6 text-base md:text-lg">
        {children}
      </p>
    ),

    // Enhanced links with external link handling
    a: ({ href, children }: any) => (
      <a
        href={href}
        className="text-accent hover:text-accent/80 underline underline-offset-2 hover:underline-offset-4 transition-all"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),

    // Enhanced code blocks with syntax highlighting
    pre: ({ children }: any) => {
      const codeElement = children?.props
      const code = codeElement?.children
      const language =
        codeElement?.className?.replace('language-', '') || 'text'
      const normalizedLang = normalizeLanguage(language)

      return (
        <div className="relative group my-8">
          <div className="bg-bg-secondary border border-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-bg border-b border-border">
              <span className="text-xs text-text-secondary font-mono uppercase tracking-wide">
                {normalizedLang}
              </span>
              <button
                onClick={() => copyToClipboard(code)}
                className="flex items-center space-x-2 px-3 py-1 text-xs text-text-secondary hover:text-text bg-bg-secondary hover:bg-bg border border-border rounded transition-all opacity-0 group-hover:opacity-100"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className={`language-${normalizedLang} p-4 overflow-x-auto`}>
              <code
                className={`language-${normalizedLang} text-sm leading-relaxed`}
              >
                {code}
              </code>
            </pre>
          </div>
        </div>
      )
    },

    // Inline code
    code: ({ children, className }: any) => {
      // If it's not in a pre block (inline code)
      if (!className) {
        return (
          <code className="bg-bg-secondary text-accent px-2 py-1 rounded text-sm font-mono border border-border">
            {children}
          </code>
        )
      }
      // If it's in a pre block, return as-is for syntax highlighting
      return <code className={className}>{children}</code>
    },

    // Enhanced lists
    ul: ({ children }: any) => (
      <ul className="list-disc list-outside my-6 ml-6 space-y-2">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-outside my-6 ml-6 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="text-text-secondary leading-relaxed">{children}</li>
    ),

    // Enhanced blockquotes
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent pl-6 py-4 my-8 bg-bg-secondary rounded-r-lg italic text-text-secondary">
        {children}
      </blockquote>
    ),

    // Horizontal rules
    hr: () => (
      <hr className="border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent my-12" />
    ),

    // Enhanced tables
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-8 rounded-lg border border-border">
        <table className="min-w-full border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-bg-secondary">{children}</thead>
    ),
    tbody: ({ children }: any) => (
      <tbody className="bg-bg divide-y divide-border">{children}</tbody>
    ),
    th: ({ children }: any) => (
      <th className="px-6 py-3 text-left text-xs font-semibold text-text uppercase tracking-wider border-r border-border last:border-r-0">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-6 py-4 text-text-secondary border-r border-border last:border-r-0">
        {children}
      </td>
    ),

    // Text formatting
    strong: ({ children }: any) => (
      <strong className="font-bold text-text">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic text-text">{children}</em>,

    // Enhanced images
    img: ({ src, alt }: any) => (
      <div className="my-8">
        <img
          src={src}
          alt={alt}
          className="max-w-full h-auto rounded-lg border border-border shadow-lg mx-auto"
        />
        {alt && (
          <p className="text-center text-sm text-text-secondary mt-2 italic">
            {alt}
          </p>
        )}
      </div>
    ),

    // Task lists (from remark-gfm)
    input: ({ checked, disabled }: any) => (
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="mr-3 accent-accent"
      />
    ),

    // Strikethrough (from remark-gfm)
    del: ({ children }: any) => (
      <del className="text-text-secondary line-through opacity-75">
        {children}
      </del>
    ),
  }

  return (
    <div className="mdx-content prose prose-lg max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

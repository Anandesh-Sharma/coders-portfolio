'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Copy, Check } from 'lucide-react'

interface SimpleMDXRendererProps {
  content: string
}

export function SimpleMDXRenderer({ content }: SimpleMDXRendererProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const components = {
    // Headers
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold text-white mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-bold text-white mt-6 mb-3">{children}</h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-base font-bold text-white mt-4 mb-2">{children}</h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-sm font-bold text-white mt-4 mb-2">{children}</h6>
    ),

    // Paragraphs
    p: ({ children }: any) => (
      <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
    ),

    // Links
    a: ({ href, children }: any) => (
      <a
        href={href}
        className="text-cyan-400 hover:text-cyan-300 underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),

    // Code blocks
    pre: ({ children }: any) => (
      <div className="relative group my-6">
        <pre className="bg-black border border-white/20 rounded-lg p-4 overflow-x-auto">
          {children}
        </pre>
        <button
          onClick={() => {
            const code = children?.props?.children
            if (typeof code === 'string') {
              copyToClipboard(code)
            }
          }}
          className="copy-button absolute top-3 right-3 p-2 bg-black/50 border border-white/30 rounded text-white/70 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    ),

    // Inline code
    code: ({ children, className }: any) => {
      // If it's a code block, apply language-specific styling
      if (className?.startsWith('language-')) {
        return (
          <code
            className={`${className} text-sm font-mono leading-relaxed block`}
          >
            {children}
          </code>
        )
      }
      // Inline code
      return (
        <code className="bg-black text-cyan-400 px-2 py-1 rounded text-sm font-mono border border-white/20">
          {children}
        </code>
      )
    },

    // Lists
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside my-4 ml-4">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside my-4 ml-4">{children}</ol>
    ),
    li: ({ children }: any) => (
      <li className="text-gray-300 mb-1">{children}</li>
    ),

    // Blockquotes
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-cyan-400 pl-6 py-2 my-6 bg-gray-900 italic text-gray-300">
        {children}
      </blockquote>
    ),

    // Horizontal rules
    hr: () => (
      <hr className="border-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-8" />
    ),

    // Tables
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-600 rounded-lg overflow-hidden">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-gray-800">{children}</thead>
    ),
    tbody: ({ children }: any) => (
      <tbody className="bg-gray-900">{children}</tbody>
    ),
    th: ({ children }: any) => (
      <th className="border border-gray-600 px-4 py-2 text-white font-semibold text-left">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="border border-gray-600 px-4 py-2 text-gray-300">
        {children}
      </td>
    ),

    // Text formatting
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-200">{children}</em>
    ),

    // Images
    img: ({ src, alt }: any) => (
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg my-4 border border-gray-600"
      />
    ),

    // Task lists (from remark-gfm)
    input: ({ checked, disabled }: any) => (
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="mr-2 accent-cyan-400"
      />
    ),

    // Strikethrough (from remark-gfm)
    del: ({ children }: any) => (
      <del className="text-gray-500 line-through">{children}</del>
    ),
  }

  return (
    <div className="mdx-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

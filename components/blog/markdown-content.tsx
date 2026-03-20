"use client"

import { useMemo } from "react"

interface MarkdownContentProps {
  content: string
}

function parseMarkdown(markdown: string): string {
  let html = markdown

  // Headers with IDs for TOC
  html = html.replace(/^#### (.+)$/gm, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    return `<h4 id="${id}">${text}</h4>`
  })
  html = html.replace(/^### (.+)$/gm, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    return `<h3 id="${id}">${text}</h3>`
  })
  html = html.replace(/^## (.+)$/gm, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    return `<h2 id="${id}">${text}</h2>`
  })
  html = html.replace(/^# (.+)$/gm, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    return `<h1 id="${id}">${text}</h1>`
  })

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="language-${lang || 'text'}">${code.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
  })

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>")

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>")
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>")

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>")
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>")

  // Tables
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split("|").filter(Boolean).map(cell => cell.trim())
    if (cells.every(cell => /^[-:]+$/.test(cell))) {
      return ""
    }
    const cellHtml = cells.map(cell => `<td>${cell}</td>`).join("")
    return `<tr>${cellHtml}</tr>`
  })
  html = html.replace(/(<tr>.*<\/tr>\n?)+/g, (match) => {
    const rows = match.split("</tr>").filter(Boolean)
    if (rows.length > 1) {
      const header = rows[0] + "</tr>"
      const body = rows.slice(1).join("</tr>")
      return `<table><thead>${header.replace(/<td>/g, "<th>").replace(/<\/td>/g, "</th>")}</thead><tbody>${body}</tbody></table>`
    }
    return `<table>${match}</table>`
  })

  // Paragraphs
  html = html.replace(/\n\n/g, "</p><p>")
  html = `<p>${html}</p>`
  
  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, "")
  html = html.replace(/<p>(<h[1-6]|<ul|<ol|<pre|<blockquote|<table)/g, "$1")
  html = html.replace(/(<\/h[1-6]>|<\/ul>|<\/ol>|<\/pre>|<\/blockquote>|<\/table>)<\/p>/g, "$1")

  return html
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const html = useMemo(() => parseMarkdown(content), [content])

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

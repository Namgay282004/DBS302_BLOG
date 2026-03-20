import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  categories: string[]
  tags: string[]
  author: string
  content: string
  pinned?: boolean
}

let cachedPosts: Post[] | null = null

export async function loadPosts(): Promise<Post[]> {
  if (cachedPosts) {
    return cachedPosts
  }

  try {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const files = await fs.readdir(postsDirectory)
    const mdFiles = files.filter(file => file.endsWith('.md'))

    const posts: Post[] = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = path.join(postsDirectory, file)
        const fileContents = await fs.readFile(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          slug: data.slug || file.replace('.md', ''),
          title: data.title || 'Untitled',
          description: data.description || '',
          date: data.date || new Date().toISOString().split('T')[0],
          categories: data.categories || [],
          tags: data.tags || [],
          author: data.author || 'Anonymous',
          content: content.trim(),
          pinned: data.pinned || false,
        }
      })
    )

    cachedPosts = posts
    return posts
  } catch (error) {
    console.error('Error loading posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await loadPosts()
  return posts.find(post => post.slug === slug)
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await loadPosts()
  return [...posts].sort((a, b) => {
    // Pinned posts first
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    // Then by date
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter(post => 
    post.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
  )
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export async function getAllCategories(): Promise<{ name: string; count: number }[]> {
  const posts = await loadPosts()
  const categoryMap = new Map<string, number>()
  posts.forEach(post => {
    post.categories.forEach(cat => {
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1)
    })
  })
  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getAllTags(): Promise<{ name: string; count: number }[]> {
  const posts = await loadPosts()
  const tagMap = new Map<string, number>()
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getArchiveByYear(): Promise<{ year: string; posts: Post[] }[]> {
  const posts = await getAllPosts()
  const yearMap = new Map<string, Post[]>()
  posts.forEach(post => {
    const year = new Date(post.date).getFullYear().toString()
    if (!yearMap.has(year)) {
      yearMap.set(year, [])
    }
    yearMap.get(year)!.push(post)
  })
  return Array.from(yearMap.entries())
    .map(([year, posts]) => ({ year, posts }))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
}

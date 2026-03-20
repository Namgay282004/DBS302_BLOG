"use client"

import { useState, useMemo } from "react"
import { Post } from "@/lib/posts"
import { PostCard } from "@/components/blog/post-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchClientProps {
  initialPosts: Post[]
}

export default function SearchClient({ initialPosts }: SearchClientProps) {
  const [query, setQuery] = useState("")

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return []

    const searchTerms = query.toLowerCase().split(" ").filter(Boolean)

    return initialPosts.filter((post) => {
      const searchableContent = [
        post.title,
        post.description,
        ...post.categories,
        ...post.tags,
        post.author,
      ]
        .join(" ")
        .toLowerCase()

      return searchTerms.every((term) => searchableContent.includes(term))
    })
  }, [query, initialPosts])

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3 mb-6">
          <Search className="h-8 w-8 text-primary" />
          Search
        </h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts by title, description, tags, or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base"
            autoFocus
          />
        </div>
      </header>

      {query.trim() && (
        <p className="text-muted-foreground mb-6">
          {filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"} found
        </p>
      )}

      {filteredPosts.length > 0 ? (
        <div className="divide-y divide-border">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : query.trim() ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No posts found matching your search criteria.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Try using different keywords or browse by categories and tags.
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Start typing to search through all posts.
          </p>
        </div>
      )}
    </div>
  )
}

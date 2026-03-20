import { Metadata } from "next"
import Link from "next/link"
import { getAllTags } from "@/lib/posts"
import { Badge } from "@/components/ui/badge"
import { Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse all post tags",
}

export default async function TagsPage() {
  const tags = await getAllTags()
  const totalPosts = tags.reduce((acc, tag) => acc + tag.count, 0)

  // Calculate font sizes based on count
  const maxCount = Math.max(...tags.map((t) => t.count))
  const minCount = Math.min(...tags.map((t) => t.count))

  function getTagSize(count: number): string {
    if (maxCount === minCount) return "text-base"
    const ratio = (count - minCount) / (maxCount - minCount)
    if (ratio > 0.7) return "text-xl font-semibold"
    if (ratio > 0.4) return "text-lg"
    return "text-base"
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Tag className="h-8 w-8 text-primary" />
          Tags
        </h1>
        <p className="text-muted-foreground mt-2">
          {tags.length} tags across {totalPosts} posts
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link key={tag.name} href={`/tags/${encodeURIComponent(tag.name)}`}>
            <Badge
              variant="outline"
              className={`${getTagSize(tag.count)} px-4 py-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer`}
            >
              #{tag.name}
              <span className="ml-2 text-xs opacity-70">({tag.count})</span>
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}

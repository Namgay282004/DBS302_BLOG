import Link from "next/link"
import { Post } from "@/lib/posts"
import { Badge } from "@/components/ui/badge"
import { Calendar, Pin } from "lucide-react"
import { format } from "date-fns"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="flex flex-col gap-2 py-6 border-b border-border transition-colors hover:border-primary/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {post.pinned && (
              <span className="flex items-center gap-1 text-primary">
                <Pin className="h-3 w-3" />
                <span className="text-xs font-medium">Pinned</span>
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(post.date), "MMM d, yyyy")}
            </span>
          </div>

          <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {post.title}
          </h2>

          <p className="text-muted-foreground line-clamp-2">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            {post.categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
}

import { getAllPosts, getAllTags } from "@/lib/posts"
import { PostCard } from "@/components/blog/post-card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function HomePage() {
  const posts = await getAllPosts()
  const tags = (await getAllTags()).slice(0, 10)

  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <section>
          <h2 className="sr-only">Recent Posts</h2>
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>

      {/* Right Sidebar - Trending Tags */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-24">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Trending Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag.name} href={`/tags/${encodeURIComponent(tag.name)}`}>
                <Badge
                  variant="outline"
                  className="text-xs hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer"
                >
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}

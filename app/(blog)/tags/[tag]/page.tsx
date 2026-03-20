import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getPostsByTag, getAllTags } from "@/lib/posts"
import { PostCard } from "@/components/blog/post-card"
import { Tag, ChevronLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ tag: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)

  return {
    title: `Tag: ${decodedTag}`,
    description: `Posts tagged with ${decodedTag}`,
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.name),
  }))
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = await getPostsByTag(decodedTag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div>
      <header className="mb-8">
        <Link
          href="/tags"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          All Tags
        </Link>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Tag className="h-8 w-8 text-primary" />
          #{decodedTag}
        </h1>
        <p className="text-muted-foreground mt-2">
          {posts.length} {posts.length === 1 ? "post" : "posts"} with this tag
        </p>
      </header>

      <div className="divide-y divide-border">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}

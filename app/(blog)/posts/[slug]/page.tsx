import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getPostBySlug, getAllPosts } from "@/lib/posts"
import { MarkdownContent } from "@/components/blog/markdown-content"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = await getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  return (
    <div className="flex gap-8">
      <article className="flex-1 min-w-0">
        {/* Post Header */}
        <header className="mb-8 pb-6 border-b border-border">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.date), "MMMM d, yyyy")}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Link key={category} href={`/categories/${encodeURIComponent(category.toLowerCase())}`}>
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {category}
                </Badge>
              </Link>
            ))}
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                <Badge variant="outline" className="hover:bg-secondary">
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        </header>

        {/* Post Content */}
        <div className="mb-12">
          <MarkdownContent content={post.content} />
        </div>

        {/* Post Navigation */}
        <nav className="flex items-stretch gap-4 pt-6 border-t border-border">
          {prevPost ? (
            <Link
              href={`/posts/${prevPost.slug}`}
              className="flex-1 group p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </div>
              <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextPost ? (
            <Link
              href={`/posts/${nextPost.slug}`}
              className="flex-1 group p-4 rounded-lg border border-border hover:border-primary/50 transition-colors text-right"
            >
              <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-1">
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </div>
              <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {nextPost.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </article>

      {/* Table of Contents */}
      <TableOfContents content={post.content} />
    </div>
  )
}

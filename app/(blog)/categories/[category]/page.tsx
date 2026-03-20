import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getPostsByCategory, getAllCategories } from "@/lib/posts"
import { PostCard } from "@/components/blog/post-card"
import { FolderOpen, ChevronLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  return {
    title: `Category: ${decodedCategory}`,
    description: `Posts in the ${decodedCategory} category`,
  }
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    category: encodeURIComponent(category.name),
  }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)
  const posts = await getPostsByCategory(decodedCategory)

  if (posts.length === 0) {
    notFound()
  }

  // Find the proper cased category name
  const properCategoryName = posts[0].categories.find(
    (c) => c.toLowerCase() === decodedCategory.toLowerCase()
  ) || decodedCategory

  return (
    <div>
      <header className="mb-8">
        <Link
          href="/categories"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          All Categories
        </Link>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <FolderOpen className="h-8 w-8 text-primary" />
          {properCategoryName}
        </h1>
        <p className="text-muted-foreground mt-2">
          {posts.length} {posts.length === 1 ? "post" : "posts"} in this category
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

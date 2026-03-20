import { Metadata } from "next"
import Link from "next/link"
import { getAllCategories } from "@/lib/posts"
import { FolderOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse all post categories",
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()
  const totalPosts = categories.reduce((acc, cat) => acc + cat.count, 0)

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <FolderOpen className="h-8 w-8 text-primary" />
          Categories
        </h1>
        <p className="text-muted-foreground mt-2">
          {categories.length} categories with {totalPosts} posts in total
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/categories/${encodeURIComponent(category.name.toLowerCase())}`}
            className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h2>
              <span className="px-2 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">
                {category.count}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

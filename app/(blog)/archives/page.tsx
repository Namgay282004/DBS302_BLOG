import { Metadata } from "next"
import Link from "next/link"
import { getArchiveByYear, getAllPosts } from "@/lib/posts"
import { Archive, Calendar } from "lucide-react"
import { format } from "date-fns"

export const metadata: Metadata = {
  title: "Archives",
  description: "Browse posts by year",
}

export default async function ArchivesPage() {
  const archives = await getArchiveByYear()
  const allPosts = await getAllPosts()
  const totalPosts = allPosts.length

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Archive className="h-8 w-8 text-primary" />
          Archives
        </h1>
        <p className="text-muted-foreground mt-2">
          {totalPosts} posts spanning {archives.length} {archives.length === 1 ? "year" : "years"}
        </p>
      </header>

      <div className="space-y-8">
        {archives.map((archive) => (
          <section key={archive.year}>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {archive.year}
              <span className="text-sm font-normal text-muted-foreground">
                ({archive.posts.length} posts)
              </span>
            </h2>

            <ul className="border-l-2 border-border pl-6 space-y-4">
              {archive.posts.map((post) => (
                <li key={post.slug} className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-border bg-background" />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <time className="text-sm text-muted-foreground shrink-0 w-24">
                      {format(new Date(post.date), "MMM d")}
                    </time>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-foreground hover:text-primary transition-colors font-medium"
                    >
                      {post.title}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

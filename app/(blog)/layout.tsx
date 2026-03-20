import { Header } from "@/components/blog/header"
import { Sidebar } from "@/components/blog/sidebar"
import { Footer } from "@/components/blog/footer"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar />
          <main className="flex-1 min-w-0">
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </div>
  )
}

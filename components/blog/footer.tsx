import { siteConfig } from "@/lib/config"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="text-center text-sm text-muted-foreground">
        <p>
          {currentYear} {siteConfig.title}. Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  )
}

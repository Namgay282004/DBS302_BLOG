"use client"

import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  FolderOpen,
  Tag,
  Archive,
  Info,
} from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  folder: FolderOpen,
  tag: Tag,
  archive: Archive,
  info: Info,
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link href="/" className="font-bold text-lg text-foreground">
            {siteConfig.title}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/search">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-background px-4 py-4">
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => {
              const Icon = iconMap[item.icon] || Home
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname.startsWith(item.href))
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}

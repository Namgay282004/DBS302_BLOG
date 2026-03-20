"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import {
  Home,
  FolderOpen,
  Tag,
  Archive,
  Info,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  folder: FolderOpen,
  tag: Tag,
  archive: Archive,
  info: Info,
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full lg:w-64 lg:shrink-0">
      <div className="sticky top-8 flex flex-col items-center lg:items-start">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <Avatar className="h-24 w-24 mb-4 ring-4 ring-border">
            <AvatarImage src={siteConfig.author.avatar} alt={siteConfig.author.name} />
            <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
              {siteConfig.author.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold text-foreground">{siteConfig.title}</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-48">
            {siteConfig.author.bio}
          </p>
        </div>

        {/* Navigation */}
        <nav className="w-full mb-8">
          <ul className="flex flex-wrap justify-center lg:flex-col gap-1">
            {siteConfig.nav.map((item) => {
              const Icon = iconMap[item.icon] || Home
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname.startsWith(item.href))
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
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

        {/* Social Links */}
        <div className="flex items-center gap-4">
          {siteConfig.social.github && (
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {siteConfig.social.twitter && (
            <a
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
          {siteConfig.social.linkedin && (
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {siteConfig.author.email && (
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </aside>
  )
}

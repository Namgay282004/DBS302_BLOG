import { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Info, MapPin, Mail, Github, Twitter, Linkedin } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about the author",
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Info className="h-8 w-8 text-primary" />
          About
        </h1>
      </header>

      <div className="prose">
        {/* Author Card */}
        <div className="flex flex-col sm:flex-row items-start gap-6 p-6 rounded-lg border border-border bg-card mb-8">
          <Avatar className="h-24 w-24 ring-4 ring-border shrink-0">
            <AvatarImage src={siteConfig.author.avatar} alt={siteConfig.author.name} />
            <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
              {siteConfig.author.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground mb-2 mt-0">
              {siteConfig.author.name}
            </h2>
            <p className="text-muted-foreground mb-4">
              {siteConfig.author.bio}
            </p>

            <div className="flex flex-col gap-2 text-sm">
              {siteConfig.author.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {siteConfig.author.location}
                </div>
              )}
              {siteConfig.author.email && (
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.author.email}
                </a>
              )}
            </div>

            <div className="flex items-center gap-4 mt-4">
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
            </div>
          </div>
        </div>

        <h2>About This Blog</h2>
        <p>
          Welcome to {siteConfig.title}! This is a personal learning portfolio documenting my journey through DBS303 (Database Systems). 
          Built with modern web technologies including Next.js, React, and Tailwind CSS for a responsive and feature-rich experience.
        </p>

        <h3>Features</h3>
        <ul>
          <li>Dark and light mode support</li>
          <li>Responsive design for all devices</li>
          <li>Table of contents for long articles</li>
          <li>Category and tag organization</li>
          <li>Timeline-based archives</li>
          <li>SEO optimized with proper meta tags</li>
          <li>Fast page loads with Next.js</li>
        </ul>

        <h3>Tech Stack</h3>
        <ul>
          <li><strong>Framework:</strong> Next.js 16 with App Router</li>
          <li><strong>Styling:</strong> Tailwind CSS</li>
          <li><strong>Components:</strong> shadcn/ui</li>
          <li><strong>Icons:</strong> Lucide Icons</li>
          <li><strong>Deployment:</strong> Vercel</li>
        </ul>

        <h3>License</h3>
        <p>
          This blog template is open source and available under the MIT License. 
          Feel free to use it for your own projects!
        </p>
      </div>
    </div>
  )
}

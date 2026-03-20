import type { Metadata } from 'next'
import { Lato, Source_Code_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const lato = Lato({ 
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato"
})

const sourceCodePro = Source_Code_Pro({ 
  subsets: ["latin"],
  variable: "--font-source-code-pro"
})

export const metadata: Metadata = {
  title: {
    default: 'DBS303 Learning Portfolio',
    template: '%s | DBS303 Blog',
  },
  description: 'A learning portfolio documenting my journey through DBS303 - Database Systems',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.variable} ${sourceCodePro.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

import { Metadata } from "next"
import { getAllPosts } from "@/lib/posts"
import SearchClient from "./search-client"

export const metadata: Metadata = {
  title: "Search",
  description: "Search through all blog posts",
}

export default async function SearchPage() {
  const allPosts = await getAllPosts()

  return <SearchClient initialPosts={allPosts} />
}
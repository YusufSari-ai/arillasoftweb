import { getAllPosts } from "@/lib/blog-db";
import BlogClient from "./BlogClient";

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogClient posts={posts} />;
}

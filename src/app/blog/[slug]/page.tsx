import { getPostBySlug, getAllPosts } from "@/lib/blog-db";
import { notFound } from "next/navigation";
import BlogDetailClient from "./BlogDetailClient";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return <BlogDetailClient post={post} related={related} />;
}

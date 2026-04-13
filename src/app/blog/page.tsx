import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog-db";
import BlogClient from "./BlogClient";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Yazılım, dijital dönüşüm, QR Menü ve teknoloji hakkında güncel içerikler.",
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description:
      "Yazılım, dijital dönüşüm, QR Menü ve teknoloji hakkında güncel içerikler.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${SITE_NAME}`,
    description:
      "Yazılım, dijital dönüşüm, QR Menü ve teknoloji hakkında güncel içerikler.",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogClient posts={posts} />;
}

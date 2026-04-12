import { BlogPost, BLOG_POSTS } from "./blog-data";

/**
 * Module-level in-memory store.
 * Because JS modules are singletons within a browser session,
 * client-side navigation between /admin/blog and /blog will see
 * the same array — no database required.
 */
let _posts: BlogPost[] = [...BLOG_POSTS];

export function getPosts(): BlogPost[] {
  return _posts;
}

export function addPost(post: BlogPost): void {
  _posts = [post, ..._posts];
}

export function updatePost(slug: string, updates: Partial<BlogPost>): void {
  _posts = _posts.map((p) => (p.slug === slug ? { ...p, ...updates } : p));
}

export function deletePost(slug: string): void {
  _posts = _posts.filter((p) => p.slug !== slug);
}

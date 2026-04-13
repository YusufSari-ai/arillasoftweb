import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, services, projects] = await prisma.$transaction([
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.service.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                    lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${SITE_URL}/blog`,          lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE_URL}/services`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/projects`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/iletisim`,      lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...serviceRoutes, ...projectRoutes];
}

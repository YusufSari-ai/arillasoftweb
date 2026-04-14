import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { FolderKanban, ArrowRight, Star } from "lucide-react";
import { getPublishedProjects } from "@/lib/project-actions";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Projeler",
    description:
        "Geliştirdiğimiz web, mobil ve yazılım projelerini inceleyin. Başarı hikayelerimizi keşfedin.",
    openGraph: {
        title: `Projeler | ${SITE_NAME}`,
        description:
            "Geliştirdiğimiz web, mobil ve yazılım projelerini inceleyin. Başarı hikayelerimizi keşfedin.",
        url: `${SITE_URL}/projects`,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: `Projeler | ${SITE_NAME}`,
        description:
            "Geliştirdiğimiz web, mobil ve yazılım projelerini inceleyin. Başarı hikayelerimizi keşfedin.",
    },
};

export default async function ProjectsPage() {
    const projects = await getPublishedProjects();

    return (
        <main className="min-h-screen bg-[#08090d] px-6 py-20 text-slate-100">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12">
                    <p className="mb-3 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">
                        Projelerimiz
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                        Yayındaki Projeler
                    </h1>
                    <p className="mt-4 max-w-2xl text-base text-slate-400 md:text-lg">
                        Geliştirdiğimiz dijital ürünleri, yazılım projelerini ve başarı
                        hikayelerini keşfedin.
                    </p>
                </div>

                {projects.length === 0 ? (
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
                            <FolderKanban className="h-8 w-8 text-cyan-300" />
                        </div>
                        <h2 className="text-2xl font-semibold text-white">Henüz proje yok</h2>
                        <p className="mt-2 text-slate-400">
                            Yayınlanan projeler burada görünecek.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {projects.map((project) => (
                            <article
                                key={project.id}
                                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:border-cyan-500/30 hover:bg-white/[0.05]"
                            >
                                <div className="relative min-h-[220px] border-b border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-violet-500/10">
                                    {project.coverImage ? (
                                        <Image
                                            src={project.coverImage}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <FolderKanban className="h-12 w-12 text-cyan-300" />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 p-6">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {project.isFeatured && (
                                            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                                                <Star className="h-3 w-3" />
                                                Öne Çıkan
                                            </span>
                                        )}

                                        {project.sector && (
                                            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
                                                {project.sector}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-semibold text-white">
                                            {project.title}
                                        </h2>
                                        <p className="mt-2 line-clamp-3 text-sm text-slate-400">
                                            {project.summary}
                                        </p>
                                    </div>

                                    {project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.slice(0, 4).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
                                    >
                                        Projeyi İncele
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
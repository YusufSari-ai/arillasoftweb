import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    FolderKanban,
    Star,
    Building2,
    BarChart3,
    Layers,
    Tag,
    MessageCircle,
} from "lucide-react";
import { getProjectBySlug } from "@/lib/project-actions";
import ProjectGallery from "@/components/sections/ProjectGallery";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) return { title: "Proje Bulunamadı" };

    const images = project.coverImage
        ? [{ url: project.coverImage, width: 1200, height: 630, alt: project.title }]
        : [];

    return {
        title: project.title,
        description: project.summary,
        openGraph: {
            title: `${project.title} | ${SITE_NAME}`,
            description: project.summary,
            url: `${SITE_URL}/projects/${slug}`,
            type: "website",
            images,
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} | ${SITE_NAME}`,
            description: project.summary,
            images: project.coverImage ? [project.coverImage] : [],
        },
    };
}

type PageProps = {
    params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project || !project.published) {
        notFound();
    }

    const embedUrl = (() => {
        if (!project.videoUrl) return null;
        const ytMatch = project.videoUrl.match(
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
        const vimeoMatch = project.videoUrl.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
        return project.videoUrl;
    })();

    return (
        <main className="min-h-screen bg-[#08090d] text-slate-100">

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <div className="relative min-h-[260px] w-full overflow-hidden md:min-h-[380px] lg:min-h-[460px]">
                {project.coverImage ? (
                    <img
                        src={project.coverImage}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : (
                    /* Dot-grid fallback */
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-[#08090d] to-violet-500/10"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    >
                        <FolderKanban className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-cyan-300/20" />
                    </div>
                )}

                {/* Multi-layer overlay: darkens image, fades to page colour at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/50 to-[#08090d]/10" />

                {/* Back link — top-left of hero */}
                <div className="absolute left-6 top-6 md:left-10 md:top-8">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm transition hover:border-white/20 hover:text-white"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Projelere Dön
                    </Link>
                </div>

                {/* Title block anchored to bottom of hero */}
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-10 lg:px-0">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                            {project.isFeatured && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur-sm">
                                    <Star className="h-3 w-3" />
                                    Öne Çıkan
                                </span>
                            )}
                            {project.sector && (
                                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300 backdrop-blur-sm">
                                    {project.sector}
                                </span>
                            )}
                            {project.category?.name && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm">
                                    {project.category.name}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg md:text-4xl lg:text-5xl">
                            {project.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* ── Page body ────────────────────────────────────────────────── */}
            <div className="mx-auto max-w-7xl px-6 pb-28 pt-10 md:px-10 lg:px-6">
                <div className="lg:grid lg:grid-cols-[1fr_296px] lg:gap-14">

                    {/* ── Main content ─────────────────────────────────────── */}
                    <div className="min-w-0">

                        {/* Summary */}
                        <p className="mb-12 max-w-2xl text-lg leading-8 text-slate-400">
                            {project.summary}
                        </p>

                        <div className="space-y-16">

                            {/* Result metrics */}
                            {project.resultMetrics && (
                                <div className="rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/[0.09] via-violet-500/[0.04] to-transparent p-7">
                                    <div className="mb-3 flex items-center gap-2.5">
                                        <BarChart3 className="h-4 w-4 text-violet-400" />
                                        <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                                            Sonuçlar & Metrikler
                                        </p>
                                    </div>
                                    <p className="text-base leading-7 text-slate-200">
                                        {project.resultMetrics}
                                    </p>
                                </div>
                            )}

                            {/* Project detail */}
                            <section>
                                <SectionHeading>Proje Detayı</SectionHeading>
                                <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7">
                                    <p className="whitespace-pre-line leading-[1.9] text-slate-300">
                                        {project.content}
                                    </p>
                                </div>
                            </section>

                            {/* Gallery */}
                            {project.gallery.length > 0 && (
                                <section>
                                    <SectionHeading>Ekran Görüntüleri</SectionHeading>
                                    <div className="mt-6">
                                        <ProjectGallery
                                            images={project.gallery}
                                            projectTitle={project.title}
                                        />
                                    </div>
                                </section>
                            )}

                            {/* Video */}
                            {embedUrl && (
                                <section>
                                    <SectionHeading>Video</SectionHeading>
                                    <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08]">
                                        <div className="relative aspect-video w-full">
                                            <iframe
                                                src={embedUrl}
                                                className="absolute inset-0 h-full w-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* CTA — gradient-bordered card */}
                            <div className="rounded-3xl bg-gradient-to-r from-violet-600/40 via-cyan-500/20 to-violet-600/40 p-px">
                                <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#08090d] px-8 py-14 text-center">
                                    {/* glow orbs */}
                                    <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
                                    <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

                                    <p className="relative text-xs font-semibold uppercase tracking-widest text-cyan-400">
                                        Bir sonraki adım
                                    </p>
                                    <h2 className="relative mt-4 text-2xl font-bold text-white md:text-3xl">
                                        Benzer bir proje mi istiyorsunuz?
                                    </h2>
                                    <p className="relative mx-auto mt-4 max-w-md text-base text-slate-400">
                                        Hayalinizdekileri gerçeğe dönüştürelim. Ücretsiz ön
                                        görüşme için hemen iletişime geçin.
                                    </p>
                                    <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
                                        <Link
                                            href="/iletisim"
                                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                                        >
                                            <MessageCircle className="h-4 w-4" />
                                            Teklif Al
                                        </Link>
                                        <Link
                                            href="/projects"
                                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
                                        >
                                            Diğer Projeler
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Sticky sidebar ───────────────────────────────────── */}
                    <aside className="mt-12 space-y-4 lg:mt-0 lg:sticky lg:top-24 lg:h-fit">

                        {/* Info card */}
                        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
                            <div className="border-b border-white/[0.08] px-5 py-3.5">
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                                    Proje Bilgileri
                                </p>
                            </div>
                            <div className="divide-y divide-white/[0.06]">
                                {project.clientName && (
                                    <SidebarRow
                                        icon={<Building2 className="h-3.5 w-3.5 text-cyan-400" />}
                                        label="Müşteri / Marka"
                                        value={project.clientName}
                                    />
                                )}
                                {project.sector && (
                                    <SidebarRow
                                        icon={<Layers className="h-3.5 w-3.5 text-violet-400" />}
                                        label="Sektör"
                                        value={project.sector}
                                    />
                                )}
                                {project.category?.name && (
                                    <SidebarRow
                                        icon={<Tag className="h-3.5 w-3.5 text-slate-400" />}
                                        label="Kategori"
                                        value={project.category.name}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Technologies card */}
                        {project.technologies.length > 0 && (
                            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
                                <div className="border-b border-white/[0.08] px-5 py-3.5">
                                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                                        Teknolojiler
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2 p-5">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Live link */}
                        {project.projectUrl && (
                            <a
                                href={project.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Projeyi Ziyaret Et
                            </a>
                        )}

                        {/* Sidebar CTA */}
                        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.05] p-5 text-center">
                            <p className="text-sm font-medium leading-snug text-slate-300">
                                Benzer bir proje yaptırmak ister misiniz?
                            </p>
                            <Link
                                href="/iletisim"
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20 hover:text-cyan-200"
                            >
                                <MessageCircle className="h-4 w-4" />
                                İletişime Geç
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

/* ── Shared sub-components ───────────────────────────────────────────────── */

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3">
            <span className="h-5 w-[3px] flex-shrink-0 rounded-full bg-gradient-to-b from-cyan-400 to-violet-500" />
            <h2 className="text-xl font-semibold text-white">{children}</h2>
            <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
    );
}

function SidebarRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3 px-5 py-4">
            <div className="mt-0.5 flex-shrink-0">{icon}</div>
            <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                    {label}
                </p>
                <p className="mt-1 text-sm font-medium text-white">{value}</p>
            </div>
        </div>
    );
}

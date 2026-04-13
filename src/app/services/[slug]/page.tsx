import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    Star,
    Wrench,
    Globe,
    Smartphone,
    Cpu,
    Layers,
    Palette,
    Shield,
    Code2,
    Zap,
    Lock,
} from "lucide-react";
import { getServiceBySlug } from "@/lib/service-actions";
import type { LucideProps } from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);
    if (!service) return { title: "Hizmet Bulunamadı" };

    return {
        title: service.title,
        description: service.shortDescription,
        openGraph: {
            title: `${service.title} | ${SITE_NAME}`,
            description: service.shortDescription,
            url: `${SITE_URL}/services/${slug}`,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${service.title} | ${SITE_NAME}`,
            description: service.shortDescription,
        },
    };
}

type IconComponent = React.ComponentType<LucideProps>;

const ICON_MAP: Record<string, IconComponent> = {
    Globe,
    Smartphone,
    Cpu,
    Layers,
    Palette,
    Shield,
    Code2,
    Zap,
    Lock,
    Wrench,
};

type PageProps = {
    params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const Icon = ICON_MAP[service.icon] ?? Wrench;

    return (
        <main className="min-h-screen bg-[#08090d] px-6 py-20 text-slate-100">
            <div className="mx-auto max-w-4xl">
                {/* Back link */}
                <Link
                    href="/services"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Tüm Hizmetler
                </Link>

                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                    {/* Hero banner */}
                    <div className="flex min-h-[220px] flex-col items-center justify-center gap-5 border-b border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-violet-500/10 px-8 py-12 text-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
                            <Icon className="h-11 w-11 text-cyan-300" />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                {service.isFeatured && (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                                        <Star className="h-3 w-3" />
                                        Öne Çıkan
                                    </span>
                                )}
                            </div>
                            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                                {service.title}
                            </h1>
                            <p className="mt-3 max-w-xl text-base text-slate-400">
                                {service.shortDescription}
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-10">
                        <h2 className="mb-4 text-lg font-semibold text-white">
                            Hizmet Detayı
                        </h2>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                            <p className="whitespace-pre-line leading-8 text-slate-300">
                                {service.content}
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/iletisim"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                            >
                                Teklif Al
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
                            >
                                Diğer Hizmetler
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

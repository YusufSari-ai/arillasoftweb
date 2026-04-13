import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, Wrench, Globe, Smartphone, Cpu, Layers, Palette, Shield, Code2, Zap, Lock } from "lucide-react";
import { getPublishedServicesForPublic } from "@/lib/service-actions";
import type { LucideProps } from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Web geliştirme, mobil uygulama, UI/UX tasarımı ve daha fazlası — uçtan uca yazılım çözümleri.",
  openGraph: {
    title: `Hizmetler | ${SITE_NAME}`,
    description:
      "Web geliştirme, mobil uygulama, UI/UX tasarımı ve daha fazlası — uçtan uca yazılım çözümleri.",
    url: `${SITE_URL}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Hizmetler | ${SITE_NAME}`,
    description:
      "Web geliştirme, mobil uygulama, UI/UX tasarımı ve daha fazlası — uçtan uca yazılım çözümleri.",
  },
};

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

export default async function ServicesPage() {
    const services = await getPublishedServicesForPublic();

    return (
        <main className="min-h-screen bg-[#08090d] px-6 py-20 text-slate-100">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12">
                    <p className="mb-3 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">
                        Hizmetlerimiz
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                        Neler Yapıyoruz?
                    </h1>
                    <p className="mt-4 max-w-2xl text-base text-slate-400 md:text-lg">
                        Dijital dönüşüm yolculuğunuzda yanınızdayız. Yazılımdan tasarıma,
                        mobil uygulamalardan altyapıya kadar uçtan uca hizmet sunuyoruz.
                    </p>
                </div>

                {/* Empty state */}
                {services.length === 0 ? (
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
                            <Wrench className="h-8 w-8 text-cyan-300" />
                        </div>
                        <h2 className="text-2xl font-semibold text-white">Henüz hizmet yok</h2>
                        <p className="mt-2 text-slate-400">
                            Yayınlanan hizmetler burada görünecek.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {services.map((service) => {
                            const Icon = ICON_MAP[service.icon] ?? Wrench;
                            return (
                                <article
                                    key={service.id}
                                    className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:border-cyan-500/30 hover:bg-white/[0.05]"
                                >
                                    {/* Icon banner */}
                                    <div className="flex min-h-[140px] items-center justify-center border-b border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-violet-500/10">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
                                            <Icon className="h-9 w-9 text-cyan-300" />
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col space-y-4 p-6">
                                        {/* Badges */}
                                        {service.isFeatured && (
                                            <span className="inline-flex w-fit items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                                                <Star className="h-3 w-3" />
                                                Öne Çıkan
                                            </span>
                                        )}

                                        {/* Title + description */}
                                        <div className="flex-1">
                                            <h2 className="text-xl font-semibold text-white">
                                                {service.title}
                                            </h2>
                                            <p className="mt-2 line-clamp-3 text-sm text-slate-400">
                                                {service.shortDescription}
                                            </p>
                                        </div>

                                        {/* Link */}
                                        <Link
                                            href={`/services/${service.slug}`}
                                            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
                                        >
                                            Detayları İncele
                                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}

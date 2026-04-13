"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export type SiteSettingsData = {
    heroTitle: string;
    heroSubtitle: string;
    heroPrimaryButton: string;
    heroSecondaryButton: string;
    homepageIntro: string;
    whyChooseUsTitle: string;
    whyChooseUsText: string;
    homepageCTA: string;
};

const DEFAULTS: SiteSettingsData = {
    heroTitle: "Restoranınız İçin|Akıllı Dijital Menü Sistemi",
    heroSubtitle:
        "QR kod ile anında erişilen, anlık güncellenebilen, çok dilli dijital menü çözümü. Müşteri deneyimini dönüştürün, maliyetleri azaltın.",
    heroPrimaryButton: "Demo Talep Et",
    heroSecondaryButton: "Tüm Hizmetler",
    homepageIntro:
        "Web'den mobilye, backend'den UI/UX tasarımına — uçtan uca dijital dönüşüm hizmetleri.",
    whyChooseUsTitle: "QR Menü Sistemi ile|Restoranınızı Dönüştürün",
    whyChooseUsText:
        "Masaya QR kodu koyun, müşterileriniz menüye anında ulaşsın. Baskı masrafı yok, güncelleme zahmeti yok.",
    homepageCTA: "Dijital Dönüşümünüzü|Bugün Başlatın",
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
    let row = await prisma.siteSetting.findFirst();
    if (!row) {
        row = await prisma.siteSetting.create({ data: {} });
    }
    return {
        heroTitle: row.heroTitle || DEFAULTS.heroTitle,
        heroSubtitle: row.heroSubtitle || DEFAULTS.heroSubtitle,
        heroPrimaryButton: row.heroPrimaryButton || DEFAULTS.heroPrimaryButton,
        heroSecondaryButton: row.heroSecondaryButton || DEFAULTS.heroSecondaryButton,
        homepageIntro: row.homepageIntro || DEFAULTS.homepageIntro,
        whyChooseUsTitle: row.whyChooseUsTitle || DEFAULTS.whyChooseUsTitle,
        whyChooseUsText: row.whyChooseUsText || DEFAULTS.whyChooseUsText,
        homepageCTA: row.homepageCTA || DEFAULTS.homepageCTA,
    };
}

export async function updateSiteSettings(data: Partial<SiteSettingsData>): Promise<void> {
    const existing = await prisma.siteSetting.findFirst();
    if (existing) {
        await prisma.siteSetting.update({ where: { id: existing.id }, data });
    } else {
        await prisma.siteSetting.create({ data });
    }
    revalidatePath("/");
    revalidatePath("/admin/settings");
}

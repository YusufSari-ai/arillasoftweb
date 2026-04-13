"use server";

import { prisma } from "./prisma";

export type DashboardStats = {
    blogCount: number;
    serviceCount: number;
    projectCount: number;
    unreadMessages: number;
};

export type RecentMessage = {
    id: string;
    fullName: string;
    email: string;
    subject: string;
    isRead: boolean;
    createdAt: string;
};

export async function getDashboardData(): Promise<{
    stats: DashboardStats;
    recentMessages: RecentMessage[];
}> {
    const [blogCount, serviceCount, projectCount, unreadMessages, messages] =
        await prisma.$transaction([
            prisma.blogPost.count(),
            prisma.service.count(),
            prisma.project.count(),
            prisma.contactMessage.count({ where: { isRead: false } }),
            prisma.contactMessage.findMany({
                orderBy: { createdAt: "desc" },
                take: 5,
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    subject: true,
                    isRead: true,
                    createdAt: true,
                },
            }),
        ]);

    return {
        stats: { blogCount, serviceCount, projectCount, unreadMessages },
        recentMessages: messages.map((m) => ({
            ...m,
            createdAt: m.createdAt.toISOString(),
        })),
    };
}

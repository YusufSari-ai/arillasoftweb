"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export type ContactMessageInput = {
    fullName: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
};

export type AdminContactMessage = {
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
    company: string | null;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string;
};

export async function submitContactMessage(data: ContactMessageInput): Promise<void> {
    await prisma.contactMessage.create({ data });
    revalidatePath("/admin/contact");
}

export async function getContactMessages(): Promise<AdminContactMessage[]> {
    const msgs = await prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
    });
    return msgs.map((m) => ({
        id: m.id,
        fullName: m.fullName,
        email: m.email,
        phone: m.phone ?? null,
        company: m.company ?? null,
        subject: m.subject,
        message: m.message,
        isRead: m.isRead,
        createdAt: m.createdAt.toISOString(),
    }));
}

export async function setMessageRead(id: string, isRead: boolean): Promise<void> {
    await prisma.contactMessage.update({ where: { id }, data: { isRead } });
    revalidatePath("/admin/contact");
}

export async function deleteContactMessage(id: string): Promise<void> {
    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath("/admin/contact");
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = contactSchema.parse(body);
        await prisma.contactMessage.create({ data });
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
    }
}

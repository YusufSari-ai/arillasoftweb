import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/settings-actions";

export async function GET() {
    try {
        const settings = await getSiteSettings();
        return NextResponse.json(settings);
    } catch {
        return NextResponse.json({}, { status: 500 });
    }
}

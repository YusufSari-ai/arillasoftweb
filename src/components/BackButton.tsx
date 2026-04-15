"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
    const pathname = usePathname();

    // ana sayfadaysak gösterme
    if (pathname === "/") return null;

    return (
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px 24px 0 24px" }}>
            <Link
                href="/"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "14px",
                    color: "#94a3b8",
                    textDecoration: "none",
                    transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#e2e8f0";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#94a3b8";
                }}
            >
                <ArrowLeft size={16} />
                Ana Sayfa
            </Link>
        </div>
    );
}
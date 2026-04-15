"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Code2, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const NAV_LINKS = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Hizmetler", href: "/services" },
    { label: "Projeler", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "İletişim", href: "/iletisim" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: "all 0.3s ease",
                background: scrolled ? "rgba(8, 9, 13, 0.92)" : "transparent",
                backdropFilter: scrolled ? "blur(16px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
            }}
        >
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                        <div
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "10px",
                                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                            }}
                        >
                            <Code2 size={18} color="white" />
                        </div>
                        <span style={{ fontWeight: 700, fontSize: "18px", color: "#f1f5f9", letterSpacing: "-0.3px" }}>
                            Arilla<span style={{ color: "#8b5cf6" }}>soft</span>
                        </span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        position: "relative",
                                        padding: "8px 16px",
                                        borderRadius: "10px",
                                        fontSize: "14px",
                                        fontWeight: isActive ? 700 : 500,
                                        color: isActive ? "#f5f3ff" : "#94a3b8",
                                        textDecoration: "none",
                                        transition: "color 0.25s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.color = "#f1f5f9";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.color = "#94a3b8";
                                        }
                                    }}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="navbar-active-pill"
                                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                borderRadius: "10px",
                                                background: "rgba(124,58,237,0.14)",
                                                border: "1px solid rgba(124,58,237,0.28)",
                                                boxShadow: "0 0 18px rgba(124,58,237,0.12)",
                                                zIndex: 0,
                                            }}
                                        />
                                    )}

                                    <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href="/iletisim"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "9px 20px",
                                borderRadius: "10px",
                                fontSize: "14px",
                                fontWeight: 600,
                                textDecoration: "none",
                                color: "white",
                                background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                                boxShadow: "0 0 20px rgba(124,58,237,0.3)",
                                transition: "all 0.2s",
                            }}
                        >
                            Teklif Al <ArrowRight size={14} />
                        </Link>
                    </div>

                    <button
                        className="lg:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px",
                            padding: "8px",
                            color: "#f1f5f9",
                            cursor: "pointer",
                        }}
                    >
                        {isOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "68px",
                        left: "16px",
                        right: "16px",
                        zIndex: 100,
                        background: "rgba(8, 9, 13, 0.98)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "16px",
                        backdropFilter: "blur(16px)",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
                        padding: "16px",
                    }}
                    className="lg:hidden"
                >
                    <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        padding: "10px 14px",
                                        borderRadius: "8px",
                                        fontSize: "15px",
                                        fontWeight: isActive ? 700 : 500,
                                        color: isActive ? "#c4b5fd" : "#94a3b8",
                                        background: isActive ? "rgba(124,58,237,0.12)" : "transparent",
                                        border: isActive ? "1px solid rgba(124,58,237,0.22)" : "1px solid transparent",
                                        textDecoration: "none",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        <Link
                            href="/iletisim"
                            onClick={() => setIsOpen(false)}
                            style={{
                                marginTop: "8px",
                                padding: "11px 20px",
                                borderRadius: "10px",
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: "15px",
                                textDecoration: "none",
                                color: "white",
                                background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                            }}
                        >
                            Teklif Al
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
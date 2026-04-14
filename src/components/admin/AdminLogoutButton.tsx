"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        document.cookie =
            "admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
        >
            Çıkış Yap
        </button>
    );
}
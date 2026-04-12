"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  TrendingUp,
  Eye,
  Clock,
  ArrowRight,
  PenSquare,
  Wrench,
  FolderKanban,
} from "lucide-react";
import { getAdminPosts, type AdminPost } from "@/lib/blog-actions";

const CATEGORY_META: Record<string, { color: string; bg: string; border: string }> = {
  "QR Menü": { color: "#7c3aed", bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.25)" },
  "Yazılım": { color: "#06b6d4", bg: "rgba(6,182,212,0.1)", border: "rgba(6,182,212,0.25)" },
  "Tasarım": { color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
  "Yapay Zeka": { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
  "SEO": { color: "#ec4899", bg: "rgba(236,72,153,0.1)", border: "rgba(236,72,153,0.25)" },
  "Mobil": { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.25)" },
  "Genel": { color: "#64748b", bg: "rgba(100,116,139,0.1)", border: "rgba(100,116,139,0.25)" },
};

type PostDisplay = {
  slug: string; emoji: string; title: string;
  category: string; categoryColor: string; categoryBg: string; categoryBorder: string;
  date: string; readTime: string;
};

function adaptPost(post: AdminPost): PostDisplay {
  const catName = post.category?.name ?? "Genel";
  const meta = CATEGORY_META[catName] ?? CATEGORY_META["Genel"];
  let emoji = "📝";
  try { emoji = JSON.parse(post.content).emoji ?? "📝"; } catch {}
  return {
    slug: post.slug,
    emoji,
    title: post.title,
    category: catName,
    categoryColor: meta.color,
    categoryBg: meta.bg,
    categoryBorder: meta.border,
    date: new Date(post.createdAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }),
    readTime: `${post.readingTime} dk`,
  };
}

const quickActions = [
  {
    label: "Yeni Blog Yazısı",
    desc: "Blog yönetimine git ve yeni içerik ekle",
    href: "/admin/blog",
    icon: PenSquare,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.12)",
  },
  {
    label: "Servisler",
    desc: "Yakında kullanılabilir olacak",
    href: "#",
    icon: Wrench,
    color: "#475569",
    bg: "rgba(71,85,105,0.1)",
    disabled: true,
  },
  {
    label: "Projeler",
    desc: "Yakında kullanılabilir olacak",
    href: "#",
    icon: FolderKanban,
    color: "#475569",
    bg: "rgba(71,85,105,0.1)",
    disabled: true,
  },
];

export default function AdminDashboard() {
  const [posts, setPosts] = useState<PostDisplay[]>([]);

  useEffect(() => {
    getAdminPosts().then((data) => setPosts(data.map(adaptPost))).catch(() => {});
  }, []);

  const recentPosts = posts.slice(0, 4);

  const stats = [
    {
      label: "Toplam Blog Yazısı",
      value: posts.length.toString(),
      icon: FileText,
      change: "+2 bu ay",
      color: "#7c3aed",
      bg: "rgba(124,58,237,0.12)",
      border: "rgba(124,58,237,0.2)",
    },
    {
      label: "Toplam Görüntülenme",
      value: "12.4K",
      icon: Eye,
      change: "+18% bu ay",
      color: "#06b6d4",
      bg: "rgba(6,182,212,0.1)",
      border: "rgba(6,182,212,0.2)",
    },
    {
      label: "Ort. Okuma Süresi",
      value: "5.8 dk",
      icon: Clock,
      change: "stabil",
      color: "#10b981",
      bg: "rgba(16,185,129,0.1)",
      border: "rgba(16,185,129,0.2)",
    },
    {
      label: "Büyüme Oranı",
      value: "%24",
      icon: TrendingUp,
      change: "+4% geçen aya göre",
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.1)",
      border: "rgba(245,158,11,0.2)",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#64748b" }}>
          Hoş geldiniz. İçeriklerinizi buradan yönetin.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl p-5"
              style={{
                background: "#111219",
                border: `1px solid ${stat.border}`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: stat.bg }}
                >
                  <Icon size={18} style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1" style={{ color: "#f1f5f9" }}>
                {stat.value}
              </p>
              <p className="text-sm mb-1" style={{ color: "#64748b" }}>
                {stat.label}
              </p>
              <p className="text-xs font-medium" style={{ color: stat.color }}>
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div
          className="lg:col-span-2 rounded-xl"
          style={{
            background: "#111219",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <h2 className="text-base font-semibold" style={{ color: "#f1f5f9" }}>
              Son Blog Yazıları
            </h2>
            <Link
              href="/admin/blog"
              className="text-xs flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color: "#a78bfa" }}
            >
              Tümünü gör <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            {recentPosts.length === 0 ? (
              <p className="px-6 py-8 text-sm text-center" style={{ color: "#475569" }}>
                Henüz blog yazısı yok.
              </p>
            ) : (
              recentPosts.map((post) => (
                <div
                  key={post.slug}
                  className="flex items-start gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    {post.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium leading-snug truncate"
                      style={{ color: "#f1f5f9" }}
                    >
                      {post.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: post.categoryBg,
                          color: post.categoryColor,
                          border: `1px solid ${post.categoryBorder}`,
                        }}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs" style={{ color: "#475569" }}>
                        {post.date}
                      </span>
                      <span className="text-xs" style={{ color: "#475569" }}>
                        {post.readTime} okuma
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-xl"
          style={{
            background: "#111219",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="px-6 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <h2 className="text-base font-semibold" style={{ color: "#f1f5f9" }}>
              Hızlı Erişim
            </h2>
          </div>
          <div className="p-4 space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const content = (
                <div
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    action.disabled
                      ? "cursor-not-allowed opacity-40"
                      : "hover:bg-white/[0.04] cursor-pointer"
                  }`}
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: action.bg }}
                  >
                    <Icon size={16} style={{ color: action.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium"
                      style={{ color: action.disabled ? "#475569" : "#f1f5f9" }}
                    >
                      {action.label}
                    </p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "#475569" }}>
                      {action.desc}
                    </p>
                  </div>
                  {!action.disabled && (
                    <ArrowRight size={14} style={{ color: "#475569" }} />
                  )}
                  {action.disabled && (
                    <span
                      className="text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        color: "#475569",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      Yakında
                    </span>
                  )}
                </div>
              );

              return action.disabled ? (
                <div key={action.label}>{content}</div>
              ) : (
                <Link key={action.label} href={action.href}>
                  {content}
                </Link>
              );
            })}
          </div>

          {/* Category breakdown */}
          {posts.length > 0 && (
            <div
              className="px-6 py-4 mt-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "#475569" }}
              >
                Kategori Dağılımı
              </p>
              <div className="space-y-2">
                {Array.from(new Set(posts.map((p) => p.category))).map((cat) => {
                  const catPosts = posts.filter((p) => p.category === cat);
                  const meta = CATEGORY_META[cat] ?? CATEGORY_META["Genel"];
                  const pct = Math.round((catPosts.length / posts.length) * 100);
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs" style={{ color: "#94a3b8" }}>
                          {cat}
                        </span>
                        <span className="text-xs" style={{ color: "#64748b" }}>
                          {catPosts.length}
                        </span>
                      </div>
                      <div
                        className="h-1 rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, background: meta.color, opacity: 0.7 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

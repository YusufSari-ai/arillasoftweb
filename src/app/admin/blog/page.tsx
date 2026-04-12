"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Save,
  FileText,
  Clock,
  Tag,
} from "lucide-react";
import {
  getAdminPosts,
  createPost,
  updatePost,
  deletePost,
  type AdminPost,
  type PostDraft,
} from "@/lib/blog-actions";

/* ─── Category Options ───────────────────────── */
const CATEGORY_OPTIONS = [
  { label: "QR Menü", color: "#7c3aed", bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.25)" },
  { label: "Yazılım", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", border: "rgba(6,182,212,0.25)" },
  { label: "Tasarım", color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
  { label: "Yapay Zeka", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
  { label: "SEO", color: "#ec4899", bg: "rgba(236,72,153,0.1)", border: "rgba(236,72,153,0.25)" },
  { label: "Mobil", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.25)" },
  { label: "Genel", color: "#64748b", bg: "rgba(100,116,139,0.1)", border: "rgba(100,116,139,0.25)" },
];

/* ─── Post Display Type ──────────────────────── */
type PostDisplay = {
  id: string;
  slug: string;
  emoji: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  categoryBorder: string;
  date: string;
  readTime: string;
};

function adaptPost(post: AdminPost): PostDisplay {
  const catName = post.category?.name ?? "Genel";
  const catInfo = CATEGORY_OPTIONS.find((c) => c.label === catName) ?? CATEGORY_OPTIONS[6];
  let emoji = "📝";
  try {
    emoji = JSON.parse(post.content).emoji ?? "📝";
  } catch {
    // keep default
  }
  return {
    id: post.id,
    slug: post.slug,
    emoji,
    title: post.title,
    description: post.excerpt,
    category: catName,
    categoryColor: catInfo.color,
    categoryBg: catInfo.bg,
    categoryBorder: catInfo.border,
    date: new Date(post.createdAt).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    readTime: `${post.readingTime} dk`,
  };
}

/* ─── Modal ──────────────────────────────────── */
function PostModal({
  mode,
  initial,
  onSave,
  onClose,
}: {
  mode: "new" | "edit";
  initial: PostDraft;
  onSave: (draft: PostDraft) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<PostDraft>(initial);

  const set =
    (key: keyof PostDraft) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setDraft((prev) => ({ ...prev, [key]: e.target.value }));

  const selectedCat = CATEGORY_OPTIONS.find((c) => c.label === draft.category);

  const inputStyle: React.CSSProperties = {
    background: "#08090d",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    color: "#f1f5f9",
    padding: "10px 14px",
    fontSize: 14,
    width: "100%",
    outline: "none",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div
        className="w-full max-w-lg rounded-xl shadow-2xl flex flex-col max-h-[90vh]"
        style={{ background: "#111219", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-2">
            <FileText size={16} style={{ color: "#a78bfa" }} />
            <h2 className="text-base font-semibold" style={{ color: "#f1f5f9" }}>
              {mode === "new" ? "Yeni Blog Yazısı" : "Blog Yazısını Düzenle"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            style={{ color: "#64748b" }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b" }}>
                Emoji
              </label>
              <input
                value={draft.emoji}
                onChange={set("emoji")}
                maxLength={2}
                style={{ ...inputStyle, width: 56, textAlign: "center", fontSize: 20 }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b" }}>
                Başlık *
              </label>
              <input
                value={draft.title}
                onChange={set("title")}
                placeholder="Blog yazısı başlığı..."
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b" }}>
              Açıklama *
            </label>
            <textarea
              value={draft.description}
              onChange={set("description")}
              placeholder="Kısa bir açıklama yazın..."
              rows={3}
              style={{ ...inputStyle, resize: "none" }}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b" }}>
                Kategori
              </label>
              <select value={draft.category} onChange={set("category")} style={inputStyle}>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.label} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ width: 110 }}>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b" }}>
                Okuma Süresi
              </label>
              <input
                value={draft.readTime}
                onChange={set("readTime")}
                placeholder="5 dk"
                style={inputStyle}
              />
            </div>
          </div>

          {selectedCat && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs" style={{ color: "#475569" }}>Önizleme:</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: selectedCat.bg,
                  color: selectedCat.color,
                  border: `1px solid ${selectedCat.border}`,
                }}
              >
                {draft.category}
              </span>
            </div>
          )}
        </div>

        <div
          className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "#64748b" }}
          >
            İptal
          </button>
          <button
            onClick={() => {
              if (draft.title.trim() && draft.description.trim()) onSave(draft);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              color: "#fff",
            }}
          >
            <Save size={14} />
            {mode === "new" ? "Yayınla" : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Delete Confirm Dialog ──────────────────── */
function DeleteDialog({
  title,
  onConfirm,
  onCancel,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div
        className="w-full max-w-sm rounded-xl p-6"
        style={{ background: "#111219", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: "rgba(239,68,68,0.1)" }}
        >
          <Trash2 size={20} style={{ color: "#ef4444" }} />
        </div>
        <h3 className="text-base font-semibold mb-2" style={{ color: "#f1f5f9" }}>
          Blog Yazısını Sil
        </h3>
        <p className="text-sm mb-6" style={{ color: "#64748b" }}>
          <span style={{ color: "#94a3b8" }}>&quot;{title}&quot;</span> yazısını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 text-sm rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "#64748b", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            İptal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 text-sm font-semibold rounded-lg transition-all hover:opacity-90"
            style={{ background: "#ef4444", color: "#fff" }}
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────── */
export default function AdminBlogPage() {
  const [posts, setPosts] = useState<PostDisplay[]>([]);
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Tümü");

  const [modalMode, setModalMode] = useState<"new" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<PostDisplay | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PostDisplay | null>(null);

  async function loadPosts() {
    const data = await getAdminPosts();
    setPosts(data.map(adaptPost));
  }

  useEffect(() => {
    loadPosts();
  }, []);

  /* filter */
  const filtered = posts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "Tümü" || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const categories = ["Tümü", ...Array.from(new Set(posts.map((p) => p.category)))];

  /* handlers */
  function openNew() {
    setEditTarget(null);
    setModalMode("new");
  }

  function openEdit(post: PostDisplay) {
    setEditTarget(post);
    setModalMode("edit");
  }

  function handleSave(draft: PostDraft) {
    startTransition(async () => {
      if (modalMode === "new") {
        await createPost(draft);
      } else if (modalMode === "edit" && editTarget) {
        await updatePost(editTarget.id, draft);
      }
      await loadPosts();
      setModalMode(null);
      setEditTarget(null);
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      await deletePost(deleteTarget.id);
      await loadPosts();
      setDeleteTarget(null);
    });
  }

  const defaultDraft: PostDraft = {
    title: "",
    description: "",
    category: "Genel",
    readTime: "5 dk",
    emoji: "📝",
  };

  const editDraft: PostDraft = editTarget
    ? {
        title: editTarget.title,
        description: editTarget.description,
        category: editTarget.category,
        readTime: editTarget.readTime,
        emoji: editTarget.emoji,
      }
    : defaultDraft;

  return (
    <div className="p-6 space-y-6">
      {modalMode && (
        <PostModal
          mode={modalMode}
          initial={editDraft}
          onSave={handleSave}
          onClose={() => {
            setModalMode(null);
            setEditTarget(null);
          }}
        />
      )}
      {deleteTarget && (
        <DeleteDialog
          title={deleteTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
            Blog Yönetimi
          </h1>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>
            {posts.length} yazı &middot; {filtered.length} gösteriliyor
            {isPending && " · Kaydediliyor..."}
          </p>
        </div>
        <button
          onClick={openNew}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all hover:opacity-90 self-start sm:self-auto disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            color: "#fff",
          }}
        >
          <Plus size={16} />
          Yeni Blog Yazısı
        </button>
      </div>

      {/* Filters */}
      <div
        className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl"
        style={{
          background: "#111219",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#475569" }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Başlık, açıklama veya kategori ara..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg"
            style={{
              background: "#08090d",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#f1f5f9",
              outline: "none",
            }}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Tag size={13} style={{ color: "#475569" }} />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className="px-3 py-1.5 text-xs rounded-lg transition-all"
              style={
                filterCat === cat
                  ? {
                      background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.15))",
                      color: "#a78bfa",
                      border: "1px solid rgba(124,58,237,0.3)",
                    }
                  : {
                      background: "rgba(255,255,255,0.03)",
                      color: "#64748b",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog List */}
      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-xl"
          style={{
            background: "#111219",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <FileText size={24} style={{ color: "#334155" }} />
          </div>
          <p className="text-sm font-medium mb-1" style={{ color: "#475569" }}>
            Yazı bulunamadı
          </p>
          <p className="text-xs" style={{ color: "#334155" }}>
            Arama kriterlerini değiştirin veya yeni yazı ekleyin
          </p>
        </div>
      ) : (
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: "#111219",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Table header — desktop */}
          <div
            className="hidden sm:grid sm:grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-6 py-3 text-xs font-semibold uppercase tracking-wider"
            style={{
              color: "#475569",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <span />
            <span>Başlık</span>
            <span>Kategori</span>
            <span>Tarih</span>
            <span>İşlemler</span>
          </div>

          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            {filtered.map((post) => (
              <div
                key={post.id}
                className="flex flex-col sm:grid sm:grid-cols-[auto_1fr_auto_auto_auto] sm:items-center gap-3 sm:gap-4 px-6 py-4 hover:bg-white/[0.015] transition-colors group"
              >
                {/* Emoji */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  {post.emoji}
                </div>

                {/* Title + desc */}
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug" style={{ color: "#f1f5f9" }}>
                    {post.title}
                  </p>
                  <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "#475569" }}>
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 sm:hidden">
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
                  </div>
                </div>

                {/* Category — desktop */}
                <span
                  className="hidden sm:inline-block text-xs px-2.5 py-1 rounded-full whitespace-nowrap"
                  style={{
                    background: post.categoryBg,
                    color: post.categoryColor,
                    border: `1px solid ${post.categoryBorder}`,
                  }}
                >
                  {post.category}
                </span>

                {/* Date — desktop */}
                <div className="hidden sm:flex items-center gap-1.5 whitespace-nowrap">
                  <Clock size={12} style={{ color: "#334155" }} />
                  <span className="text-xs" style={{ color: "#475569" }}>
                    {post.date}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => openEdit(post)}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
                    style={{
                      background: "rgba(124,58,237,0.12)",
                      color: "#a78bfa",
                      border: "1px solid rgba(124,58,237,0.2)",
                    }}
                  >
                    <Pencil size={12} />
                    <span className="hidden sm:inline">Düzenle</span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(post)}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      color: "#f87171",
                      border: "1px solid rgba(239,68,68,0.2)",
                    }}
                  >
                    <Trash2 size={12} />
                    <span className="hidden sm:inline">Sil</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

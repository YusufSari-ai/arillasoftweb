"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { ImagePlus, X, Loader2 } from "lucide-react";

interface Props {
    value: string;
    onChange: (url: string) => void;
}

export default function CloudinaryUpload({ value, onChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    async function uploadFile(file: File) {
        if (!file.type.startsWith("image/")) {
            setUploadError("Lütfen bir görsel dosyası seçin.");
            return;
        }

        setUploading(true);
        setUploadError("");

        try {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset!);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                { method: "POST", body: formData }
            );

            if (!res.ok) throw new Error("Yükleme başarısız.");

            const data = await res.json();
            onChange(data.secure_url);
        } catch {
            setUploadError("Görsel yüklenirken bir hata oluştu.");
        } finally {
            setUploading(false);
        }
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) uploadFile(file);
        e.target.value = "";
    }

    function handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) uploadFile(file);
    }

    function handleDragOver(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDragging(true);
    }

    function handleDragLeave() {
        setDragging(false);
    }

    function handleRemove() {
        onChange("");
        setUploadError("");
    }

    return (
        <div className="space-y-2">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {value ? (
                <div className="relative overflow-hidden rounded-xl border border-white/10">
                    <div className="relative h-48 w-full">
                        <Image
                            src={value}
                            alt="Kapak görseli"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white backdrop-blur-sm transition hover:bg-white/20"
                        >
                            Değiştir
                        </button>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="flex items-center gap-1 rounded-lg border border-rose-500/40 bg-rose-500/20 px-3 py-1.5 text-xs text-rose-300 backdrop-blur-sm transition hover:bg-rose-500/30"
                        >
                            <X className="h-3 w-3" />
                            Kaldır
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => !uploading && inputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={[
                        "flex h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition",
                        dragging
                            ? "border-violet-500 bg-violet-500/10"
                            : "border-white/10 bg-[#0b0d12] hover:border-violet-500/50 hover:bg-violet-500/5",
                        uploading ? "cursor-wait" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {uploading ? (
                        <>
                            <Loader2 className="h-7 w-7 animate-spin text-violet-400" />
                            <p className="text-sm text-slate-400">Yükleniyor...</p>
                        </>
                    ) : (
                        <>
                            <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-3">
                                <ImagePlus className="h-6 w-6 text-violet-400" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-slate-300">
                                    Görseli buraya sürükle veya{" "}
                                    <span className="text-violet-400">tıkla</span>
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    PNG, JPG, WEBP — maks. 10 MB
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}

            {uploadError && (
                <p className="text-xs text-rose-400">{uploadError}</p>
            )}
        </div>
    );
}

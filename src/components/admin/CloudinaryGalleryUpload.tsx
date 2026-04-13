"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { ImagePlus, X, Loader2 } from "lucide-react";

interface Props {
    value: string[];
    onChange: (urls: string[]) => void;
}

export default function CloudinaryGalleryUpload({ value, onChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    async function uploadFile(file: File): Promise<string | null> {
        if (!file.type.startsWith("image/")) {
            setUploadError("Lütfen yalnızca görsel dosyaları seçin.");
            return null;
        }

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
        return data.secure_url as string;
    }

    async function handleFiles(files: FileList) {
        setUploading(true);
        setUploadError("");

        try {
            const uploads = await Promise.all(
                Array.from(files).map((file) => uploadFile(file))
            );
            const newUrls = uploads.filter((url): url is string => url !== null);
            if (newUrls.length > 0) {
                onChange([...value, ...newUrls]);
            }
        } catch {
            setUploadError("Bir veya daha fazla görsel yüklenirken hata oluştu.");
        } finally {
            setUploading(false);
        }
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
        e.target.value = "";
    }

    function handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    }

    function handleDragOver(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDragging(true);
    }

    function handleDragLeave() {
        setDragging(false);
    }

    function handleRemove(index: number) {
        onChange(value.filter((_, i) => i !== index));
    }

    return (
        <div className="space-y-3">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Drop zone */}
            <div
                onClick={() => !uploading && inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={[
                    "flex h-36 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition",
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
                                Görselleri buraya sürükle veya{" "}
                                <span className="text-violet-400">tıkla</span>
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Çoklu seçim desteklenir — PNG, JPG, WEBP
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Gallery grid */}
            {value.length > 0 && (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {value.map((url, index) => (
                        <div
                            key={url + index}
                            className="group relative overflow-hidden rounded-xl border border-white/10"
                        >
                            <div className="relative h-24 w-full">
                                <Image
                                    src={url}
                                    alt={`Galeri görseli ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/80 text-white opacity-0 transition hover:bg-rose-500 group-hover:opacity-100"
                                aria-label="Görseli kaldır"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {uploadError && (
                <p className="text-xs text-rose-400">{uploadError}</p>
            )}
        </div>
    );
}

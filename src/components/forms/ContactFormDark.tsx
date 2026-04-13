"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { submitContactMessage } from "@/lib/contact-actions";
import { CheckCircle, AlertCircle, Loader2, Send } from "lucide-react";

const fieldBase =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-cyan-500/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-cyan-500/20";
const fieldError =
    "border-red-500/40 focus:border-red-500/60 focus:ring-red-500/20";
const labelBase = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-500";
const errorText = "mt-1.5 text-xs text-red-400";

export default function ContactFormDark() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setStatus("loading");
        try {
            await submitContactMessage(data);
            setStatus("success");
            reset();
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-8 py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
                    <CheckCircle className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Mesajınız Alındı!</h3>
                <p className="mt-2 text-slate-400">
                    En kısa sürede size dönüş yapacağız.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                    Yeni Mesaj Gönder
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {status === "error" && (
                <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                    <p className="text-sm text-red-400">
                        Mesaj gönderilemedi. Lütfen tekrar deneyin.
                    </p>
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="fullName" className={labelBase}>Ad Soyad *</label>
                    <input
                        id="fullName"
                        placeholder="Ahmet Yılmaz"
                        className={`${fieldBase} ${errors.fullName ? fieldError : ""}`}
                        {...register("fullName")}
                    />
                    {errors.fullName && <p className={errorText}>{errors.fullName.message}</p>}
                </div>
                <div>
                    <label htmlFor="email" className={labelBase}>E-posta *</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="ahmet@sirket.com"
                        className={`${fieldBase} ${errors.email ? fieldError : ""}`}
                        {...register("email")}
                    />
                    {errors.email && <p className={errorText}>{errors.email.message}</p>}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="phone" className={labelBase}>Telefon</label>
                    <input
                        id="phone"
                        placeholder="+90 500 000 00 00"
                        className={fieldBase}
                        {...register("phone")}
                    />
                </div>
                <div>
                    <label htmlFor="company" className={labelBase}>Şirket</label>
                    <input
                        id="company"
                        placeholder="Şirket Adı"
                        className={fieldBase}
                        {...register("company")}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="subject" className={labelBase}>Konu *</label>
                <input
                    id="subject"
                    placeholder="Nasıl yardımcı olabiliriz?"
                    className={`${fieldBase} ${errors.subject ? fieldError : ""}`}
                    {...register("subject")}
                />
                {errors.subject && <p className={errorText}>{errors.subject.message}</p>}
            </div>

            <div>
                <label htmlFor="message" className={labelBase}>Mesaj *</label>
                <textarea
                    id="message"
                    rows={5}
                    placeholder="Projeniz veya sorunuz hakkında bilgi verin..."
                    className={`${fieldBase} resize-none ${errors.message ? fieldError : ""}`}
                    {...register("message")}
                />
                {errors.message && <p className={errorText}>{errors.message.message}</p>}
            </div>

            <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {status === "loading" ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Gönderiliyor...
                    </>
                ) : (
                    <>
                        <Send className="h-4 w-4" />
                        Mesajı Gönder
                    </>
                )}
            </button>
        </form>
    );
}

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#08090d] px-6 py-20 text-slate-100">
            <div className="mx-auto max-w-5xl">
                <div className="mb-10">
                    <p className="mb-3 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">
                        Hakkımızda
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                        ArillaSoft Hakkında
                    </h1>
                    <p className="mt-4 max-w-3xl text-base text-slate-400 md:text-lg">
                        ArillaSoft olarak işletmeler için modern, hızlı ve ölçeklenebilir
                        yazılım çözümleri geliştiriyoruz. Web uygulamaları, özel yazılım
                        projeleri, QR menü sistemleri ve dijital dönüşüm süreçlerinde güçlü
                        çözümler sunuyoruz.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <h2 className="text-lg font-semibold text-white">Vizyonumuz</h2>
                        <p className="mt-3 text-sm leading-7 text-slate-400">
                            İşletmelerin dijital dünyada daha güçlü, daha hızlı ve daha
                            verimli hareket etmesini sağlayan yazılımlar üretmek.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <h2 className="text-lg font-semibold text-white">Yaklaşımımız</h2>
                        <p className="mt-3 text-sm leading-7 text-slate-400">
                            Kullanıcı deneyimini ön planda tutan, sade ama güçlü arayüzlerle
                            işlevsel ve güvenilir sistemler geliştiriyoruz.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <h2 className="text-lg font-semibold text-white">Odak Alanlarımız</h2>
                        <p className="mt-3 text-sm leading-7 text-slate-400">
                            Web geliştirme, özel yazılım çözümleri, UI/UX tasarım, mobil uyumlu
                            sistemler ve işletmeler için dijital ürünler.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
import React from 'react';
import Link from 'next/link';
import { Code2, Linkedin, Github, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              Arillasoft
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              Modern yazılım çözümleri ile işletmenizi dijital geleceğe taşıyoruz. Web, mobil ve kurumsal yazılım geliştirme.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com/company/arillasoft" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://github.com/arillasoft" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/arillasoft" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-pink-600 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://twitter.com/arillasoft" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-sky-500 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="font-semibold text-white mb-4">Hizmetler</h3>
            <ul className="space-y-2">
              {[
                { label: 'Web Uygulama Geliştirme', href: '/hizmetler/web-uygulama-gelistirme' },
                { label: 'Mobil Uygulama', href: '/hizmetler/mobil-uygulama-gelistirme' },
                { label: 'Özel Yazılım', href: '/hizmetler/ozel-yazilim-gelistirme' },
                { label: 'UI/UX Tasarımı', href: '/hizmetler/ui-ux-tasarimi' },
                { label: 'Backend & API', href: '/hizmetler/backend-ve-api-gelistirme' },
                { label: 'Bakım & Destek', href: '/hizmetler/bakim-ve-teknik-destek' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h3 className="font-semibold text-white mb-4">Şirket</h3>
            <ul className="space-y-2">
              {[
                { label: 'Hakkımızda', href: '/hakkimizda' },
                { label: 'Projeler', href: '/projeler' },
                { label: 'Blog', href: '/blog' },
                { label: 'Kariyer', href: '/kariyer' },
                { label: 'Sık Sorulan Sorular', href: '/sss' },
                { label: 'İletişim', href: '/iletisim' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="font-semibold text-white mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Mail className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                <a href="mailto:iletisim@arillasoft.com" className="text-slate-400 hover:text-white transition-colors">
                  iletisim@arillasoft.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                <a href="tel:+902125550101" className="text-slate-400 hover:text-white transition-colors">
                  +90 (212) 555 01 01
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-slate-400">
                  Maslak Mah. Büyükdere Cad. No:128<br />
                  Sarıyer / İstanbul
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/teklif-al"
                className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Teklif Al
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {currentYear} Arillasoft. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/gizlilik-politikasi" className="hover:text-slate-300 transition-colors">
              Gizlilik Politikası
            </Link>
            <span>·</span>
            <Link href="/kullanim-kosullari" className="hover:text-slate-300 transition-colors">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

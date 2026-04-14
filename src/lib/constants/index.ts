export const SITE_NAME = 'Arillasoft';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arillasoft.com';
export const SITE_DESCRIPTION =
  'Modern yazılım çözümleri ile işletmenizi dijital geleceğe taşıyoruz. Web, mobil ve kurumsal yazılım geliştirme.';

export const NAV_LINKS = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Hizmetler', href: '/services' },
  { label: 'Projeler', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'İletişim', href: '/iletisim' },
];

export const PROJECT_TYPE_LABELS: Record<string, string> = {
  WEB_APPLICATION: 'Web Uygulaması',
  MOBILE_APPLICATION: 'Mobil Uygulama',
  CUSTOM_SOFTWARE: 'Özel Yazılım',
  UI_UX_DESIGN: 'UI/UX Tasarımı',
  BACKEND_API: 'Backend / API',
  ECOMMERCE: 'E-Ticaret',
  SAAS: 'SaaS Ürün',
  OTHER: 'Diğer',
};

export const BUDGET_RANGE_LABELS: Record<string, string> = {
  UNDER_10K: '10.000 TL\'nin altında',
  RANGE_10K_25K: '10.000 - 25.000 TL',
  RANGE_25K_50K: '25.000 - 50.000 TL',
  RANGE_50K_100K: '50.000 - 100.000 TL',
  ABOVE_100K: '100.000 TL\'nin üzerinde',
  UNDECIDED: 'Henüz karar vermedim',
};

export const PLATFORM_LABELS: Record<string, string> = {
  WEB: 'Web Tarayıcısı',
  IOS: 'iOS',
  ANDROID: 'Android',
  BOTH_MOBILE: 'iOS ve Android',
  DESKTOP: 'Masaüstü',
  ALL_PLATFORMS: 'Tüm Platformlar',
};

export const TECH_STACK = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Dil' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: '.NET', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Veritabanı' },
  { name: 'MongoDB', category: 'Veritabanı' },
  { name: 'Redis', category: 'Cache' },
  { name: 'React Native', category: 'Mobil' },
  { name: 'Flutter', category: 'Mobil' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
];

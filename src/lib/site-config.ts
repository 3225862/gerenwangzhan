export type SiteLanguage = 'zh' | 'ja' | 'en';

export type SiteNavItem = {
  label: string;
  href: string;
  languages?: SiteLanguage[];
};

export type SiteConfig = {
  siteName: string;
  description: string;
  defaultLanguage: SiteLanguage;
  availableLanguages: SiteLanguage[];
  navigation: SiteNavItem[];
  footerLinks: SiteNavItem[];
  contactEmail: string;
};

// P1 interface: future SiteSettings fields can replace these defaults without changing layouts.
export const siteConfig: SiteConfig = {
  siteName: '个人网站',
  description: '记录项目、文章与长期思考的个人空间。',
  defaultLanguage: 'zh',
  availableLanguages: ['zh', 'ja', 'en'],
  navigation: [
    { label: '首页', href: '/' },
    { label: '关于我', href: '/about/' },
    { label: '项目', href: '/projects/' },
    { label: '文章', href: '/articles/' },
    { label: '时间轴', href: '/timeline/' },
    { label: '作品', href: '/portfolio/' },
  ],
  footerLinks: [
    { label: '邮箱', href: 'mailto:hello@example.com' },
    { label: 'GitHub', href: 'https://github.com/' },
  ],
  contactEmail: '',
};

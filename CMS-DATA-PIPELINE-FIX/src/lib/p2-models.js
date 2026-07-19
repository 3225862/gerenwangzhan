import { z } from 'zod';

export const safeUrl = z
  .string()
  .refine(
    (value) =>
      value.startsWith('/') ||
      value.startsWith('#') ||
      value.startsWith('mailto:') ||
      value.startsWith('https://') ||
      value.startsWith('http://'),
    '必须是站内路径、锚点、邮箱或 HTTP(S) 链接',
  );
const visibilityItem = z.object({
  visible: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});
const socialLink = z.object({
  label: z.string().min(1),
  platform: z.string().default('other'),
  url: safeUrl,
  visible: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(1),
  siteDescription: z.string().min(1),
  contentStatus: z.enum(['placeholder', 'ready']).default('placeholder'),
  defaultLanguage: z.enum(['zh', 'ja', 'en']).default('zh'),
  availableLanguages: z.array(z.enum(['zh', 'ja', 'en'])).default(['zh', 'ja', 'en']),
  email: z.string().email().or(z.literal('')).default(''),
  emailPublic: z.boolean().default(false),
  socialLinks: z.array(socialLink).default([]),
  footerText: z.string().default(''),
  resumeUrl: safeUrl.or(z.literal('')).default(''),
  resumePublic: z.boolean().default(false),
  navigation: z
    .array(
      z.object({
        label: z.string().min(1),
        href: safeUrl,
        visible: z.boolean().default(true),
        sortOrder: z.number().int().default(0),
      }),
    )
    .default([]),
});

const profileItem = visibilityItem.extend({
  title: z.string().min(1),
  description: z.string().default(''),
});
export const profileSchema = z.object({
  contentStatus: z.enum(['placeholder', 'ready']).default('placeholder'),
  displayName: z.string().min(1),
  legalName: z.string().default(''),
  preferredName: z.string().default(''),
  shortBio: z.string().min(1),
  fullBio: z.string().min(1),
  location: z.string().default(''),
  currentRole: z.string().default(''),
  educationSummary: z.string().default(''),
  avatar: z.string().nullable().default(null),
  portrait: z.string().nullable().default(null),
  email: z.string().email().or(z.literal('')).default(''),
  resumeUrl: safeUrl.or(z.literal('')).default(''),
  resumePublic: z.boolean().default(false),
  availabilityStatus: z.string().default(''),
  interests: z.array(profileItem).default([]),
  skills: z.array(profileItem).default([]),
  languages: z.array(profileItem).default([]),
  socialLinks: z.array(socialLink).default([]),
  philosophy: z.string().default(''),
  futureDirection: z.string().default(''),
  displayNamePublic: z.boolean().default(true),
  legalNamePublic: z.boolean().default(false),
  locationPublic: z.boolean().default(false),
  emailPublic: z.boolean().default(false),
});

const homepageItem = visibilityItem.extend({
  title: z.string().min(1),
  description: z.string().default(''),
  icon: z.string().default(''),
});
export const homepageSchema = z.object({
  contentStatus: z.enum(['placeholder', 'ready']).default('placeholder'),
  eyebrow: z.string().default(''),
  heroTitle: z.string().min(1),
  heroDescription: z.string().min(1),
  primaryCtaLabel: z.string().min(1),
  primaryCtaUrl: safeUrl,
  secondaryCtaLabel: z.string().default(''),
  secondaryCtaUrl: safeUrl.or(z.literal('')).default(''),
  heroImage: z.string().nullable().default(null),
  showHeroImage: z.boolean().default(false),
  introductionTitle: z.string().default(''),
  introductionBody: z.string().default(''),
  focusAreas: z.array(homepageItem).default([]),
  featuredProjectsLimit: z.number().int().min(0).max(3).default(2),
  currentStatusTitle: z.string().default(''),
  currentStatusBody: z.string().default(''),
  contactTitle: z.string().default(''),
  contactDescription: z.string().default(''),
  contactCtaLabel: z.string().default(''),
  contactCtaUrl: safeUrl.or(z.literal('')).default(''),
  sectionVisibility: z
    .object({
      introduction: z.boolean().default(true),
      focus: z.boolean().default(true),
      featured: z.boolean().default(true),
      status: z.boolean().default(true),
      contact: z.boolean().default(true),
    })
    .default({}),
  sectionOrder: z
    .array(z.enum(['introduction', 'focus', 'featured', 'status', 'contact']))
    .refine((items) => new Set(items).size === items.length, '区块顺序不能重复')
    .default(['introduction', 'focus', 'featured', 'status', 'contact']),
});

export function sortVisible(items = []) {
  return [...items]
    .filter((item) => item.visible !== false)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}
export function getFeaturedProjects(projects, limit) {
  return projects
    .filter(
      ({ data }) =>
        data.featured &&
        !data.draft &&
        (!data.publicationStatus || data.publicationStatus === 'published'),
    )
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder)
    .slice(0, limit);
}
export function getPublicProfile(profile) {
  return {
    ...profile,
    legalName: profile.legalNamePublic ? profile.legalName : '',
    location: profile.locationPublic ? profile.location : '',
    email: profile.emailPublic ? profile.email : '',
    resumeUrl: profile.resumePublic ? profile.resumeUrl : '',
  };
}

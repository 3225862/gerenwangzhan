import { getCollection } from 'astro:content';
import { siteConfig } from './site-config.js';
import { getPublicProfile, sortVisible } from './p2-models.js';

async function first(name) {
  const entries = await getCollection(name);
  return entries[0]?.data;
}
export async function getSiteData() {
  const data = await first('siteSettings');
  if (!data) return siteConfig;
  return {
    ...siteConfig,
    siteName: data.siteName,
    description: data.siteDescription,
    defaultLanguage: data.defaultLanguage,
    availableLanguages: data.availableLanguages,
    navigation: sortVisible(data.navigation),
    footerLinks: sortVisible(data.socialLinks).map(({ label, url }) => ({ label, href: url })),
    contactEmail: data.emailPublic ? data.email : '',
  };
}
export async function getHomepageData() {
  return first('homepage');
}
export async function getProfileData() {
  const data = await first('profile');
  return data ? getPublicProfile(data) : null;
}

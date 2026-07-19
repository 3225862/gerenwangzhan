import type { SiteNavItem } from './site-config';

export function isCurrentPath(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href.replace(/\/$/, '')}/`);
}

export function isExternalHref(href: string) {
  return /^(https?:|mailto:)/.test(href);
}

export function getNavigationItems(items: SiteNavItem[], pathname: string) {
  return items.map((item) => ({ ...item, current: isCurrentPath(item.href, pathname) }));
}

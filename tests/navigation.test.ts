import { describe, expect, it } from 'vitest';
import { getNavigationItems, isCurrentPath, isExternalHref } from '../src/lib/navigation';

describe('P1 navigation rules', () => {
  it('marks the root and nested routes correctly', () => {
    expect(isCurrentPath('/', '/')).toBe(true);
    expect(isCurrentPath('/', '/about/')).toBe(false);
    expect(isCurrentPath('/projects/', '/projects/example/')).toBe(true);
    expect(isCurrentPath('/project/', '/projects/example/')).toBe(false);
  });

  it('keeps external and mail links identifiable', () => {
    expect(isExternalHref('https://example.com')).toBe(true);
    expect(isExternalHref('mailto:hello@example.com')).toBe(true);
    expect(isExternalHref('/about/')).toBe(false);
  });

  it('adds a single current state for a navigation list', () => {
    const items = getNavigationItems(
      [
        { label: '首页', href: '/' },
        { label: '项目', href: '/projects/' },
      ],
      '/projects/example/',
    );
    expect(items.filter((item) => item.current).map((item) => item.label)).toEqual(['项目']);
  });
});

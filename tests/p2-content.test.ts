import { describe, expect, it } from 'vitest';
import {
  getFeaturedProjects,
  getPublicProfile,
  homepageSchema,
  profileSchema,
  safeUrl,
  siteSettingsSchema,
} from '../src/lib/p2-models.js';

const homepage = {
  heroTitle: '标题',
  heroDescription: '说明',
  primaryCtaLabel: '关于',
  primaryCtaUrl: '/about/',
  sectionOrder: ['introduction', 'focus', 'featured', 'status', 'contact'],
};
const profile = { displayName: '公开称呼', shortBio: '短简介', fullBio: '完整简介' };
describe('P2 内容模型', () => {
  it('接受最小首页和资料，并要求关键字段', () => {
    expect(homepageSchema.parse(homepage).heroTitle).toBe('标题');
    expect(profileSchema.parse(profile).displayName).toBe('公开称呼');
    expect(() => homepageSchema.parse({ ...homepage, heroTitle: '' })).toThrow();
    expect(() => profileSchema.parse({ ...profile, displayName: '' })).toThrow();
    expect(() => profileSchema.parse({ ...profile, shortBio: '' })).toThrow();
    expect(() => profileSchema.parse({ ...profile, fullBio: '' })).toThrow();
  });
  it('校验站内路径、锚点和安全链接', () => {
    expect(safeUrl.parse('/about/')).toBe('/about/');
    expect(safeUrl.parse('#featured-projects')).toBe('#featured-projects');
    expect(() => safeUrl.parse('../private')).toThrow();
    expect(() => safeUrl.parse('javascript:alert(1)')).toThrow();
  });
  it('拒绝重复区块顺序和不合法站点设置', () => {
    expect(() => homepageSchema.parse({ ...homepage, sectionOrder: ['focus', 'focus'] })).toThrow();
    expect(() => siteSettingsSchema.parse({ siteName: '', siteDescription: 'x' })).toThrow();
  });
  it('隐私字段默认不公开', () => {
    const publicProfile = getPublicProfile(
      profileSchema.parse({
        ...profile,
        email: 'private@example.com',
        location: 'private',
        legalName: 'Private',
      }),
    );
    expect(publicProfile.email).toBe('');
    expect(publicProfile.location).toBe('');
    expect(publicProfile.legalName).toBe('');
  });
  it('推荐项目只读取已发布内容', () => {
    const item = (draft: boolean, featured: boolean, sortOrder: number) => ({
      data: { draft, featured, sortOrder },
    });
    expect(
      getFeaturedProjects([item(false, true, 2), item(true, true, 1), item(false, false, 0)], 2),
    ).toHaveLength(1);
  });
});

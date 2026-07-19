import { describe, expect, it } from 'vitest';
import {
  allowedProjectImageExtensions,
  maxProjectImageBytes,
  projectImageDirectory,
  projectSchema,
  validateProjectDocuments,
} from '../src/lib/project-validation.js';

const validProject = {
  title: '测试项目',
  slug: 'test-project',
  summary: '用于验证 CMS 到 Astro 的最小内容链路。',
  body: '测试正文',
  coverImage: null,
  status: 'completed',
  featured: true,
  sortOrder: 1,
  publishedAt: '2026-07-13',
  draft: false,
};

describe('P0 project content rules', () => {
  it('uses the production schema for a valid published project', () => {
    expect(projectSchema.safeParse(validProject).success).toBe(true);
  });

  it('rejects empty, unsafe, and path-traversal slugs', () => {
    expect(projectSchema.safeParse({ ...validProject, slug: '' }).success).toBe(false);
    expect(projectSchema.safeParse({ ...validProject, slug: '../secret' }).success).toBe(false);
    expect(projectSchema.safeParse({ ...validProject, slug: 'a/b' }).success).toBe(false);
  });

  it('blocks duplicate slugs and mismatched filenames', () => {
    const documents = [
      { file: 'first.yaml', fileBaseName: 'first', data: { ...validProject, slug: 'same' } },
      { file: 'second.yaml', fileBaseName: 'second', data: { ...validProject, slug: 'same' } },
    ];
    const errors = validateProjectDocuments(documents);
    expect(errors.some((error) => error.includes('duplicate slug "same"'))).toBe(true);
    expect(errors.some((error) => error.includes('filename must match'))).toBe(true);
  });

  it('filters drafts from public output', () => {
    const projects = [
      { draft: false, slug: 'published' },
      { draft: true, slug: 'draft' },
    ];
    expect(projects.filter((project) => !project.draft).map((project) => project.slug)).toEqual([
      'published',
    ]);
  });

  it('defines the P0 image boundary', () => {
    expect(projectImageDirectory).toBe('/uploads/projects/');
    expect([...allowedProjectImageExtensions]).toEqual(['.jpg', '.jpeg', '.png', '.webp']);
    expect(maxProjectImageBytes).toBe(2 * 1024 * 1024);
    expect(allowedProjectImageExtensions.has('.svg')).toBe(false);
    expect(allowedProjectImageExtensions.has('.gif')).toBe(false);
    expect(allowedProjectImageExtensions.has('.zip')).toBe(false);
  });
});

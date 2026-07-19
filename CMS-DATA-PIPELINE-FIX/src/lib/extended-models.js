import { z } from 'zod';
import { projectSchema } from './project-validation.js';

export const articleSchema = z.object({
  title: z.string().min(1).max(160),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().min(1).max(320),
  body: z.string().default(''),
  coverImage: z.string().nullable().default(null),
  category: z.string().default(''),
  tags: z.array(z.string()).default([]),
  author: z.string().default(''),
  publishedAt: z.coerce.date().nullable().default(null),
  updatedAt: z.coerce.date().nullable().default(null),
  draft: z.boolean().default(true),
  publicationStatus: z.enum(['draft', 'published', 'archived']).default('draft'),
  featured: z.boolean().default(false),
  seoTitle: z.string().default(''),
  seoDescription: z.string().default(''),
  canonicalUrl: z.string().default(''),
  socialImage: z.string().nullable().default(null),
});
const dated = z.object({
  title: z.string().min(1),
  summary: z.string().default(''),
  startDate: z.coerce.date().nullable().default(null),
  endDate: z.coerce.date().nullable().default(null),
  sortOrder: z.number().int().default(0),
  draft: z.boolean().default(true),
  visible: z.boolean().default(true),
});
export const experienceSchema = dated.extend({
  role: z.string().default(''),
  organization: z.string().default(''),
  location: z.string().default(''),
  body: z.string().default(''),
  tags: z.array(z.string()).default([]),
});
export const educationSchema = dated.extend({
  institution: z.string().default(''),
  degree: z.string().default(''),
  body: z.string().default(''),
});
export const timelineSchema = dated.extend({
  kind: z.string().default(''),
  body: z.string().default(''),
  relatedUrl: z.string().default(''),
});
export const portfolioSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().min(1),
  body: z.string().default(''),
  coverImage: z.string().nullable().default(null),
  tags: z.array(z.string()).default([]),
  externalUrl: z.string().default(''),
  draft: z.boolean().default(true),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});
export { projectSchema };
export const publicEntries = (entries) =>
  entries.filter(
    ({ data }) => !data.draft && data.publicationStatus === 'published' && data.visible !== false,
  );
export const sortEntries = (entries) =>
  [...entries].sort((a, b) => (a.data.sortOrder ?? 0) - (b.data.sortOrder ?? 0));
export const paragraphs = (value = '') => value.split(/\n\s*\n/).filter(Boolean);

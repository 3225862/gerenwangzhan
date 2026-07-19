import { z } from 'zod';

export const projectSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const projectImageDirectory = '/uploads/projects/';
export const allowedProjectImageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
export const maxProjectImageBytes = 2 * 1024 * 1024;

export const projectSchema = z.object({
  title: z.string().min(1).max(120),
  slug: z.string().min(1).regex(projectSlugPattern),
  summary: z.string().min(1).max(300),
  body: z.string().default(''),
  subtitle: z.string().default(''),
  coverImage: z.string().min(1).nullable().optional(),
  images: z.array(z.string()).default([]),
  role: z.string().default(''),
  methods: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  externalUrl: z.string().default(''),
  githubUrl: z.string().default(''),
  demoUrl: z.string().default(''),
  relatedProjects: z.array(z.string()).default([]),
  relatedArticles: z.array(z.string()).default([]),
  status: z.enum(['planned', 'active', 'completed', 'paused']).default('planned'),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  publishedAt: z.coerce.date().nullable().optional(),
  draft: z.boolean().default(true),
  publicationStatus: z.enum(['draft', 'published', 'archived']).default('draft'),
});

export function validateProjectDocuments(documents) {
  const errors = [];
  const slugs = new Map();

  for (const document of documents) {
    const parsed = projectSchema.safeParse(document.data);
    if (!parsed.success) {
      errors.push(`${document.file}: schema validation failed`);
      continue;
    }

    const { slug } = parsed.data;
    const previous = slugs.get(slug);
    if (previous) errors.push(`duplicate slug "${slug}": ${previous} and ${document.file}`);
    slugs.set(slug, document.file);

    if (document.fileBaseName !== slug) {
      errors.push(`${document.file}: filename must match content slug "${slug}"`);
    }
  }

  return errors;
}

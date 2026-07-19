import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { projectSchema } from './lib/project-validation.js';
import { homepageSchema, profileSchema, siteSettingsSchema } from './lib/p2-models.js';
import type { ZodType } from 'zod';
import {
  articleSchema,
  educationSchema,
  experienceSchema,
  portfolioSchema,
  timelineSchema,
} from './lib/extended-models.js';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/projects' }),
  schema: projectSchema,
});

const singleton = (pattern: string, schema: ZodType) =>
  defineCollection({ loader: glob({ pattern, base: './src/data' }), schema });
const contentCollection = (base: string, schema: ZodType) =>
  defineCollection({ loader: glob({ pattern: '**/*.yaml', base }), schema });
export const collections = {
  projects,
  articles: contentCollection('./src/content/articles', articleSchema),
  experiences: contentCollection('./src/content/experiences', experienceSchema),
  education: contentCollection('./src/content/education', educationSchema),
  timeline: contentCollection('./src/content/timeline', timelineSchema),
  portfolio: contentCollection('./src/content/portfolio', portfolioSchema),
  siteSettings: singleton('site-settings.yaml', siteSettingsSchema),
  profile: singleton('profile.yaml', profileSchema),
  homepage: singleton('homepage.yaml', homepageSchema),
};

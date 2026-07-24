import { basename, extname, resolve, sep } from 'node:path';
import { glob, readFile, stat } from 'node:fs/promises';
import { parse } from 'yaml';
import {
  allowedProjectImageExtensions,
  maxProjectImageBytes,
  projectImageDirectory,
  projectSchema,
  validateProjectDocuments,
} from '../src/lib/project-validation.js';
import { homepageSchema, profileSchema, siteSettingsSchema } from '../src/lib/p2-models.js';

const projectFiles = [];
for await (const file of glob('src/content/projects/*.yaml')) projectFiles.push(file);

const documents = [];
for (const file of projectFiles.sort()) {
  const fileBaseName = basename(file, extname(file));
  documents.push({
    file,
    fileBaseName,
    data: parse(await readFile(file, 'utf8')),
  });
}

const errors = validateProjectDocuments(documents);
const publicDir = resolve('public');
const singletonSchemas = [
  ['src/data/homepage.yaml', homepageSchema],
  ['src/data/profile.yaml', profileSchema],
  ['src/data/site-settings.yaml', siteSettingsSchema],
];

for (const [file, schema] of singletonSchemas) {
  try {
    schema.parse(parse(await readFile(file, 'utf8')));
  } catch (error) {
    const details = error.issues
      ?.map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('; ');
    errors.push(`${file}: ${details || error.message}`);
  }
}

for (const document of documents) {
  const parsed = projectSchema.safeParse(document.data);
  if (!parsed.success || !parsed.data.coverImage) continue;

  const reference = parsed.data.coverImage;
  const extension = extname(reference).toLowerCase();
  if (!reference.startsWith(projectImageDirectory)) {
    errors.push(`${document.file}: image must be under ${projectImageDirectory}`);
    continue;
  }
  if (reference.includes('..') || reference.includes('\\')) {
    errors.push(`${document.file}: image path traversal is not allowed`);
    continue;
  }
  if (!allowedProjectImageExtensions.has(extension)) {
    errors.push(`${document.file}: image extension ${extension || '(missing)'} is not allowed`);
    continue;
  }

  const imagePath = resolve(publicDir, `.${reference}`);
  if (!imagePath.startsWith(`${publicDir}${sep}`)) {
    errors.push(`${document.file}: image resolves outside public directory`);
    continue;
  }

  try {
    const imageStat = await stat(imagePath);
    if (!imageStat.isFile()) errors.push(`${document.file}: image reference is not a file`);
    else if (imageStat.size > maxProjectImageBytes) {
      errors.push(`${document.file}: image exceeds the 2 MB limit`);
    }
  } catch {
    errors.push(`${document.file}: referenced image does not exist: ${reference}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`内容和图片检查通过（检查 ${documents.length} 个项目）。`);

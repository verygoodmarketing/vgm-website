import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedDate: z.date(),
    features: z.array(z.string()).optional(),
    canonicalUrl: z.string().url().optional(),
    ogImage: z.string().optional(),
    ogType: z
      .enum(['website', 'article', 'profile', 'book', 'music', 'video'])
      .optional()
      .default('website'),
    twitterCard: z
      .enum(['summary', 'summary_large_image', 'app', 'player'])
      .optional()
      .default('summary_large_image'),
    metaRobots: z.string().optional().default('index, follow'),
    keywords: z.union([z.string(), z.array(z.string())]).optional(),
    author: z.string().optional(),
    metadata: z
      .object({
        author: z.string(),
        showInNav: z.boolean().default(true),
      })
      .optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
};

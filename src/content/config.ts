import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedDate: z.date(),
    features: z.array(z.string()).optional(),
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

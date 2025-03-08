import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    canonicalUrl: z.string().url().optional(),
    ogImage: z.string().optional(),
    ogType: z.enum(['website', 'article', 'profile', 'book', 'music', 'video']).default('article'),
    twitterCard: z
      .enum(['summary', 'summary_large_image', 'app', 'player'])
      .default('summary_large_image'),
    metaRobots: z.string().default('index, follow'),
  }),
});

// Define schema for feature card used in hero section
const featureCardSchema = z.object({
  title: z.string().optional(),
  features: z.array(z.string()).optional(),
});

// Define schema for hero section
const heroSchema = z.object({
  title: z.string().optional(),
  highlightedText: z.string().optional(),
  description: z.string().optional(),
  primaryButtonText: z.string().optional(),
  primaryButtonUrl: z.string().optional(),
  secondaryButtonText: z.string().optional(),
  secondaryButtonUrl: z.string().optional(),
  backgroundImage: z.string().optional(),
  featureCard: featureCardSchema.optional(),
});

// Define schema for values
const valueSchema = z.object({
  title: z.string(),
  description: z.string(),
});

// Define schema for team members
const teamMemberSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  image: z.string().optional(),
});

// Define schema for about section
const aboutSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  mission: z.string().optional(),
  missionImage: z.string().optional(),
  values: z.array(valueSchema).optional(),
  team: z.array(teamMemberSchema).optional(),
});

// Define schema for service items (for home page)
const serviceSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  features: z.array(z.string()).optional(),
});

// Define schema for services section (for home page)
const servicesSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  servicesList: z.array(serviceSchema).optional(),
});

// Define schema for pricing in service
const pricingSchema = z.object({
  upfront: z.number(),
  recurring: z.number(),
  recurringPeriod: z.string(),
  custom: z.string().optional(),
});

// Define schema for detailed service item (for services page)
const detailedServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  features: z.array(z.string()),
  pricing: pricingSchema,
});

// Define schema for pricing section
const pricingSectionSchema = z.object({
  serviceId: z.string(),
  sectionTitle: z.string().optional(),
  features: z.array(z.string()),
});

// Define schema for testimonial items
const testimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  company: z.string().optional(),
  image: z.string().optional(),
});

// Define schema for testimonials section
const testimonialsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  testimonialsList: z.array(testimonialSchema).optional(),
});

// Define schema for CTA section
const ctaSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  buttonText: z.string().optional(),
  buttonUrl: z.string().optional(),
});

// Define schema for category
const categorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
});

// Define schema for articles section
const articlesSectionSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  featuredTitle: z.string().optional(),
  featuredDescription: z.string().optional(),
  categoriesTitle: z.string().optional(),
  categories: z.array(categorySchema).optional(),
});

// Define schema for mission section
const missionSchema = z.object({
  imgSrc: z.string().optional(),
  imgAlt: z.string().optional(),
  content: z.string().optional(),
});

// Define schema for value item
const valueItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

// Define schema for founder item
const founderItemSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  imgSrc: z.string().optional(),
  imgAlt: z.string().optional(),
});

// Define schema for page header
const pageHeaderSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

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

    // Section content
    hero: heroSchema.optional(),
    about: aboutSchema.optional(),
    services: z.union([servicesSchema, z.array(detailedServiceSchema)]).optional(),
    testimonials: testimonialsSchema.optional(),
    cta: ctaSchema.optional(),
    articlesSection: articlesSectionSchema.optional(),

    // Services page specific
    pricingSection: pricingSectionSchema.optional(),

    // About page specific sections
    mission: missionSchema.optional(),
    values: z.array(valueItemSchema).optional(),
    founders: z.array(founderItemSchema).optional(),
    pageHeader: pageHeaderSchema.optional(),

    // Global Settings
    siteName: z.string().optional(),
    siteUrl: z.string().optional(),
    companyName: z.string().optional(),
    companyAddress: z.string().optional(),
    companyPhone: z.string().optional(),
    companyEmail: z.string().optional(),
    logo: z.string().optional(),

    // Social Media
    social: z
      .object({
        twitter: z.string().optional(),
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        linkedin: z.string().optional(),
      })
      .optional(),

    // Business Hours
    businessHours: z
      .object({
        weekdays: z.string().optional(),
        weekends: z.string().optional(),
      })
      .optional(),

    // Footer Information
    footer: z
      .object({
        copyright: z.string().optional(),
        privacyPolicyUrl: z.string().optional(),
        termsOfServiceUrl: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
  articles: articlesCollection,
};

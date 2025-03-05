import { getEntry } from 'astro:content';

/**
 * Fetches the global site configuration
 * @returns The site configuration object
 */
export async function getSiteConfig() {
  const siteEntry = await getEntry('pages', 'site');

  if (!siteEntry) {
    throw new Error('Site configuration not found. Make sure src/content/pages/site.md exists.');
  }

  // Process any markdown content if needed
  const { Content } = await siteEntry.render();

  // Create a structured config object from the frontmatter data
  const config = {
    // All configuration is directly from frontmatter
    ...siteEntry.data,

    // Include the rendered content component for advanced usage
    Content,
  };

  return config;
}

// For convenience in components where you don't want to await
export const siteConfigPromise = getSiteConfig();

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const sanityDataset = import.meta.env.VITE_SANITY_DATASET;
const sanityApiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';
const sanityApiToken = import.meta.env.VITE_SANITY_API_TOKEN;

export interface SanityProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
}

export interface SanityProductSubcategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  order: number;
}

export interface SanityProductSpecification {
  key: string;
  value: string;
}

export interface SanityProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  subcategory_id: string;
  specifications: SanityProductSpecification[];
  image_url: string;
  image_urls?: string[];
  is_featured: boolean;
  created_at: string;
}

function isSanityConfigured() {
  return Boolean(sanityProjectId && sanityDataset);
}

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  token: sanityApiToken,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function sanityQuery<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  if (!isSanityConfigured()) {
    throw new Error('Sanity is not configured. Add VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET.');
  }

  return sanityClient.fetch<T>(query, params);
}

export function sanityConfigMissing() {
  return !isSanityConfigured();
}

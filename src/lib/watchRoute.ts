import { slugify } from "@/lib/slugify";

/**
 * Builds a stable, SEO-friendly watch URL that always resolves the correct movie.
 * Format: /watch/:slug/:id
 */
export function buildWatchPath(title: string, id: string): string {
  return `/watch/${slugify(title)}/${id}`;
}

/**
 * Extract series base name from a title.
 * E.g. "One Piece S01 E03" -> "One Piece"
 *      "Shooter Part 2" -> "Shooter"
 *      "My Movie" -> "My Movie" (not a series)
 */
export function getSeriesBaseName(title: string): string {
  const seriesMatch = title.match(/^(.+?)\s*(S\d+\s*E\d+|Season\s*\d+|Part\s*\d+|EP?\s*\d+|Episode\s*\d+)/i);
  return seriesMatch ? seriesMatch[1].trim() : title;
}

/**
 * Check if a title looks like a series episode
 */
export function isSeriesEpisode(title: string): boolean {
  return /\s*(S\d+\s*E\d+|Season\s*\d+|Part\s*\d+|EP?\s*\d+|Episode\s*\d+)/i.test(title);
}

/**
 * Build a unique series key from base name + dubber (rating).
 * This ensures same-title series with different dubbers are treated separately.
 */
export function getSeriesKey(title: string, rating: string): string {
  const base = getSeriesBaseName(title).toLowerCase();
  const dubber = (rating || '').toLowerCase().trim();
  return dubber ? `${base}::${dubber}` : base;
}

/**
 * Extract episode number from a title for sorting
 */
function getEpisodeNumber(title: string): number {
  const match = title.match(/E(\d+)/i) || title.match(/Episode\s*(\d+)/i) || title.match(/Part\s*(\d+)/i) || title.match(/EP?\s*(\d+)/i);
  return match ? parseInt(match[1]) : 0;
}

export interface SeriesGroup {
  baseName: string;
  dubber: string;
  episodes: Array<{ id: string; title: string; poster: string; year: string; genre: string; rating: string; category: string }>;
  latestEpisode: { id: string; title: string; poster: string; year: string; genre: string; rating: string; category: string };
  episodeCount: number;
}

/**
 * Group movies into series (multiple episodes) and standalone movies.
 * Series with different dubbers (rating field) are treated as separate groups.
 * Episodes within each group are sorted ascending by episode number.
 */
export function groupSeriesMovies<T extends { id: string; title: string; poster: string; year: string; genre: string; rating: string; category: string }>(
  movieList: T[]
): Array<{ type: 'series'; group: SeriesGroup } | { type: 'movie'; movie: T }> {
  const seriesMap = new Map<string, { episodes: T[]; firstIndex: number }>();
  const result: Array<{ type: 'series'; group: SeriesGroup } | { type: 'movie'; movie: T }> = [];
  const processedKeys = new Set<string>();

  // First pass: identify all series (keyed by baseName + dubber)
  movieList.forEach((movie, index) => {
    if (isSeriesEpisode(movie.title)) {
      const key = getSeriesKey(movie.title, movie.rating);
      if (!seriesMap.has(key)) {
        seriesMap.set(key, { episodes: [], firstIndex: index });
      }
      seriesMap.get(key)!.episodes.push(movie);
    }
  });

  // Sort episodes ascending within each group
  seriesMap.forEach((group) => {
    group.episodes.sort((a, b) => getEpisodeNumber(a.title) - getEpisodeNumber(b.title));
  });

  // Second pass: build result preserving order
  movieList.forEach((movie) => {
    if (isSeriesEpisode(movie.title)) {
      const key = getSeriesKey(movie.title, movie.rating);
      if (seriesMap.has(key) && !processedKeys.has(key)) {
        processedKeys.add(key);
        const group = seriesMap.get(key)!;
        const latestEpisode = group.episodes[group.episodes.length - 1]; // Last = highest episode
        result.push({
          type: 'series',
          group: {
            baseName: getSeriesBaseName(movie.title),
            dubber: movie.rating || '',
            episodes: group.episodes,
            latestEpisode,
            episodeCount: group.episodes.length,
          }
        });
      }
    } else {
      result.push({ type: 'movie', movie });
    }
  });

  return result;
}

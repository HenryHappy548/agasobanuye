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

export interface SeriesGroup {
  baseName: string;
  episodes: Array<{ id: string; title: string; poster: string; year: string; genre: string; rating: string; category: string }>;
  latestEpisode: { id: string; title: string; poster: string; year: string; genre: string; rating: string; category: string };
  episodeCount: number;
}

/**
 * Group movies into series (multiple episodes) and standalone movies.
 * Returns items in order of the latest episode appearance (preserving original order).
 */
export function groupSeriesMovies<T extends { id: string; title: string; poster: string; year: string; genre: string; rating: string; category: string }>(
  movieList: T[]
): Array<{ type: 'series'; group: SeriesGroup } | { type: 'movie'; movie: T }> {
  const seriesMap = new Map<string, { episodes: T[]; firstIndex: number }>();
  const result: Array<{ type: 'series'; group: SeriesGroup } | { type: 'movie'; movie: T }> = [];
  const processedBases = new Set<string>();

  // First pass: identify all series
  movieList.forEach((movie, index) => {
    const base = getSeriesBaseName(movie.title).toLowerCase();
    if (isSeriesEpisode(movie.title)) {
      if (!seriesMap.has(base)) {
        seriesMap.set(base, { episodes: [], firstIndex: index });
      }
      seriesMap.get(base)!.episodes.push(movie);
    }
  });

  // Second pass: build result preserving order
  movieList.forEach((movie) => {
    const base = getSeriesBaseName(movie.title).toLowerCase();
    
    if (isSeriesEpisode(movie.title) && seriesMap.has(base)) {
      if (!processedBases.has(base)) {
        processedBases.add(base);
        const group = seriesMap.get(base)!;
        result.push({
          type: 'series',
          group: {
            baseName: getSeriesBaseName(movie.title),
            episodes: group.episodes,
            latestEpisode: group.episodes[0], // First in list = latest (ordered by created_at desc)
            episodeCount: group.episodes.length,
          }
        });
      }
    } else if (!isSeriesEpisode(movie.title)) {
      result.push({ type: 'movie', movie });
    }
  });

  return result;
}

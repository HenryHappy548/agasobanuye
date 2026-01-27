export type MoviesCachePayload = {
  savedAt: number;
  movies: any[];
};

export const MOVIES_CACHE_KEY = "rwaflix.movies.cache.v1";

export const readMoviesCache = (): MoviesCachePayload | null => {
  try {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(MOVIES_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MoviesCachePayload;
    if (!parsed || !Array.isArray(parsed.movies)) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const writeMoviesCache = (movies: unknown[]) => {
  try {
    if (typeof window === "undefined") return;
    const payload: MoviesCachePayload = { savedAt: Date.now(), movies: movies as any[] };
    window.localStorage.setItem(MOVIES_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
};

export const getCachedMovieById = <T extends { id: string }>(id: string): T | null => {
  const cached = readMoviesCache();
  const movies = (cached?.movies || []) as T[];
  return movies.find((m) => m?.id === id) ?? null;
};

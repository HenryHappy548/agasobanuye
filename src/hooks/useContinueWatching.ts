import { useState, useEffect, useCallback } from "react";

export interface WatchProgress {
  movieId: string;
  title: string;
  poster: string;
  year: string;
  genre: string;
  rating: string;
  timestamp: number; // when the user last watched
}

const STORAGE_KEY = "rwaflix_continue_watching";
const MAX_ITEMS = 10;

function getStoredProgress(): WatchProgress[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WatchProgress[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveProgress(items: WatchProgress[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
  } catch {
    // storage full or unavailable
  }
}

export function useContinueWatching() {
  const [items, setItems] = useState<WatchProgress[]>(getStoredProgress);

  // Sync across tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(getStoredProgress());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const trackMovie = useCallback((movie: Omit<WatchProgress, "timestamp">) => {
    setItems((prev) => {
      const filtered = prev.filter((p) => p.movieId !== movie.movieId);
      const updated = [{ ...movie, timestamp: Date.now() }, ...filtered].slice(0, MAX_ITEMS);
      saveProgress(updated);
      return updated;
    });
  }, []);

  const removeMovie = useCallback((movieId: string) => {
    setItems((prev) => {
      const updated = prev.filter((p) => p.movieId !== movieId);
      saveProgress(updated);
      return updated;
    });
  }, []);

  return { continueWatchingItems: items, trackMovie, removeMovie };
}

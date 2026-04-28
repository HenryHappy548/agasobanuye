import { tmdbApiKey } from '@/config/tmdb';

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  runtime?: number;
  tagline?: string;
  status?: string;
}

export interface TMDBMovieDetails extends TMDBMovie {
  videos: {
    results: Array<{
      key: string;
      site: string;
      type: string;
      official: boolean;
    }>;
  };
  credits: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
    }>;
  };
  recommendations: {
    results: TMDBMovie[];
  };
}

export interface TMDBTVShow {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  genre_ids: number[];
  poster_path: string;
  vote_average: number;
}

export interface TMDBTVShowDetails extends TMDBTVShow {
  videos: {
    results: Array<{
      key: string;
      site: string;
      type: string;
      official: boolean;
    }>;
  };
  credits: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
    }>;
  };
  recommendations: {
    results: TMDBTVShow[];
  };
  seasons: Array<{
    season_number: number;
    name: string;
    episode_count: number;
  }>;
}

export interface MovieDetailsService {
  getMovieDetails: (movieId: number) => Promise<TMDBMovieDetails>;
  getTVShowDetails: (showId: number) => Promise<TMDBTVShowDetails>;
  searchMovies: (query: string) => Promise<TMDBMovie[]>;
  getMovieVideos: (movieId: number) => Promise<TMDBMovie['videos']>;
  getMovieRecommendations: (movieId: number) => Promise<TMDBMovie['recommendations']>;
}

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

class TMDBService implements MovieDetailsService {
  private apiKey: string;

  constructor() {
    this.apiKey = tmdbApiKey;
  }

  private async request<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.set('api_key', this.apiKey);
    url.searchParams.set('language', 'en-US');
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.statusText}`);
    }
    return response.json();
  }

  async getMovieDetails(movieId: number): Promise<TMDBMovieDetails> {
    const details = await this.request<TMDBMovieDetails>(`/movie/${movieId}`);
    
    // Fetch videos separately
    const videos = await this.request<{ results: any[] }>(`/movie/${movieId}/videos`);
    details.videos = videos;
    
    // Fetch credits
    const credits = await this.request<{ cast: any[]; crew: any[] }>(`/movie/${movieId}/credits`);
    details.credits = credits;
    
    // Fetch recommendations
    const recommendations = await this.request<{ results: TMDBMovie[] }>(`/movie/${movieId}/recommendations`);
    details.recommendations = recommendations;
    
    return details;
  }

  async getTVShowDetails(showId: number): Promise<TMDBTVShowDetails> {
    const details = await this.request<TMDBTVShowDetails>(`/tv/${showId}`);
    
    // Fetch videos
    const videos = await this.request<{ results: any[] }>(`/tv/${showId}/videos`);
    details.videos = videos;
    
    // Fetch credits
    const credits = await this.request<{ cast: any[]; crew: any[] }>(`/tv/${showId}/credits`);
    details.credits = credits;
    
    // Fetch recommendations
    const recommendations = await this.request<{ results: TMDBTVShow[] }>(`/tv/${showId}/recommendations`);
    details.recommendations = recommendations;
    
    // Fetch seasons
    const seasons = await this.request<{ seasons: any[] }>(`/tv/${showId}/season/${details.seasons?.[0]?.season_number || 1}`);
    details.seasons = seasons.seasons;
    
    return details;
  }

  async searchMovies(query: string): Promise<TMDBMovie[]> {
    const results = await this.request<{ results: TMDBMovie[] }>('/search/movie', {
      query,
      page: '1',
    });
    return results.results;
  }

  async getMovieVideos(movieId: number) {
    const videos = await this.request<{ results: any[] }>(`/movie/${movieId}/videos`);
    return videos.results;
  }

  async getMovieRecommendations(movieId: number) {
    const recommendations = await this.request<{ results: TMDBMovie[] }>(`/movie/${movieId}/recommendations`);
    return recommendations.results;
  }

  getImageUrl(path: string, size: 'w500' | 'w780' | 'w1280' | 'original' = 'w780'): string {
    if (!path) return '/placeholder.svg';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  }

  async getMovieWithExternalIds(movieId: number): Promise<TMDBMovieDetails & { external_ids: any }> {
    const details = await this.getMovieDetails(movieId);
    const externalIds = await this.request(`/movie/${movieId}/external_ids`);
    return { ...details, external_ids };
  }
}

export const tmdbService = new TMDBService();
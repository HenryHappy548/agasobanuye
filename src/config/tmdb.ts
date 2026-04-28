// TMDB API Configuration
// Get your API key from: https://www.themoviedb.org/settings/api
export const tmdbApiKey = process.env.TMDB_API_KEY || 'your-api-key-here';

// Rate limiting: TMDB allows 40 requests per 10 seconds
export const TMDB_RATE_LIMIT = 40;
export const TMDB_WINDOW_MS = 10000;

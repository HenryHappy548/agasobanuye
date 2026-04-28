import { tmdbService } from '@/lib/tmdbService';
import { DBMovie } from '@/hooks/useMovies';

export const TMDB_ID = 'tmdb_id';
export const EXTERNAL_IDS = 'external_ids';

export const enrichDBMovieWithTMDB = async (dbMovie: DBMovie): Promise<DBMovie> => {
  try {
    const tmdbId = dbMovie[TMDB_ID as keyof DBMovie];
    if (!tmdbId) return dbMovie;

    // Fetch full movie details from TMDB
    const movieDetails = await tmdbService.getMovieDetails(Number(tmdbId));
    
    // Fetch video information (embeds)
    const videos = await tmdbService.getMovieVideos(Number(tmdbId));
    
    // Get streaming embed information
    const streamingEmbed = extractStreamingEmbed(videos);
    
    return {
      ...dbMovie,
      ...movieDetails,
      video_url: streamingEmbed?.embedCode || dbMovie.video_url,
      external_ids: movieDetails.external_ids,
    } as DBMovie;
  } catch (error) {
    console.error('Error enriching movie with TMDB data:', error);
    return dbMovie;
  }
};

const extractStreamingEmbed = (videos: any) => {
  if (!videos?.results) return null;
  
  // Find YouTube trailers or official videos
  const youtubeTrailer = videos.results.find(
    (video: any) => video.site === 'YouTube' && video.type === 'Trailer'
  ) || videos.results.find(
    (video: any) => video.site === 'YouTube' && video.official
  );
  
  if (youtubeTrailer) {
    return {
      embedCode: `<iframe width="1280" height="720" style="border:0;" src="https://www.youtube.com/embed/${youtubeTrailer.key}?autoplay=1" allowfullscreen></iframe>`,
      host: 'YouTube',
      videoId: youtubeTrailer.key,
    };
  }
  
  return null;
};

export const enrichAllMoviesWithTMDB = async (movies: DBMovie[]): Promise<DBMovie[]> => {
  const enrichedMovies = [];
  for (const movie of movies) {
    const enriched = await enrichDBMovieWithTMDB(movie);
    enrichedMovies.push(enriched);
  }
  return enrichedMovies;
};
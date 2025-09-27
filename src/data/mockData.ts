import movie1 from "@/assets/movie-1.jpeg";
import movie2 from "@/assets/movie-2.jpeg";
import movie3 from "@/assets/movie-3.jpg";
import movie4 from "@/assets/movie-4.jpg";
import movie5 from "@/assets/iland.jpg";
import movie6 from "@/assets/iland.jpg";
export interface Movie {
  id: string;
  title: string;
  poster: string;
  year: string;
  genre: string;
  rating: string;
  category: 'movie' | 'tv' | 'trending';
}

export const mockMovies: Movie[] = [
  {
    id: "movie-1",
    title: "Freakier Friday",
    poster: movie1,
    year: "2025",
    genre: "Comedy Fantasy",
    rating: "6.8",
    category: "movie"
  },
  {
    id: "movie-2", 
    title: "Relay",
    poster: movie2,
    year: "2024",
    genre: "paranoia thriller",
    rating: "7.8",
    category: "movie"
  },
  {
    id: "movie-3",
    title: "Naked gun",
    poster: movie3,
    year: "2025",
    genre: "Comedy Action Adventure",
    rating: "8.2",
    category: "movie"
  },
  {
    id: "movie-4",
    title: "Fantastic Four",
    poster: movie4, 
    year: "2025",
    genre: "Mystery Thriller",
    rating: "7.9",
    category: "trending"
  
  },
    {
    id: "movie-5",
    title: "I land Ep2",
    poster: movie5, 
    year: "2025",
    genre: "Action Thriller",
    rating: "8.1",
    category: "tv"
  
  },
  {
    id: "movie-6",
    title: "I land Ep1",
    poster: movie5, 
    year: "2025",
    genre: "Action Thriller",
    rating: "8.1",
    category: "tv"
  
  }
];

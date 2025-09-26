import movie1 from "@/assets/movie-1.jpg";
import movie2 from "@/assets/movie-2.jpg";
import movie3 from "@/assets/movie-3.jpg";

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
    title: "Quantum Edge",
    poster: movie1,
    year: "2024",
    genre: "Sci-Fi Thriller",
    rating: "8.5",
    category: "movie"
  },
  {
    id: "movie-2", 
    title: "Midnight in Paris",
    poster: movie2,
    year: "2023",
    genre: "Romance Drama",
    rating: "7.8",
    category: "movie"
  },
  {
    id: "movie-3",
    title: "Desert Storm",
    poster: movie3,
    year: "2024",
    genre: "Action Adventure",
    rating: "8.2",
    category: "movie"
  },
  {
    id: "movie-4",
    title: "Ocean's Mystery",
    poster: movie1,
    year: "2023",
    genre: "Mystery Thriller",
    rating: "7.9",
    category: "trending"
  },
  {
    id: "movie-5",
    title: "Space Odyssey",
    poster: movie2,
    year: "2024",
    genre: "Sci-Fi Epic",
    rating: "9.1",
    category: "trending"
  },
  {
    id: "movie-6",
    title: "Lost Kingdom",
    poster: movie3,
    year: "2023",
    genre: "Fantasy Adventure",
    rating: "8.7",
    category: "tv"
  }
];
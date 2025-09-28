import movie1 from "@/assets/Home sweet home.jpeg";
import movie2 from "@/assets/Home sweet home.jpeg";
import movie3 from "@/assets/movie-3.jpg";
import movie4 from "@/assets/hero-featured.jpeg";
import movie5 from "@/assets/iland.jpg";
import movie6 from "@/assets/iland.jpg";
import movie13 from "@/assets/Of king.jpg"; 
import movie14 from "@/assets/Of king.jpg";
import Shadowforce from "@/assets/Shadow force.jpeg"
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
    title: "Home Sweet Home B",
    poster: movie1,
    year: "2025",
    genre: "Horror Thriller Action",
    rating: "8.9",
    category: "movie"
  },
  {
    id: "movie-2", 
    title: "Home Sweet Home A",
    poster: movie2,
    year: "2025",
    genre: "Horror Thriller Action",
    rating: "8.9",
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
    title: "Knight and Day",
    poster: movie4, 
    year: "2010",
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
  
  },
  {
    id: "movie-13",
    title: "Of king and prophets Ep1",
    poster: movie13, 
    year: "2016",
    genre: "Action Thriller",
    rating: "9.1",
    category: "tv"
  
  },
  {
    id: "movie-14",
    title: "Of king and prophets Ep2",
    poster: movie14, 
    year: "2016",
    genre: "Action Thriller",
    rating: "9.1",
    category: "tv"
  
},
  {
    id: "shadow",
    title: "Shadow Force (2025)",
    poster: Shadowforce, 
    year: "2025",
    genre: "Action Thriller",
    rating: "9.1",
    category: "treading"
  
}
];

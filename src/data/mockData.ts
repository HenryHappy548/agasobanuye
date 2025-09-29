import movie1 from "@/assets/force.jpeg";
import forcea from "@/assets/force.jpeg"
import movie2 from "@/assets/knight.jpeg";
import movie3 from "@/assets/movie-3.jpg";
import movie4 from "@/assets/Home sweet home.jpeg";
import movie5 from "@/assets/Of king.jpg";
import movie6 from "@/assets/Of king.jpg";
import movie13 from "@/assets/Of king.jpg"; 
import movie14 from "@/assets/Of king.jpg";
import home from "@/assets/Home sweet home.jpeg";
import man from "@/assets/A working man.jpeg";
import mana from "@/assets/A working man.jpeg";
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
    id: "man",
    title: "A working man B",
    poster: man,
    year: "2025",
    genre: "Action Family",
    rating: "Rocky Kimomo",
    category: "movie"
  }, 
  {
    id: "mana",
    title: "A working man B",
    poster: movie1,
    year: "2025",
    genre: "Action Family",
    rating: "Rocky kimomo",
    category: "movie"
  },
 
  {
    id: "movie-1",
    title: "Shadow force B",
    poster: movie1,
    year: "2025",
    genre: "Action Familyy",
    rating: "Gaheza simba",
    category: "movie"
  },
    {
    id: "forcea",
    title: "Shadow force A",
    poster: forcea,
    year: "2025",
    genre: "Action Familyy",
    rating: "Gaheza simba",
    category: "movie"
  },
  {
    id: "movie-2", 
    title: "Knight and day",
    poster: movie2,
    year: "2010",
    genre: "paranoia thriller",
    rating: "Gaheza simba",
    category: "movie"
  },
  {
    id: "movie-3",
    title: "Naked gun",
    poster: movie3,
    year: "2025",
    genre: "Comedy Action Adventure",
    rating: "Gaheza simba",
    category: "movie"
  },
  {
    id: "movie-4",
    title: "Home sweet Home B",
    poster: movie4, 
    year: "2025",
    genre: "Action Thriller",
    rating: "Savimbi",
    category: "trending"
  
  },
    {
    id: "movie-5",
    title: "Of king and Prophet Ep4",
    poster: movie5, 
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  
  },
  {
    id: "movie-6",
    title: "Of king and prophet Ep3",
    poster: movie5, 
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  
  },
  
  {
    id: "movie-14",
    title: "Of king and prophets Ep2",
    poster: movie14, 
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  
},
  {
    id: "movie-13",
    title: "Of king and prophets Ep1",
    poster: movie13, 
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  
  },
  {
    id: "sweeta",
    title: "Home sweet Home A",
    poster: home, 
    year: "2025",
    genre: "Action Thriller",
    rating: "Savimbi",
    category: "trending"
  
}
];

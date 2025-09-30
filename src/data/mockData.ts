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
import men from "@/assets/men.jpeg";
import mena from "@/assets/men.jpeg";
import naked from "@/assets/hero-featured.jpeg";
import osi from "@/assets/Osiris.jpg";
import foua from "@/assets/fountain.jpeg";
import sar from "@/assets/sarza.jpeg";
import exo from "@/assets/exo.jpeg";
import sin from "@/assets/sinners.jpeg";
import dep from "@/assets/deep.jpg";
import goh from "@/assets/goh.jpeg";

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
    id: "goh",
    title: "Ghost Rider",
    poster: goh,
    year: "2007",
    genre: "Action Fantasy",
    rating: "Sankara",
    category: "movie"
  },
  {
    id: "dep",
    title: "Deep water",
    poster: dep,
    year: "2025",
    genre: "Romance Documentation",
    rating: "Sankara",
    category: "movie"
  }, 
  
    {
    id: "sin",
    title: "Sinners B",
    poster: sin,
    year: "2025",
    genre: "Horror Action Mystery ",
    rating: "Rocky kimomo",
    category: "trending"
  }, 
    {
    id: "sinb",
    title: "Sinners A",
    poster: sin,
    year: "2025",
    genre: "Horror Action Mystery ",
    rating: "Rocky kimomo",
    category: "trending"
  }, 
  {
    id: "exo",
    title: "The exorcism of God",
    poster: exo,
    year: "2025",
    genre: "Horror Mystery ",
    rating: "Rocky kimomo",
    category: "trending"
  }, 
  {
    id: "sar",
    title: "Sarzameen",
    poster: sar,
    year: "2025",
    genre: "Adventure Action",
    rating: "Sickov",
    category: "trending"
  }, 
    {
    id: "fou",
    title: "Fountain of youth B",
    poster: foua,
    year: "2025",
    genre: "Adventure Action Mystery ",
    rating: "Rocky kimomo",
    category: "trending"
  }, 
  {
    id: "foua",
    title: "Fountain of youth A",
    poster: foua,
    year: "2025",
    genre: "Adventure Action Mystery ",
    rating: "Rocky kimomo",
    category: "trending"
  }, 
  {
    id: "osi",
    title: "Osiris (2025)",
    poster: osi,
    year: "2025",
    genre: "Action Mystery",
    rating: "Sikovo",
    category: "trending"
  }, 

   {
    id: "men",
    title: "Men of honor B",
    poster: men,
    year: "2000",
    genre: "Action Documentation",
    rating: "Rocky Kimomo",
    category: "movie"
  }, 
   {
    id: "mena",
    title: "Men of honor A",
    poster: mena,
    year: "2000",
    genre: "Action Documentation",
    rating: "Rocky Kimomo",
    category: "movie"
  }, 
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
    title: "A working man A",
    poster: mana,
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
    genre: "Action Family",
    rating: "Gaheza simba",
    category: "movie"
  },
    {
    id: "forcea",
    title: "Shadow force A",
    poster: forcea,
    year: "2025",
    genre: "Action Family",
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

uimport movie1 from "@/assets/force.jpeg";
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
import ila from "@/assets/iland.jpeg";
import mena from "@/assets/men.jpeg";
import naked from "@/assets/hero-featured.jpeg";
import osi from "@/assets/Osiris.jpg";
import foua from "@/assets/fountain.jpeg";
import sar from "@/assets/sarza.jpeg";
import exo from "@/assets/exo.jpeg";
import sin from "@/assets/sinners.jpeg";
import dep from "@/assets/deep.jpg";
import goh from "@/assets/goh.jpeg";
import lost from "@/assets/Lost.avif";
import dir from "@/assets/dirty.jpeg";
import bac from "@/assets/bac.jpeg";
import blo from "@/assets/blood.jpeg";
import ski from "@/assets/skin.jpeg";
import boy from "@/assets/boy.jpeg";
import over from "@/assets/over.jpeg";
import cov from "@/assets/cov.jpeg";
import aar from "@/assets/aar.jpg";
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
    id: "ila7",
    title: "I land EP7 Final",
    poster: ila,
    year: "2019",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
    {
    id: "ila6",
    title: "I land EP6",
    poster: ila,
    year: "2019",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
    {
    id: "ila5",
    title: "I land EP5",
    poster: ila,
    year: "2019",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
    {
    id: "ila4",
    title: "I land EP4",
    poster: ila,
    year: "2019",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
    {
    id: "ila3",
    title: "I land EP3",
    poster: ila,
    year: "2019",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
    {
    id: "ila2",
    title: "I land EP2",
    poster: ila,
    year: "2019",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "ila1",
    title: "I land EP1",
    poster: ila,
    year: "2019",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  
    {
    id: "aar8",
    title: "Aar Ya Paar EP8",
    poster: aar,
    year: "2022",
    genre: "Action Thriller",
    rating: "Sankara",
    category: "tv"
  },
    {
    id: "aar7",
    title: "Aar Ya Paar EP7",
    poster: aar,
    year: "2022",
    genre: "Action Thriller",
    rating: "Sankara",
    category: "tv"
  },
    {
    id: "aar6",
    title: "Aar Ya Paar EP6",
    poster: aar,
    year: "2022",
    genre: "Action Thriller",
    rating: "Sankara",
    category: "tv"
  },
  
    {
    id: "aar5",
    title: "Aar Ya Paar EP5",
    poster: aar,
    year: "2022",
    genre: "Action Thriller",
    rating: "Sankara",
    category: "tv"
  },
    {
    id: "aar4",
    title: "Aar Ya Paar EP4",
    poster: aar,
    year: "2022",
    genre: "Action Thriller",
    rating: "Sankara",
    category: "tv"
  },
    {
    id: "aar3",
    title: "Aar Ya Paar EP3",
    poster: aar,
    year: "2022",
    genre: "Action Thriller",
    rating: "Sankara",
    category: "tv"
  },
    {
    id: "aar2",
    title: "Aar Ya Paar EP2",
    poster: aar,
    year: "2022",
    genre: "Action Thriller",
    rating: "Sankara",
    category: "tv"
  },
  {
    id: "aar1",
    title: "Aar Ya Paar EP1",
    poster: aar,
    year: "2022",
    genre: "Action Thriller",
    rating: "Sankara",
    category: "tv"
  },
  {
    id: "cov",
    title: "Coverant War",
    poster: cov,
    year: "2023",
    genre: "Action Thriller",
    rating: "Dylan Kabaka",
    category: "trending"
  },
  {
    id: "over",
    title: "Overdrive",
    poster: over,
    year: "2017",
    genre: "Action Thriller",
    rating: "Gaheza",
    category: "movie"
  },
  {
    id: "boy",
    title: "Boy kills World",
    poster: boy,
    year: "2023",
    genre: "Action Thriller",
    rating: "Sankara",
    category: "trending"
  },
   {
    id: "ski",
    title: "Skinfold: Death sentence",
    poster: ski,
    year: "2017",
    genre: "Horror Thriller",
    rating: "Sankara",
    category: "trending"
  },
  
  {
    id: "blo",
    title: "Blood Brother B",
    poster: blo,
    year: "2025",
    genre: "Action",
    rating: "Gaheza",
    category: "trending"
  },
  
   {
    id: "bloa",
    title: "Blood Brother A",
    poster: blo,
    year: "2025",
    genre: "Action",
    rating: "Gaheza",
    category: "trending"
  },
 
    {
    id: "dir",
    title: "Dirty Angels",
    poster: dir,
    year: "2024",
    genre: "Action Thriller",
    rating: "Savimbi",
    category: "trending"
  },

 
     {
    id: "lost8",
    title: "Lost In Love Ep8",
    poster: lost,
    year: "2023",
    genre: "Romance Drama",
    rating: "Rocky Kimomo",
    category: "tv"
  },
  
        {
    id: "lost7",
    title: "Lost In Love Ep7",
    poster: lost,
    year: "2023",
    genre: "Romance Drama",
    rating: "Rocky Kimomo",
    category: "tv"
  },
        {
    id: "lost6",
    title: "Lost In Love Ep6",
    poster: lost,
    year: "2023",
    genre: "Romance Drama",
    rating: "Rocky Kimomo",
    category: "tv"
  },
        {
    id: "lost5",
    title: "Lost In Love Ep5",
    poster: lost,
    year: "2023",
    genre: "Romance Drama",
    rating: "Rocky Kimomo",
    category: "tv"
  },
        {
    id: "lost4",
    title: "Lost In Love Ep4",
    poster: lost,
    year: "2023",
    genre: "Romance Drama",
    rating: "Rocky Kimomo",
    category: "tv"
  },
      {
    id: "lost3",
    title: "Lost In Love Ep3",
    poster: lost,
    year: "2023",
    genre: "Romance Drama",
    rating: "Rocky Kimomo",
    category: "tv"
  },
      {
    id: "lost2",
    title: "Lost In Love Ep2",
    poster: lost,
    year: "2023",
    genre: "Romance Drama",
    rating: "Rocky Kimomo",
    category: "tv"
  },
      {
    id: "lost1",
    title: "Lost In Love Ep1",
    poster: lost,
    year: "2023",
    genre: "Romance Drama",
    rating: "Rocky Kimomo",
    category: "tv"
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
    id: "bac",
    title: "Back on Society",
    poster: bac,
    year: "2021",
    genre: "Action Thriller",
    rating: "Junior Giti",
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
    id: "sweeta",
    title: "Home sweet Home A",
    poster: home, 
    year: "2025",
    genre: "Action Thriller",
    rating: "Savimbi",
    category: "trending"
  
}
];

import movie1 from "@/assets/force.jpeg";
import forcea from "@/assets/force.jpeg";
import movie2 from "@/assets/knight.jpeg";
import movie3 from "@/assets/movie-3.jpg";
import movie4 from "@/assets/Home sweet home.jpeg";
// homeSweet is imported on line 10
import movie5 from "@/assets/Of king.jpg";
import movie6 from "@/assets/Of king.jpg";
import movie13 from "@/assets/Of king.jpg"; 
import movie14 from "@/assets/Of king.jpg";
import homeSweet from "@/assets/Home sweet home.jpeg";
import man from "@/assets/A working man.jpeg";
import mana from "@/assets/A working man.jpeg";
import men from "@/assets/men.jpeg";
import ila from "@/assets/iland.jpg";
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
import ele from "@/assets/ele.jpeg";
import mah from "@/assets/mah.jpeg";
import aft from "@/assets/after.jpeg";
import war1 from "@/assets/war1.jpg";
import war2 from "@/assets/war 2.jpg";
import nun from "@/assets/nun.jpg";
import pick from "@/assets/the pickup.jpeg";
import black from "@/assets/black.jpg";
import com from "@/assets/com2.jpg";
import sec from "@/assets/375.jpeg";
import bag from "@/assets/Baaghi 4.jpg";
import bus from "@/assets/Bus.jpg";
import ply from "@/assets/play.jpeg";
import home from "@/assets/home.jpeg";
import sha from "@/assets/Shaman.jpg";
import bay from "@/assets/bay.jpg";
import evidence from "@/assets/Evidence.jpg";
import greens from "@/assets/Green.jpg";
import ninja from "@/assets/ninja.jpg";
import housed from "@/assets/David.jpg";
import lastmen from "@/assets/phil.jpg";
import bonne from "@/assets/bonne.jpg";
import prison from "@/assets/Celda.jpg";
import wea from "@/assets/Weapons.jpg";
import fran from "@/assets/fran.jpg";
import cure1 from "@/assets/cure1.jpeg";
import fatale from "@/assets/fatale.jpg";
import witch from "@/assets/GOW.jpg";
import vinc from "@/assets/vincenzo.jpg";
import meato from "@/assets/meato.jpeg";
import yard from "@/assets/Woman-in-the-Yard.jpg";
import mine from "@/assets/minecraft.jpeg";
import siren from "@/assets/Siren.jpg";
import malef from "@/assets/malef.jpg";
import dangal from "@/assets/Dangal.jpeg";
import bloodr from "@/assets/bloodr.jpeg";
import talk from "@/assets/talk.jpg";
import lethal from "@/assets/lathal.jpg";
import hannah from "@/assets/hannah.jpeg";
import shouse from "@/assets/shouse.jpeg";
import tempe from "@/assets/tempest.jpg";
import brink0 from "@/assets/Brink0.jpg";

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
    id: "brink0",
    title: "The Brink",
    poster: brink,
    year: "2017",
    genre: "Action Crime",
    rating: "Sankara",
    category: "trending"
  },
  
  {
    id: "bonne8",
    title: "Bon Appetit E8",
    poster: bonne,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "bonne7",
    title: "Bon Appetit E7",
    poster: bonne,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "temp3",
    title: "Tempest S01 E3",
    poster: temp,
    year: "2025",
    genre: "Action Drama",
    rating: "Junior",
    category: "tv"
  },
  {
    id: "temp2",
    title: "Tempest S01 E2",
    poster: temp,
    year: "2025",
    genre: "Action Drama",
    rating: "Junior",
    category: "tv"
  },
  {
    id: "temp2",
    title: "Tempest S01 E1",
    poster: temp,
    year: "2025",
    genre: "Action Drama",
    rating: "Junior",
    category: "tv"
  },
   {
    id: "shouse",
    title: "Safe House",
    poster: shouse,
    year: "2025",
    genre: "Action Thriller",
    rating: "Sankara",
    category: "trending"
  },
    {
    id: "hannah",
    title: "Possession Of Hannah Grace",
    poster: hannah,
    year: "2018",
    genre: "Horror Thriller",
    rating: "Sankara",
    category: "trending"
  },
  {
    id: "housed6",
    title: "House of David S02 E6",
    poster: housed,
    year: "2025",
    genre: "Action Documentary",
    rating: "Savimbi",
    category: "tv"
  },
  {
    id: "bonne6",
    title: "Bon Appetit E6",
    poster: bonne,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
    {
    id: "bonne5",
    title: "Bon Appetit E5",
    poster: bonne,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "housed6",
    title: "House of David S02 E6",
    poster: housed,
    year: "2025",
    genre: "Action Documentary",
    rating: "Savimbi",
    category: "tv"
  },
  {
    id: "housed5",
    title: "House of David S02 E5",
    poster: housed,
    year: "2025",
    genre: "Action Documentary",
    rating: "Savimbi",
    category: "tv"
  },
  {
    id: "housed4",
    title: "House of David S02 E4",
    poster: housed,
    year: "2025",
    genre: "Action Documentary",
    rating: "Savimbi",
    category: "tv"
  },
  {
    id: "housed3",
    title: "House of David S02 E3",
    poster: housed,
    year: "2025",
    genre: "Action Documentary",
    rating: "Savimbi",
    category: "tv"
  },

  {
    id: "lethal",
    title: "Lethal Seduction",
    poster: lethal,
    year: "2016",
    genre: " Thriller Drama",
    rating: "Sankara",
    category: "trending"
  },
  {
    id: "talk",
    title: "Talk To Me",
    poster: talk,
    year: "2022",
    genre: "Horror Thriller",
    rating: "Sankara",
    category: "trending"
  },
   {
    id: "dangal",
    title: "Dangal",
    poster: dangal,
    year: "2016",
    genre: "Action Sport",
    rating: "Rocky kimomo",
    category: "movie"
  },
  {
    id: "Bloodr2",
    title: "Blood River E2 ",
    poster: bloodr,
    year: "2025",
    genre: "Thriller",
    rating: "B The Great",
    category: "tv"
  },
  
  {
    id: "Bloodr1",
    title: "Blood River E1 ",
    poster: bloodr,
    year: "2025",
    genre: "Thriller",
    rating: "B The Great",
    category: "tv"
  },
 
  {
    id: "malef",
    title: "Maleficent",
    poster: malef,
    year: "2014",
    genre: "Sci fi",
    rating: "Sankara",
    category: "trending"
  },

  
  {
    id: "siren3",
    title: "Siren E3",
    poster: siren,
    year: "2018",
    genre: "Horror",
    rating: "Gaheza",
    category: "tv"
  },
  {
    id: "siren2",
    title: "Siren E2",
    poster: siren,
    year: "2018",
    genre: "Horror",
    rating: "Gaheza",
    category: "tv"
  },
   {
    id: "siren1",
    title: "Siren E1 ",
    poster: siren,
    year: "2018",
    genre: "Horror",
    rating: "Gaheza",
    category: "tv"
  },
  {
    id: "mine",
    title: "Minecraft",
    poster: mine,
    year: "2025",
    genre: "Action Adventure",
    rating: "Gaheza",
    category: "trending"
  },
  {
    id: "yard",
    title: "Woman In The Yard",
    poster: yard,
    year: "2025",
    genre: "Horror Action",
    rating: "Gaheza",
    category: "trending"
  },
  {
    id: "meato",
    title: "Midnight Meat Train",
    poster: meato,
    year: "2008",
    genre: "Action Horror",
    rating: "Sankara",
    category: "movie"
  },
    {
    id: "bonne4",
    title: "Bon Appetit E4",
    poster: bonne,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "vincenzoe",
    title: "Vincenzo E5",
    poster: vinc,
    year: "2021",
    genre: "Drama Action",
    rating: "B The Great",
    category: "tv"
  },
  {
    id: "vincenzocd",
    title: "Vincenzo E4&3 (Combined)",
    poster: vinc,
    year: "2021",
    genre: "Drama Action",
    rating: "B The Great",
    category: "tv"
  },
  {
    id: "vincenzoab",
    title: "Vincenzo E1&2 (Combined)",
    poster: vinc,
    year: "2021",
    genre: "Drama Action",
    rating: "B The Great",
    category: "tv"
  },
  {
    id: "witche",
    title: "Game Of Witches E5",
    poster: witch,
    year: "2022",
    genre: "Drama",
    rating: "B The Great",
    category: "tv"
  },
  {
    id: "witchd",
    title: "Game Of Witches E4",
    poster: witch,
    year: "2022",
    genre: "Drama",
    rating: "B The Great",
    category: "tv"
  },
  {
    id: "witchc",
    title: "Game Of Witches E3",
    poster: witch,
    year: "2022",
    genre: "Drama",
    rating: "B The Great",
    category: "tv"
  },
  {
    id: "witchb",
    title: "Game Of Witches E2",
    poster: witch,
    year: "2022",
    genre: "Drama",
    rating: "B The Great",
    category: "tv"
  },
  {
    id: "witcha",
    title: "Game Of Witches E1",
    poster: witch,
    year: "2022",
    genre: "Drama",
    rating: "B The Great",
    category: "tv"
  },
   {
    id: "fataleb",
    title: "Fatale B",
    poster: fatale,
    year: "2020",
    genre: "Thriller Crime",
    rating: "Rocky kimomo",
    category: "movie"
  },
   {
    id: "fataleb",
    title: "Fatale A",
    poster: fatale,
    year: "2020",
    genre: "Thriller Crime",
    rating: "Rocky kimomo",
    category: "movie"
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
    id: "cure1",
    title: "The Cure I",
    poster: cure1,
    year: "2020",
    genre: "Action Thriller",
    rating: "Sankara",
    category: "movie"
  },
  
  {
    id: "bonne3",
    title: "Bon Appetit E3",
    poster: bonne,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  
  {
    id: "fran",
    title: "I, Frankenstein",
    poster: fran,
    year: "2014",
    genre: "Mystery Action",
    rating: "Sankara",
    category: "trending"
  },
  {
    id: "weab",
    title: "The Weapons B",
    poster: wea,
    year: "2025",
    genre: "Horror Mystery",
    rating: "Gaheza",
    category: "trending"
  },
  {
    id: "weaa",
    title: "The Weapons A",
    poster: wea,
    year: "2025",
    genre: "Horror Mystery",
    rating: "Gaheza",
    category: "trending"
  },
   {
    id: "celda6",
    title: "Prison Cell 211 E6 Final",
    poster: prison,
    year: "2025",
    genre: "Action Drama ",
    rating: "Dylan Kabaka",
    category: "tv"
  },
   {
    id: "celda5",
    title: "Prison Cell 211 E5",
    poster: prison,
    year: "2025",
    genre: "Action Drama ",
    rating: "Dylan Kabaka",
    category: "tv"
  },
   {
    id: "celda4",
    title: "Prison Cell 211 E4",
    poster: prison,
    year: "2025",
    genre: "Action Drama ",
    rating: "Dylan Kabaka",
    category: "tv"
  },
   {
    id: "celda3",
    title: "Prison Cell 211 E3",
    poster: prison,
    year: "2025",
    genre: "Action Drama ",
    rating: "Dylan Kabaka",
    category: "tv"
  },
   {
    id: "celda2",
    title: "Prison Cell 211 E2",
    poster: prison,
    year: "2025",
    genre: "Action Drama ",
    rating: "Dylan Kabaka",
    category: "tv"
  },
   {
    id: "celda1",
    title: "Prison Cell 211 E1",
    poster: prison,
    year: "2025",
    genre: "Action Drama ",
    rating: "Dylan Kabaka",
    category: "tv"
  },
  {
    id: "bonne2",
    title: "Bon Appetit E2",
    poster: bonne,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
   {
    id: "bonne1",
    title: "Bon Appetit E1",
    poster: bonne,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "bagb",
    title: "Bagghi 4 B",
    poster: bag,
    year: "2025",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "trending"
  },
  {
    id: "bag",
    title: "Bagghi 4 A",
    poster: bag,
    year: "2025",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "trending"
  },
  {
    id: "bay",
    title: "Bay Watch",
    poster: bay,
    year: "2017",
    genre: "Horror Mystery",
    rating: "Rocky kimomo",
    category: "trending"
  },
  {
    id: "housed2",
    title: "House of David S02 E2",
    poster: housed,
    year: "2025",
    genre: "Action Documentary",
    rating: "Savimbi",
    category: "tv"
  },
  {
    id: "housed1",
    title: "House of David S02 E1",
    poster: housed,
    year: "2025",
    genre: "Action Documentary",
    rating: "Savimbi",
    category: "tv"
  },
  {
    id: "evidence",
    title: "Dangerous Evidence",
    poster: evidence,
    year: "2024",
    genre: "Acrion Thriller",
    rating: "B The Great",
    category: "trending"
  },
  {
    id: "ninja",
    title: "Ninja shadow tears",
    poster: ninja,
    year: "2013",
    genre: "Action Thriler",
    rating: "Sankara",
    category: "trending"
  },
  {
    id: "greenr",
    title: "Green Lantern",
    poster: greens,
    year: "2011",
    genre: "Action Sci fi",
    rating: "B The Great",
    category: "movie"
  },
  {
    id: "lastmen",
    title: "Our Last Men In Phillipene",
    poster: lastmen,
    year: "1998",
    genre: "Action Mystery",
    rating: "Dylan",
    category: "movie"
  },
  {
    id: "sham",
    title: "The Shaman",
    poster: sha,
    year: "2025",
    genre: "Horror Mystery",
    rating: "Mungeli",
    category: "trending"
  },
   {
    id: "home",
    title: "The Home",
    poster: home,
    year: "2025",
    genre: "Horror Mystery",
    rating: "Mungeli",
    category: "movie"
  },
  {
    id: "plyb",
    title: "Play Dirty B",
    poster: ply,
    year: "2025",
    genre: "Action Thriller",
    rating: "Gaheza",
    category: "trending"
  },
  {
    id: "plya",
    title: "Play Dirty A",
    poster: ply,
    year: "2025",
    genre: "Action Thriller",
    rating: "Gaheza",
    category: "trending"
  },
  {
    id: "bus",
    title: "The Lost Bus",
    poster: bus,
    year: "2025",
    genre: "Action Thriller",
    rating: "Perfect",
    category: "trending"
  },
  
   {
    id: "sec",
    title: "Section 375",
    poster: sec,
    year: "2019",
    genre: "Thriller Crime",
    rating: "Rocky kimomo",
    category: "trending"
  },
  {
    id: "com",
    title: "Coming to America 2",
    poster: com,
    year: "2025",
    genre: "Drama Comedy",
    rating: "Rocky kimomo",
    category: "movie"
  },
  {
    id: "black8",
    title: "Beauty in Black S02 E8",
    poster: black,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "black7",
    title: "Beauty in Black S02 E7",
    poster: black,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "black6",
    title: "Beauty in Black S02 E6",
    poster: black,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "black5",
    title: "Beauty in Black S02 E5",
    poster: black,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "black4",
    title: "Beauty in Black S02 E4",
    poster: black,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "black3",
    title: "Beauty in Black S02 E3",
    poster: black,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "black2",
    title: "Beauty in Black S02 E2",
    poster: black,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "black1",
    title: "Beauty in Black S02 E1",
    poster: black,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
    
  {
    id: "pickb",
    title: "The Pickup B",
    poster: pick,
    year: "2025",
    genre: "Action Thriller",
    rating: "Gaheza",
    category: "trending"
  },
  {
    id: "picka",
    title: "The Pickup A",
    poster: pick,
    year: "2025",
    genre: "Action Thriller",
    rating: "Gaheza",
    category: "trending"
  },
  {
    id: "nun",
    title: "The Nun ",
    poster: nun,
    year: "2018",
    genre: "Horror Thriller",
    rating: "Sankara",
    category: "movie"
  },
  {
    id: "war2",
    title: "War 2 B",
    poster: war2,
    year: "2025",
    genre: "Action Drama",
    rating: "Rocky kimomo",
    category: "trending"
  },
  {
    id: "war1",
    title: "War 2 A",
    poster: war2,
    year: "2025",
    genre: "Action Drama",
    rating: "Rocky kimomo",
    category: "trending"
  },
  {
    id: "warc",
    title: "War 1 (C)",
    poster: war1,
    year: "2019",
    genre: "Action Drama",
    rating: "Rocky kimomo",
    category: "movie"
  },
  {
    id: "warb",
    title: "War 1 (B)",
    poster: war1,
    year: "2019",
    genre: "Action Drama",
    rating: "Rocky kimomo",
    category: "movie"
  },
  {
    id: "wara",
    title: "War 1 (A) ",
    poster: war1,
    year: "2019",
    genre: "Action Drama",
    rating: "Rocky kimomo",
    category: "movie"
  },
   {
    id: "aft",
    title: "AfterBurn ",
    poster: aft,
    year: "2019",
    genre: "Action Drama",
    rating: "Gaheza",
    category: "trending"
  },
   {
    id: "mahb",
    title: "Mahrashi B",
    poster: mah,
    year: "2019",
    genre: "Action Drama",
    rating: "Rocky",
    category: "movie"
  },
   {
    id: "maha",
    title: "Mahrashi A",
    poster: mah,
    year: "2019",
    genre: "Action Drama",
    rating: "Rocky",
    category: "movie"
  },
  {
    id: "ele8",
    title: "Twelve EP 8 Final",
    poster: ele,
    year: "2021",
    genre: "Action Thriller",
    rating: "Mungeli",
    category: "tv"
  },
  {
    id: "ele7",
    title: "Twelve EP 7",
    poster: ele,
    year: "2021",
    genre: "Action Thriller",
    rating: "Mungeli",
    category: "tv"
  },
  {
    id: "ele6",
    title: "Twelve EP 6",
    poster: ele,
    year: "2021",
    genre: "Action Thriller",
    rating: "Mungeli",
    category: "tv"
  },
  {
    id: "ele5",
    title: "Twelve EP 5",
    poster: ele,
    year: "2021",
    genre: "Action Thriller",
    rating: "Mungeli",
    category: "tv"
  },
  {
    id: "ele4",
    title: "Twelve EP 4",
    poster: ele,
    year: "2021",
    genre: "Action Thriller",
    rating: "Mungeli",
    category: "tv"
  },
  {
    id: "ele3",
    title: "Twelve EP 3",
    poster: ele,
    year: "2021",
    genre: "Action Thriller",
    rating: "Mungeli",
    category: "

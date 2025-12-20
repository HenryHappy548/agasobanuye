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
import askm from "@/assets/askm.jpeg";
import freed from "@/assets/freed.jpeg";
import out from "@/assets/out.png";
import hrs from "@/assets/24h.jpg";
import bunker from "@/assets/bunker.jpeg";
import cont from "@/assets/cont.jpg";
import hidden from "@/assets/hidden.jpeg";
import assa from "@/assets/assa.jpeg";
import long from "@/assets/long.jpg";
import badi from "@/assets/badi.jpeg";
import raz from "@/assets/raz.jpeg";
import ice from "@/assets/ice.jpeg";
import wolfh from "@/assets/wolfh.jpg";
import bharat from "@/assets/bharat.jpg";
import robin from "@/assets/robin.jpeg";
import nonation from "@/assets/nonation.jpeg";
import noesc from "@/assets/noesc.jpeg";
import oldw from "@/assets/oldw.jpeg";
import dou from "@/assets/dou.jpg";
import foever from "@/assets/forever.jpeg";
import pricew from "@/assets/pricew.jpeg";
import nogood from "@/assets/nogood.jpeg";
import shap from "@/assets/shap.jpeg";
import axl from "@/assets/A.X.L.jpeg";
import ope from "@/assets/ope.jpeg";
import chip from "@/assets/chips.jpg";
import dont from "@/assets/dont.jpg";
import shooter from "@/assets/shooter.jpeg"
import fantastic from "@/assets/fantastic.jpeg"
import hours from "@/assets/24.jpeg"
import gunp from "@/assets/gunp.jpeg"
import ice2 from "@/assets/ice2.jpeg"
import seanc from "@/assets/seamc.jpeg"
import avenger from "@/assets/avenger.jpeg"
import collateral from "@/assets/collateral.jpeg"
import great from "@/assets/great.jpeg"
import flady from "@/assets/flady.jpeg"
import ringsl from "@/assets/ringsl.jpeg"
import jessicab from "@/assets/jessicab.jpeg"
import thedaye from "@/assets/thedaye.jpeg"
import kindg from "@/assets/kindg.jpeg"
import fanna from "@/assets/fanna.jpeg"
import reborn from "@/assets/reborn.jpg"
import predator from "@/assets/Predator.jpg"
import carpe from "@/assets/carpe.jpg"
import harber from "@/assets/harber.jpg"
import underc from "@/assets/underc.jpeg"
import desperate from "@/assets/desperate.jpg"
import shooters2 from "@/assets/shooters2.jpeg"
import strangers1 from "@/assets/strangers1.jpeg"
import sisu from "@/assets/sisu.png"
import evild from "@/assets/evild.jpeg"
import sisu2 from "@/assets/sisu2.jpeg"
import fall from "@/assets/fall.jpeg"
import olym from "@/assets/olym.jpg"
import morrow from "@/assets/morrow.jpeg"
import childrens from "@/assets/childrens.jpg"

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
    id: "seanc3",
    title: "Sean Combs S01 E3",
    poster: seanc,
    year: "2025",
    genre: "Documentary Thriller",
    rating: "Rocky",
    category: "tv"
  },
  {
    id: "childrens5",
    title: "Children Of Sisters S01 E5",
    poster: childrens,
    year: "2019",
    genre: "Drama Romance",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "childrens4",
    title: "Children Of Sisters S01 E4",
    poster: childrens,
    year: "2019",
    genre: "Drama Romance",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "childrens3b",
    title: "Children Of Sisters S01 E3 A",
    poster: childrens,
    year: "2019",
    genre: "Drama Romance",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "childrens3a",
    title: "Children Of Sisters S01 E3 A",
    poster: childrens,
    year: "2019",
    genre: "Drama Romance",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "childrens2",
    title: "Children Of Sisters S01 E2",
    poster: childrens,
    year: "2019",
    genre: "Drama Romance",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "childrens1",
    title: "Children Of Sisters S01 E1",
    poster: childrens,
    year: "2019",
    genre: "Drama Romance",
    rating: "Rocky kimomo",
    category: "tv"
  },
    {
    id: "morrow",
    title: "Tomorrow War",
    poster: morrow,
    year: "2021",
    genre: "Action Sci fi",
    rating: "Rocky kimomo",
    category: "trending"
  },
  {
    id: "shooters8",
    title: "Shooter S02 E8 Final",
    poster: shooters2,
    year: "2017",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "shooters7",
    title: "Shooter S02 E7",
    poster: shooters2,
    year: "2017",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "shooters6",
    title: "Shooter S02 E6",
    poster: shooters2,
    year: "2017",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "shooters5",
    title: "Shooter S02 E5",
    poster: shooters2,
    year: "2017",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "shooters4",
    title: "Shooter S02 E4",
    poster: shooters2,
    year: "2017",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "olym",
    title: "Olympus Has Fallen",
    poster: olym,
    year: "2013",
    genre: "Action Thriller",
    rating: "Sankara",
    category: "movie"
  },
  {
    id: "fall",
    title: "Fall",
    poster: fall,
    year: "2022",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "movie"
  },
  {
    id: "sisu2",
    title: "Sisu 2",
    poster: sisu2,
    year: "2025",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "trending"
  },
  {
    id: "evild",
    title: "Evil Dead",
    poster: evild,
    year: "2013",
    genre: "Horror Thriller",
    rating: "Sankara",
    category: "trending"
  },
  {
    id: "stranger6",
    title: "Stranger Things S01 E6",
    poster: strangers1,
    year: "2016",
    genre: "Horror Thriller",
    rating: "Dylan Kabaka",
    category: "tv"
  },
  {
    id: "sisu",
    title: "Sisu I",
    poster: sisu,
    year: "2022",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "movie"
  },
  
  {
    id: "desperate4",
    title: "Desperate Lies S01 E4",
    poster: desperate,
    year: "2024",
    genre: "Drama",
    rating: "Sankara",
    category: "tv"
  },
  
  {
    id: "desperate3",
    title: "Desperate Lies S01 E3",
    poster: desperate,
    year: "2024",
    genre: "Drama",
    rating: "Sankara",
    category: "tv"
  },
  
  {
    id: "desperate2",
    title: "Desperate Lies S01 E2",
    poster: desperate,
    year: "2024",
    genre: "Drama",
    rating: "Sankara",
    category: "tv"
  },
  
  {
    id: "desperate1",
    title: "Desperate Lies S01 E1",
    poster: desperate,
    year: "2024",
    genre: "Drama",
    rating: "Sankara",
    category: "tv"
  },
    
    {
    id: "stranger5",
    title: "Stranger Things S01 E5",
    poster: strangers1,
    year: "2016",
    genre: "Horror Thriller",
    rating: "Dylan Kabaka",
    category: "tv"
  },
    {
    id: "stranger4",
    title: "Stranger Things S01 E4",
    poster: strangers1,
    year: "2016",
    genre: "Horror Thriller",
    rating: "Dylan Kabaka",
    category: "tv"
  },
  {
    id: "stranger3",
    title: "Stranger Things S01 E3",
    poster: strangers1,
    year: "2016",
    genre: "Horror Thriller",
    rating: "Dylan Kabaka",
    category: "tv"
  },
  {
    id: "stranger2",
    title: "Stranger Things S01 E2",
    poster: strangers1,
    year: "2016",
    genre: "Horror Thriller",
    rating: "Dylan Kabaka",
    category: "tv"
  },
  {
    id: "stranger1",
    title: "Stranger Things S01 E1",
    poster: strangers1,
    year: "2016",
    genre: "Horror Thriller",
    rating: "Dylan Kabaka",
    category: "tv"
  },
    {
    id: "shooters3",
    title: "Shooter S02 E3",
    poster: shooters2,
    year: "2017",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
    {
    id: "shooters2",
    title: "Shooter S02 E1",
    poster: shooters2,
    year: "2017",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "shooters1",
    title: "Shooter S02 E1",
    poster: shooters2,
    year: "2017",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "underc",
    title: "Undercover Grandpa",
    poster: underc,
    year: "2017",
    genre: "Family Mystery",
    rating: "Rocky",
    category: "trending"
  },
   {
    id: "harper10",
    title: "Harper's Island S01 E10",
    poster: harber,
    year: "2009",
    genre: "Mystery",
    rating: "Rocky",
    category: "tv"
  },
   {
    id: "harper9",
    title: "Harper's Island S01 E9",
    poster: harber,
    year: "2009",
    genre: "Mystery",
    rating: "Rocky",
    category: "tv"
  },
   {
    id: "harper8",
    title: "Harper's Island S01 E8",
    poster: harber,
    year: "2009",
    genre: "Mystery",
    rating: "Rocky",
    category: "tv"
  },
  {
    id: "harper7",
    title: "Harper's Island S01 E7",
    poster: harber,
    year: "2009",
    genre: "Mystery",
    rating: "Rocky",
    category: "tv"
  },
   {
    id: "harper6",
    title: "Harper's Island S01 E6",
    poster: harber,
    year: "2009",
    genre: "Mystery",
    rating: "Rocky",
    category: "tv"
  },
  {
    id: "harper5",
    title: "Harper's Island S01 E5",
    poster: harber,
    year: "2009",
    genre: "Mystery",
    rating: "Rocky",
    category: "tv"
  },
  {
    id: "harper4",
    title: "Harper's Island S01 E4",
    poster: harber,
    year: "2009",
    genre: "Mystery",
    rating: "Rocky",
    category: "tv"
  },
  {
    id: "harper3",
    title: "Harper's Island S01 E3",
    poster: harber,
    year: "2009",
    genre: "Mystery",
    rating: "Rocky",
    category: "tv"
  },
  {
    id: "harper2",
    title: "Harper's Island S01 E2",
    poster: harber,
    year: "2009",
    genre: "Mystery",
    rating: "Rocky",
    category: "tv"
  },
    {
    id: "harper1",
    title: "Harper's Island S01 E1",
    poster: harber,
    year: "2009",
    genre: "Mystery",
    rating: "Rocky",
    category: "tv"
  },
  {
    id: "carpe",
    title: "Carpenter's Son",
    poster: carpe,
    year: "2025",
    genre: "Horror",
    rating: "Gaheza",
    category: "trending"
  },
  
  {
    id: "predator",
    title: "Predator Badlands",
    poster: predator,
    year: "2025",
    genre: "Action Sci-fi",
    rating: "Gaheza",
    category: "trending"
  },
  {
    id: "reborn",
    title: "Reborn",
    poster: reborn,
    year: "2016",
    genre: "Action Crime",
    rating: "Sankara",
    category: "trending"
  },
  {
    id: "kindg",
    title: "Kindergarten Cop",
    poster: kindg,
    year: "1990",
    genre: "Comedy Action",
    rating: "Savimbi",
    category: "movie"
  },
  {
    id: "fanna",
    title: "Fanna",
    poster: fanna,
    year: "2006",
    genre: "Romance Thriller",
    rating: "Rocky kimomo",
    category: "movie"
  },
  
  {
    id: "theday",
    title: "The Day Earth Stood Still",
    poster: thedaye,
    year: "2008",
    genre: "Sci-fi Thriller",
    rating: "Savimbi",
    category: "movie"
  },
  {
    id: "shooter10",
    title: "Shooter S01 E10 Final",
    poster: shooter,
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "shooter9",
    title: "Shooter S01 E9",
    poster: shooter,
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "shooter8",
    title: "Shooter S01 E8",
    poster: shooter,
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "shooter7",
    title: "Shooter S01 E7",
    poster: shooter,
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "shooter6",
    title: "Shooter S01 E6",
    poster: shooter,
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "shooter5",
    title: "Shooter S01 E5",
    poster: shooter,
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "jessicab",
    title: "Hunting Jessica Brock",
    poster: jessicab,
    year: "2025",
    genre: "Action Adventure",
    rating: "Gaheza",
    category: "trending"
  },
  {
    id: "ringslb",
    title: "The Lord Of The Rings I B",
    poster: ringsl,
    year: "2001",
    genre: "Fantasy Adventure",
    rating: "Gaheza",
    category: "movie"
  },
  {
    id: "ringsla",
    title: "The Lord Of The Rings I A",
    poster: ringsl,
    year: "2001",
    genre: "Fantasy Adventure",
    rating: "Gaheza",
    category: "movie"
  },
  {
    id: "flady4",
    title: "First Lady S01 E4",
    poster: flady,
    year: "2022",
    genre: "Romance",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "flady3",
    title: "First Lady S01 E3",
    poster: flady,
    year: "2022",
    genre: "Romance",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "flady2",
    title: "First Lady S01 E2",
    poster: flady,
    year: "2022",
    genre: "Romance",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "flady1",
    title: "First Lady S01 E1",
    poster: flady,
    year: "2022",
    genre: "Romance",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "seanc2",
    title: "Sean Combs S01 E2",
    poster: seanc,
    year: "2025",
    genre: "Documentary Thriller",
    rating: "Rocky",
    category: "tv"
  },
   {
    id: "greatb",
    title: "The Great Battle B",
    poster: great,
    year: "2018",
    genre: "Action War",
    rating: "Savimbi",
    category: "trending"
  },
  {
    id: "greata",
    title: "The Great Battle A",
    poster: great,
    year: "2018",
    genre: "Action War",
    rating: "Savimbi",
    category: "trending"
  },
  {
    id: "collateralb",
    title: "Collateral B",
    poster: collateral,
    year: "2004",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "movie"
  },
   {
    id: "collaterala",
    title: "Collateral A",
    poster: collateral,
    year: "2004",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "movie"
  },
    {
    id: "avenger",
    title: "Avengers: Infinity War",
    poster: avenger,
    year: "2018",
    genre: "Action Sci fi",
    rating: "Sankara",
    category: "movie"
  },
   {
    id: "seanc1",
    title: "Sean Combs S01 E1",
    poster: seanc,
    year: "2025",
    genre: "Documentary Thriller",
    rating: "Rocky",
    category: "tv"
  },
  {
    id: "ice2b",
    title: "Ice Road 2 B",
    poster: ice2,
    year: "2025",
    genre: "Action Thriller",
    rating: "Gaheza",
    category: "trending"
  },
  {
    id: "ice2a",
    title: "Ice Road 2 A",
    poster: ice2,
    year: "2025",
    genre: "Action Thriller",
    rating: "Gaheza",
    category: "trending"
  },
   {
  id: "ice",
    title: "Ice Road",
    poster: ice,
    year: "2021",
    genre: "Action Thriller",
    rating: "Gaheza Simba",
    category: "trending"
  },
  {
    id: "gunp4",
    title: "Gun Powder S01 E4 Final",
    poster: gunp,
    year: "2017",
    genre: "Drama Thriller",
    rating: "PK",
    category: "tv"
  },
  {
    id: "gunp3",
    title: "Gun Powder S01 E3",
    poster: gunp,
    year: "2017",
    genre: "Drama Thriller",
    rating: "PK",
    category: "tv"
  },
  {
    id: "gunp2",
    title: "Gun Powder S01 E2",
    poster: gunp,
    year: "2017",
    genre: "Drama Thriller",
    rating: "PK",
    category: "tv"
  },
  {
    id: "gunp1",
    title: "Gun Powder S01 E1",
    poster: gunp,
    year: "2017",
    genre: "Drama Thriller",
    rating: "PK",
    category: "tv"
  },
  {
    id: "24hourb",
    title: "24 Hours B",
    poster: hours,
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "movie"
  },
  {
    id: "24houra",
    title: "24 Hours A",
    poster: hours,
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "movie"
  },
   
    {
    id: "fantastic",
    title: "Fantastic Four",
    poster: fantastic,
    year: "2025",
    genre: "Sci fi Thriller",
    rating: "Senior",
    category: "trending"
  },
  {
    id: "shooter4",
    title: "Shooter S01 E4",
    poster: shooter,
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "shooter3",
    title: "Shooter S01 E3",
    poster: shooter,
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
  id: "badi7",
    title: "Bad Influncer S01 E7",
    poster: badi,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "dont",
    title: "Don't Hangup",
    poster: dont,
    year: "2016",
    genre: "Horror Thriller",
    rating: "Sankara",
    category: "trending"
  },
  {
    id: "chip",
    title: "Chips",
    poster: chip,
    year: "2017",
    genre: "Action Comedy",
    rating: "Rocky kimomo",
    category: "trending"
  },
    {
    id: "shooter2",
    title: "Shooter S01 E2",
    poster: shooter,
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "shooter1",
    title: "Shooter S01 E1",
    poster: shooter,
    year: "2016",
    genre: "Action Thriller",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "opeb",
    title: "Operation Fortune B",
    poster: ope,
    year: "2023",
    genre: "Action Comedy",
    rating: "Gaheza",
    category: "movie"
  },
  {
    id: "opea",
    title: "Operation Fortune A",
    poster: ope,
    year: "2023",
    genre: "Action Comedy",
    rating: "Gaheza",
    category: "movie"
  },
   {
    id: "housed8",
    title: "House of David S02 E8 Final",
    poster: housed,
    year: "2025",
    genre: "Action Documentary",
    rating: "Savimbi",
    category: "tv"
  },
   {
    id: "housed7",
    title: "House of David S02 E7",
    poster: housed,
    year: "2025",
    genre: "Action Documentary",
    rating: "Savimbi",
    category: "tv"
  },
  {
    id: "axlb",
    title: "A.X.L B",
    poster: axl,
    year: "2018",
    genre: "Action Adventure",
    rating: "Sankara",
    category: "movie"
  },
   {
    id: "axla",
    title: "A.X.L A",
    poster: axl,
    year: "2018",
    genre: "Action Adventure",
    rating: "Sankara",
    category: "movie"
  },
   {
  id: "shapb",
    title: "Sharper B",
    poster: shap,
    year: "2023",
    genre: "Thriller Crime",
    rating: "Rocky kimomo",
    category: "movie"
  },
   {
  id: "shapa",
    title: "Sharper A",
    poster: shap,
    year: "2023",
    genre: "Thriller Crime",
    rating: "Rocky kimomo",
    category: "movie"
  },
  {
  id: "nogood",
    title: "No Good Deed",
    poster: nogood,
    year: "2014",
    genre: "Thriller Crime",
    rating: "Gaheza Simba",
    category: "movie"
  },
  {
  id: "pricew",
    title: "The Price We Pay",
    poster: pricew,
    year: "2022",
    genre: "Horror Action",
    rating: "Gaheza Simba",
    category: "trending"
  },
  {
  id: "badi6",
    title: "Bad Influncer S01 E6",
    poster: badi,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "Bloodr4",
    title: "Blood River E4",
    poster: bloodr,
    year: "2025",
    genre: "Thriller",
    rating: "B The Great",
    category: "tv"
  },
  {
    id: "Bloodr3",
    title: "Blood River E3",
    poster: bloodr,
    year: "2025",
    genre: "Thriller",
    rating: "B The Great",
    category: "tv"
  },
   {
  id: "foever",
    title: "Forever My Girl",
    poster: foever,
    year: "2018",
    genre: "Romance Musical",
    rating: "Savimbi",
    category: "trending"
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
  id: "dou",
    title: "Dou shi Fighter",
    poster: dou,
    year: "2022",
    genre: "Action Thriller",
    rating: "B The Great",
    category: "trending"
  },
  {
  id: "badi5",
    title: "Bad Influncer S01 E5",
    poster: badi,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "noesc",
    title: "No escape",
    poster: noesc,
    year: "2016",
    genre: "Action Western",
    rating: "Rocky",
    category: "movie"
  },
  {
    id: "oldw",
    title: "Old Way",
    poster: oldw,
    year: "2015",
    genre: "Action Drama",
    rating: "Rocky",
    category: "movie"
  },
    {
    id: "nonationb",
    title: "Beast Of No Nation B",
    poster: nonation,
    year: "2015",
    genre: "War Drama",
    rating: "Savimbi",
    category: "movie"
  },
  {
  id: "nonationa",
    title: "Beast Of No Nation A",
    poster: nonation,
    year: "2015",
    genre: "War Drama",
    rating: "Savimbi",
    category: "movie"
  },
  {
  id: "robin2b",
    title: "Robin Hood S01 E2 B",
    poster: robin,
    year: "2025",
    genre: "Action Thriller",
    rating: "B The Great",
    category: "tv"
  },
  {
  id: "robin2a",
    title: "Robin Hood S01 E2 A",
    poster: robin,
    year: "2025",
    genre: "Action Thriller",
    rating: "B The Great",
    category: "tv"
  },
  {
  id: "robin1b",
    title: "Robin Hood S01 E1B",
    poster: robin,
    year: "2019",
    genre: "Action Thriller",
    rating: "B The Great",
    category: "tv"
  },
   {
  id: "robin1a",
    title: "Robin Hood S01 E1A",
    poster: robin,
    year: "2025",
    genre: "Action Thriller",
    rating: "B The Great",
    category: "tv"
  },
  {
  id: "bharatb",
    title: "Bharat B",
    poster: bharat,
    year: "2019",
    genre: "Action Romance",
    rating: "Rocky kimomo",
    category: "movie"
  },
  {
  id: "bharata",
    title: "Bharat A",
    poster: bharat,
    year: "2019",
    genre: "Action Romance",
    rating: "Rocky kimomo",
    category: "movie"
  },
  {
  id: "wolfh",
    title: "Wolf Hidding",
    poster: wolfh,
    year: "2023",
    genre: "Action Crime",
    rating: "B The Great",
    category: "trending"
  },
  {
  id: "ice",
    title: "Ice Road",
    poster: ice,
    year: "2021",
    genre: "Action Thriller",
    rating: "Gaheza Simba",
    category: "trending"
  },
  
   {
  id: "badi4",
    title: "Bad Influncer S01 E4",
    poster: badi,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  {
    id: "razb",
    title: "Raaz Reboot B",
    poster: raz,
    year: "2016",
    genre: "Horror Romance",
    rating: "Rocky kimomo",
    category: "movie"
  },
  {
    id: "raza",
    title: "Raaz Reboot A",
    poster: raz,
    year: "2016",
    genre: "Horror Romance",
    rating: "Rocky kimomo",
    category: "movie"
  },
  
  {
    id: "temp9b",
    title: "Tempest S01 E9 B Final",
    poster: tempe,
    year: "2025",
    genre: "Action Drama",
    rating: "Junior",
    category: "tv"
  },
   {
    id: "temp9a",
    title: "Tempest S01 E9 A Final",
    poster: tempe,
    year: "2025",
    genre: "Action Drama",
    rating: "Junior",
    category: "tv"
  },
  {
  id: "badi3",
    title: "Bad Influncer S01 E3",
    poster: badi,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
   {
  id: "badi2",
    title: "Bad Influncer S01 E2",
    poster: badi,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  
  {
  id: "badi1",
    title: "Bad Influncer S01 E1",
    poster: badi,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
  
  
  {
  id: "long5",
    title: "Long Road Home S01 E5",
    poster: long,
    year: "2017",
    genre: "Action Documentary",
    rating: "Junior",
    category: "tv"
  },
  
  {
  id: "long4",
    title: "Long Road Home S01 E4",
    poster: long,
    year: "2017",
    genre: "Action Documentary",
    rating: "Junior",
    category: "tv"
  },
  
  {
  id: "long3",
    title: "Long Road Home S01 E3",
    poster: long,
    year: "2017",
    genre: "Action Documentary",
    rating: "Junior",
    category: "tv"
  },
  {
  id: "long2",
    title: "Long Road Home S01 E2",
    poster: long,
    year: "2017",
    genre: "Action Documentary",
    rating: "Junior",
    category: "tv"
  },
    {
    id: "long1",
    title: "Long Road Home S01 E1",
    poster: long,
    year: "2017",
    genre: "Action Documentary",
    rating: "Junior",
    category: "tv"
  },
  {
    id: "bonne12",
    title: "Bonne Appetit S01 E12 Final",
    poster: bonne,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
   {
    id: "temp8",
    title: "Tempest S01 E8",
    poster: tempe,
    year: "2025",
    genre: "Action Drama",
    rating: "Junior",
    category: "tv"
  },
  {
    id: "temp7",
    title: "Tempest S01 E7",
    poster: tempe,
    year: "2025",
    genre: "Action Drama",
    rating: "Junior",
    category: "tv"
  },
  
   {
    id: "bonne11",
    title: "Bon Appetit S01 E11",
    poster: bonne,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
     {
    id: "hidden",
    title: "Hidden Face",
    poster: hidden,
    year: "2011",
    genre: "Mystery Thriller",
    rating: "Sankara",
    category: "movie"
  },
  {
    id: "assa4",
    title: "Assassin S01 E4",
    poster: assa,
    year: "2025",
    genre: "Crime Thriller",
    rating: "Dylan Kabaka",
    category: "tv"
  },
  {
    id: "assa3",
    title: "Assassin S01 E3",
    poster: assa,
    year: "2025",
    genre: "Crime Thriller",
    rating: "Dylan Kabaka",
    category: "tv"
  },
  {
    id: "assa2",
    title: "Assassin S01 E2",
    poster: assa,
    year: "2025",
    genre: "Crime Thriller",
    rating: "Dylan Kabaka",
    category: "tv"
  },
   {
    id: "assa1",
    title: "Assassin S01 E1",
    poster: assa,
    year: "2025",
    genre: "Crime Thriller",
    rating: "Dylan Kabaka",
    category: "tv"
  },
 

  {
    id: "cont2b",
    title: "Continental S01 E2 B",
    poster: cont,
    year: "2023",
    genre: "Action Thriller",
    rating: "Gaheza",
    category: "tv"
  },
   {
    id: "cont2a",
    title: "Continental S01 E2 A",
    poster: cont,
    year: "2023",
    genre: "Action Thriller",
    rating: "Gaheza",
    category: "tv"
  },
   {
    id: "cont1",
    title: "Continental S01 E1",
    poster: cont,
    year: "2023",
    genre: "Action Thriller",
    rating: "Gaheza",
    category: "tv"
  },
    {
    id: "bunker8",
    title: "Billionaire Bunker S01 E8",
    poster: bunker,
    year: "2025",
    genre: "Sci-fi Mystery",
    rating: "Sikov",
    category: "tv"
  },
    {
    id: "bunker7",
    title: "Billionaire Bunker S01 E7",
    poster: bunker,
    year: "2025",
    genre: "Sci-fi Mystery",
    rating: "Sikov",
    category: "tv"
  },
    {
    id: "bunker6",
    title: "Billionaire Bunker S01 E6",
    poster: bunker,
    year: "2025",
    genre: "Sci-fi Mystery",
    rating: "Sikov",
    category: "tv"
  },
    {
    id: "bunker5",
    title: "Billionaire Bunker S01 E5",
    poster: bunker,
    year: "2025",
    genre: "Sci-fi Mystery",
    rating: "Sikov",
    category: "tv"
  },
    {
    id: "bunker4",
    title: "Billionaire Bunker S01 E4",
    poster: bunker,
    year: "2025",
    genre: "Sci-fi Mystery",
    rating: "Sikov",
    category: "tv"
  },
    {
    id: "bunker3",
    title: "Billionaire Bunker S01 E3",
    poster: bunker,
    year: "2025",
    genre: "Sci-fi Mystery",
    rating: "Sikov",
    category: "tv"
  },
    {
    id: "bunker2",
    title: "Billionaire Bunker S01 E2",
    poster: bunker,
    year: "2025",
    genre: "Sci-fi Mystery",
    rating: "Sikov",
    category: "tv"
  },
   {
    id: "bunker1",
    title: "Billionaire Bunker S01 E1",
    poster: bunker,
    year: "2025",
    genre: "Sci-fi Mystery",
    rating: "Sikov",
    category: "tv"
  },
   {
    id: "bonne10",
    title: "Bon Appetit S01 E10",
    poster: bonne,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
   {
    id: "temp6",
    title: "Tempest S01 E6",
    poster: tempe,
    year: "2025",
    genre: "Action Drama",
    rating: "Junior",
    category: "tv"
  },
   {
    id: "temp5",
    title: "Tempest S01 E5",
    poster: tempe,
    year: "2025",
    genre: "Action Drama",
    rating: "Junior",
    category: "tv"
  },
   {
    id: "hrs2",
    title: "24 Hours To live B",
    poster: hrs,
    year: "2019",
    genre: "Action Sci-fi",
    rating: "Savimbi",
    category: "trending"
  },
    {
    id: "hrs1",
    title: "24 Hours To live A",
    poster: hrs,
    year: "2019",
    genre: "Action Sci-fi",
    rating: "Savimbi",
    category: "trending"
  },
   {
    id: "out",
    title: "Outpost",
    poster: out,
    year: "2019",
    genre: "Action",
    rating: "Dylan Kabaka",
    category: "trending"
  },
   {
    id: "bonne9",
    title: "Bon Appetit S01 E9",
    poster: bonne,
    year: "2025",
    genre: "Romance Drama",
    rating: "Rocky kimomo",
    category: "tv"
  },
   {
    id: "temp4",
    title: "Tempest S01 E4",
    poster: tempe,
    year: "2025",
    genre: "Action Drama",
    rating: "Junior",
    category: "tv"
  },
   {
    id: "askm",
    title: "Ask Me What You What",
    poster: askm,
    year: "2024",
    genre: "Romance Drama",
    rating: "Sankara",
    category: "trending"
  },
   {
    id: "freed",
    title: "Fifty Shades Of Freed",
    poster: freed,
    year: "2018",
    genre: "Romance Drama",
    rating: "Sankara",
    category: "trending"
  },
  
  {
    id: "brink0",
    title: "The Brink",
    poster: brink0,
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
    poster: tempe,
    year: "2025",
    genre: "Action Drama",
    rating: "Junior",
    category: "tv"
  },
  {
    id: "temp2",
    title: "Tempest S01 E2",
    poster: tempe,
    year: "2025",
    genre: "Action Drama",
    rating: "Junior",
    category: "tv"
  },
  {
    id: "temp1",
    title: "Tempest S01 E1",
    poster: tempe,
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
    category: "tv"
  },
  {
    id: "ele2",
    title: "Twelve EP 2",
    poster: ele,
    year: "2021",
    genre: "Action Thriller",
    rating: "Mungeli",
    category: "tv"
  },
   {
    id: "ele1",
    title: "Twelve EP 1",
    poster: ele,
    year: "2021",
    genre: "Action Thriller",
    rating: "Mungeli",
    category: "tv"
  },
 
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
    poster: movie4, 
    year: "2025",
    genre: "Action Thriller",
    rating: "Savimbi",
    category: "trending"
  
}
];

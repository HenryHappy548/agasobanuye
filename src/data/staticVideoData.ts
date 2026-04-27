// Static video data for legacy/mock movies
// Using SeekStreaming player (a636) with VAST ad (hahn) - starts at 5s
// All embeds automatically capture VAST ads via SeekStreaming player

export interface StaticVideoData {
  title: string;
  embedCode: string;
  host: string;
  downloadLinks: {
    quality: string;
    size: string;
    url: string;
    type: string;
  }[];
}

// All videos now use SeekStreaming embed with VAST ads
// Format: https://seekstreaming.com/embed/{videoId}?player=a636
const staticVideos: Record<string, StaticVideoData> = {
  // Featured & Core Movies - Using SeekStreaming embeds with VAST ads (starts at 5s)
  "featured-movie": { 
    title: "Don't Hang Up (2026)", 
    embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", 
    host: "Sankara", 
    downloadLinks: [{ quality: "1080p", size: "350MB", url: "https://www.mediafire.com/file/tnwxbg4hey9gkjj/Dont_Hang_Up.mp4/file", type: "MP4" }] 
  },
  "dont": { 
    title: "Don't Hangup", 
    embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", 
    host: "Sankara", 
    downloadLinks: [{ quality: "720p", size: "540MB", url: "https://www.mediafire.com/file/tnwxbg4hey9gkjj/Dont_Hang_Up.mp4/file", type: "MP4" }] 
  },
  
  // First Lady Series - Using SeekStreaming embeds
  "flady9": { title: "First Lady S01 E9", embedCode: "https://seekstreaming.com/embed/3ja95?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/19xhnddldrddwn1/THE+FIRST+LADY+EP9.mp4/file", type: "MP4" }] },
  "flady8": { title: "First Lady S01 E8", embedCode: "https://seekstreaming.com/embed/3ja95?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/jrqm66j5910nj3k/THE+FIRST+LADY+EP8.mp4/file", type: "MP4" }] },
  "flady7": { title: "First Lady S01 E7", embedCode: "https://seekstreaming.com/embed/9voex?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/7aijzhdx617qfrr/THE+FIRST+LADY+EP7.mp4/file", type: "MP4" }] },
  "flady6": { title: "First Lady S01 E6", embedCode: "https://seekstreaming.com/embed/9voex?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/1quqfj3x2com0ow/THE+FIRST+LADY+EP6.mp4/file", type: "MP4" }] },
  "flady5": { title: "First Lady S01 E5", embedCode: "https://seekstreaming.com/embed/w8fzr?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/w6gpfwqetk2x5wl/First+Lady+E05+(2022).mp4/file", type: "MP4" }] },
  "flady4": { title: "First Lady S01 E4", embedCode: "https://seekstreaming.com/embed/w8fzr?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://www.mediafire.com/file/lgbvywsju4v8y4s/First_Lady_S01e04.mp4/file", type: "MP4" }] },
  "flady3": { title: "First Lady S01 E3", embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://www.mediafire.com/file/s37mxotby2z6oo7/First_Lady_S01e03.mp4/file", type: "MP4" }] },
  "flady2": { title: "First Lady S01 E2", embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://www.mediafire.com/file/fmuhsunj3k6xmhn/First_Lady_S01e02.mp4/file", type: "MP4" }] },
  "flady1": { title: "First Lady S01 E1", embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://www.mediafire.com/file/y0kh9yq61o1dfq9/First_Lady_S01e01.mp4/file", type: "MP4" }] },

  // Army of the Dead A & B
  "armya": { title: "Army of the Dead A", embedCode: "https://seekstreaming.com/embed/byeme?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://www.mediafire.com/file/byeme/Army+of+the+Dead+A.mp4/file", type: "MP4" }] },
  "armyb": { title: "Army of the Dead B", embedCode: "https://seekstreaming.com/embed/vlqqb?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://www.mediafire.com/file/vlqqb/Army+of+the+Dead+B.mp4/file", type: "MP4" }] },

  // SAS Red Notice A & B
  "sasa": { title: "SAS Red Notice A", embedCode: "https://seekstreaming.com/embed/8u3ln?player=a636", host: "Gaheza", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://www.mediafire.com/file/8u3ln/SAS_Red_Notice_A.mp4/file", type: "MP4" }] },
  "sasb": { title: "SAS Red Notice B", embedCode: "https://seekstreaming.com/embed/cg9a6?player=a636", host: "Gaheza", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://www.mediafire.com/file/cg9a6/SAS+Red+Notice+B.mp4/file", type: "MP4" }] },

  // Other movies - keep original embeds for now (need to upload to SeekStreaming)
  "morrow": { title: "Tomorrow War", embedCode: "https://seekstreaming.com/embed/w8fzr?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://drive.usercontent.google.com/download?id=1aj1xFNYs-fHMSWaIPAurZoAodfMvfEiC&export=download&authuser=0", type: "MP4" }] },
  "olym": { title: "Olympus Has Fallen", embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", host: "Sankara", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/o6rfvvqvpuqzk1y/Olympus_Has_Fallen.mp4/file", type: "MP4" }] },
  "fall": { title: "Fall", embedCode: "https://seekstreaming.com/embed/3ja95?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/uj3l7plbctit2e1/Fall.mp4/file", type: "MP4" }] },
  "sisu": { title: "Sisu", embedCode: "https://seekstreaming.com/embed/9voex?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/mj2k4swz3eyyd26/Sisu.mp4/file", type: "MP4" }] },
  "evild": { title: "Evil Dead", embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", host: "Sankara", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=SANKAR%2FEvil_Dead_by_Sankar.mp4&filename=Evil_Dead_by_Sankar.mp4", type: "MP4" }] },

  // Shooter S02 Season
  "shooters8": { title: "Shooter S02 E8 Final", embedCode: "https://seekstreaming.com/embed/byeme?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FSHOOTER_S02_E08_FINAL.mp4&filename=SHOOTER_S02_E08_FINAL.mp4", type: "MP4" }] },
  "shooters7": { title: "Shooter S02 E7", embedCode: "https://seekstreaming.com/embed/byeme?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FSHOOTER_S02E07.mp4&filename=SHOOTER_S02E07.mp4", type: "MP4" }] },
  "shooters6": { title: "Shooter S02 E6", embedCode: "https://seekstreaming.com/embed/vlqqb?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FSHOOTER_S02E06.mp4&filename=SHOOTER_S02E06.mp4", type: "MP4" }] },
  "shooters5": { title: "Shooter S02 E5", embedCode: "https://seekstreaming.com/embed/vlqqb?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FSHOOTER_S02E05.mp4&filename=SHOOTER_S02E05.mp4", type: "MP4" }] },
  "shooters4": { title: "Shooter S02 E4", embedCode: "https://seekstreaming.com/embed/byeme?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FSHOOTER_S02E04.mp4&filename=SHOOTER_S02E04.mp4", type: "MP4" }] },
  "shooters3": { title: "Shooter S02 E3", embedCode: "https://seekstreaming.com/embed/8u3ln?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FSHOOTER_S02E03.mp4&filename=SHOOTER_S02E03.mp4", type: "MP4" }] },
  "shooters2": { title: "Shooter S02 E2", embedCode: "https://seekstreaming.com/embed/8u3ln?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FSHOOTER_S02E02.mp4&filename=SHOOTER_S02E02.mp4", type: "MP4" }] },
  "shooters1": { title: "Shooter S02 E1", embedCode: "https://seekstreaming.com/embed/8u3ln?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=series%2F2025%2Frocky%2Fshoot%2FShooter_S02e1.mp4&filename=Shooter_S02e1.mp4", type: "MP4" }] },

  // Shooter S01 Season
  "shooter10": { title: "Shooter S01 E10 Final", embedCode: "https://seekstreaming.com/embed/8u3ln?player=a636", host: "Rocky", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FShooter.S01E10_Final.mp4&filename=Shooter.S01E10_Final.mp4", type: "MP4" }] },
  "shooter9": { title: "Shooter S01 E9", embedCode: "https://seekstreaming.com/embed/8u3ln?player=a636", host: "Rocky", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FShooter.S01E09.mp4&filename=Shooter.S01E09.mp4", type: "MP4" }] },
  "shooter8": { title: "Shooter S01 E8", embedCode: "https://seekstreaming.com/embed/8u3ln?player=a636", host: "Rocky", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FShooter.S01E08.mp4&filename=Shooter.S01E08.mp4", type: "MP4" }] },
  "shooter7": { title: "Shooter S01 E7", embedCode: "https://seekstreaming.com/embed/9voex?player=a636", host: "Rocky", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FShooter_S01E07.mp4&filename=Shooter_S01E07.mp4", type: "MP4" }] },
  "shooter6": { title: "Shooter S01 E6", embedCode: "https://seekstreaming.com/embed/9voex?player=a636", host: "Rocky", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FShooter.S01E06.mp4&filename=Shooter.S01E06.mp4", type: "MP4" }] },
  "shooter5": { title: "Shooter S01 E5", embedCode: "https://seekstreaming.com/embed/9voex?player=a636", host: "Rocky", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FSHOOTER_S1_EP5.mp4&filename=SHOOTER_S1_EP5.mp4", type: "MP4" }] },
  "shooter4": { title: "Shooter S01 E4", embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FSHOOTER_S1_EP4.mp4&filename=SHOOTER_S1_EP4.mp4", type: "MP4" }] },
  "shooter3": { title: "Shooter S01 E3", embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FRocky%2FSHOOTER_S1_EP3.mp4&filename=SHOOTER_S1_EP3.mp4", type: "MP4" }] },
  "shooter2": { title: "Shooter S01 E2", embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "448MB", url: "https://www.mediafire.com/file/5tj1ouvcly4g5uq/Shooter_S01e02.mp4/file", type: "MP4" }] },
  "shooter1": { title: "Shooter S01 E1", embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "478MB", url: "https://www.mediafire.com/file/mcrhspk5hgroi79/Shooter_S01e01.mp4/file", type: "MP4" }] },

  // Sean Combs Series
  "seanc3": { title: "Sean Combs S01 E3", embedCode: "https://seekstreaming.com/embed/3ja95?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/a7z2k66bp6485jh/SEAN_COMBS_EP_03.mp4/file", type: "MP4" }] },

  // Children Of Sister Series
  "childrens5": { title: "Children Of Sister S01 E5", embedCode: "https://seekstreaming.com/embed/3ja95?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/gyhz8pgitppoe40/Children_Of_Sister_E05.mp4/file", type: "MP4" }] },
  "childrens4": { title: "Children Of Sister S01 E4", embedCode: "https://seekstreaming.com/embed/3ja95?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/1z02xn76mj1xto0/Children_Of_Sister_E04.mp4/file", type: "MP4" }] },
  "childrens3b": { title: "Children Of Sister S01 E3 B", embedCode: "https://seekstreaming.com/embed/3ja95?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/arixhwlkliad3wl/Children_Of_Sister_E03B.mp4/file", type: "MP4" }] },
  "childrens3a": { title: "Children Of Sister S01 E3 A", embedCode: "https://seekstreaming.com/embed/3ja95?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/ieh14jfohpqjze5/Children_Of_Sister_E03A.mp4/file", type: "MP4" }] },
  "childrens2": { title: "Children Of Sister S01 E2", embedCode: "https://seekstreaming.com/embed/3ja95?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/61j2ty785y3qpzj/Children_Of_Sister_E02.mp4/file", type: "MP4" }] },
  "childrens1": { title: "Children Of Sister S01 E1", embedCode: "https://seekstreaming.com/embed/3ja95?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/g80ogxtx01415ar/Children_Of_Sister_E01.mp4/file", type: "MP4" }] },

  // Desperate Lies Series
  "desperate4": { title: "Desperate Lies S01 E4", embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", host: "Sankara", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/rkjbkbfh79cgzpv/Desperate_Lies_ep_4.mp4/file", type: "MP4" }] },
  "desperate3": { title: "Desperate Lies S01 E3", embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", host: "Sankara", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/jyjxt4omf9o6m9i/Desperate_Lies_ep3.mp4/file", type: "MP4" }] },
  "desperate2": { title: "Desperate Lies S01 E2", embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", host: "Sankara", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://www.mediafire.com/file/qpqxor7k1v3b2g7/Desperate_Lies_ep2.mp4/file", type: "MP4" }] },
  "desperate1": { title: "Desperate Lies S01 E1", embedCode: "https://seekstreaming.com/embed/ipt9t?player=a636", host: "Sankara", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FAmerica%2FDesperate_Lies_ep1.mp4&filename=Desperate_Lies_ep1.mp4", type: "MP4" }] },

  // Stranger Things Series
  "stranger6": { title: "Stranger Things S01 E6", embedCode: "https://seekstreaming.com/embed/w8fzr?player=a636", host: "Dylan Kabaka", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=SANKAR%2FStranger_Things_s1ep6.mp4&filename=Stranger_Things_s1ep6.mp4", type: "MP4" }] },
  "stranger5": { title: "Stranger Things S01 E5", embedCode: "https://seekstreaming.com/embed/w8fzr?player=a636", host: "Dylan Kabaka", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=SANKAR%2FStranger_Things_s1ep5.mp4&filename=Stranger_Things_s1ep5.mp4", type: "MP4" }] },
  "stranger4": { title: "Stranger Things S01 E4", embedCode: "https://seekstreaming.com/embed/w8fzr?player=a636", host: "Dylan Kabaka", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=SANKAR%2FStranger_Things_s1ep4.mp4&filename=Stranger_Things_s1ep4.mp4", type: "MP4" }] },
  "stranger3": { title: "Stranger Things S01 E3", embedCode: "https://seekstreaming.com/embed/w8fzr?player=a636", host: "Dylan Kabaka", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FAmerica%2Fsire%2FStranger_Things_s1ep3.mp4&filename=Stranger_Things_s1ep3.mp4", type: "MP4" }] },
  "stranger2": { title: "Stranger Things S01 E2", embedCode: "https://seekstreaming.com/embed/w8fzr?player=a636", host: "Dylan Kabaka", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FAmerica%2Fsire%2FStranger_Things_s1ep2.mp4&filename=Stranger_Things_s1ep2.mp4", type: "MP4" }] },
  "stranger1": { title: "Stranger Things S01 E1", embedCode: "https://seekstreaming.com/embed/w8fzr?player=a636", host: "Dylan Kabaka", downloadLinks: [{ quality: "720p", size: "740MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=Serie%2FAmerica%2Fsire%2FStranger_Things_s1e1.mp4&filename=Stranger_Things_s1e1.mp4", type: "MP4" }] },

  // Harper's Island Series
  "harper10": { title: "Harper's Island S01 E10", embedCode: "https://seekstreaming.com/embed/byeme?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=series%2F2025%2Frocky%2FHarper_s_Island_Ep10.mp4&filename=Harper_s_Island_Ep10.mp4", type: "MP4" }] },
  "harper9": { title: "Harper's Island S01 E9", embedCode: "https://seekstreaming.com/embed/byeme?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=series%2F2025%2Frocky%2FHarper_s_Island_Ep09.mp4&filename=Harper_s_Island_Ep09.mp4", type: "MP4" }] },
  "harper8": { title: "Harper's Island S01 E8", embedCode: "https://seekstreaming.com/embed/byeme?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=series%2F2025%2Frocky%2FHarper_s_Island_Ep08.mp4&filename=Harper_s_Island_Ep08.mp4", type: "MP4" }] },
  "harper7": { title: "Harper's Island S01 E7", embedCode: "https://seekstreaming.com/embed/byeme?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=series%2F2025%2Frocky%2FHarper_s_Island_Ep07.mp4&filename=Harper_s_Island_Ep07.mp4", type: "MP4" }] },
  "harper6": { title: "Harper's Island S01 E6", embedCode: "https://seekstreaming.com/embed/byeme?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=series%2F2025%2Frocky%2FHarper_s_Island_Ep06.mp4&filename=Harper_s_Island_Ep06.mp4", type: "MP4" }] },
  "harper5": { title: "Harper's Island S01 E5", embedCode: "https://seekstreaming.com/embed/byeme?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=series%2F2025%2Frocky%2FHarper_s_Island_Ep05.mp4&filename=Harper_s_Island_Ep05.mp4", type: "MP4" }] },
  "harper4": { title: "Harper's Island S01 E4", embedCode: "https://seekstreaming.com/embed/byeme?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=series%2F2025%2Frocky%2FHarper_s_Island_Ep04.mp4&filename=Harper_s_Island_Ep04.mp4", type: "MP4" }] },
  "harper3": { title: "Harper's Island S01 E3", embedCode: "https://seekstreaming.com/embed/byeme?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=series%2F2025%2Frocky%2FHarper_s_Island_Ep03.mp4&filename=Harper_s_Island_Ep03.mp4", type: "MP4" }] },
  "harper2": { title: "Harper's Island S01 E2", embedCode: "https://seekstreaming.com/embed/byeme?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=series%2F2025%2Frocky%2FHarper_s_Island_Ep02.mp4&filename=Harper_s_Island_Ep02.mp4", type: "MP4" }] },
  "harper1": { title: "Harper's Island S01 E1", embedCode: "https://seekstreaming.com/embed/byeme?player=a636", host: "Rocky kimomo", downloadLinks: [{ quality: "720p", size: "540MB", url: "https://isatafileze.fly.dev/simple-redirect-download?file=series%2F2025%2Frocky%2FHarper_s_Island_Ep01.mp4&filename=Harper_s_Island_Ep01.mp4", type: "MP4" }] },
};

export const getStaticVideoData = (id: string): StaticVideoData | undefined => {
  return staticVideos[id];
};

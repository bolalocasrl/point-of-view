// Content of the /story page: the Point of View timeline.
// Photos live in client/public/storia/<chapter>/ in several widths
// (name-800.webp, name-1600.webp, name-2400.webp), made with scripts/foto.mjs;
// sizes and widths are listed in foto.json.
//
// Facts come from the POV presentation (first nights per city) and from the
// dates printed on the flyers, matched with the shooting date of each photo.
import manifest from "./foto.json";

// While true the page shows a draft banner, is not indexed and is not linked in menus
export const STORY_DRAFT = false;

export type Photo = { base: string; alt: string; w: number; h: number; widths: number[] };

const MANIFEST = manifest as Record<string, { w: number; h: number; widths: number[] }>;

// The smallest file that covers the requested width
export function urlPhoto(p: Photo, width = 1600) {
  const w = p.widths.find((x) => x >= width) ?? p.widths[p.widths.length - 1];
  return `${p.base}-${w}.webp`;
}

export const srcSetPhoto = (p: Photo) => p.widths.map((w) => `${p.base}-${w}.webp ${w}w`).join(", ");

// Every photo of a chapter folder, in file-name order
function chapterPhotos(folder: string, alt: string): Photo[] {
  const prefix = `/storia/${folder}/`;
  return Object.keys(MANIFEST)
    .filter((k) => k.startsWith(prefix))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((base) => ({ base, alt, ...MANIFEST[base] }));
}

export type Chapter = {
  year: string;
  date: string;
  title: string;
  text: string;
  photos: Photo[];
};

export const STORY_INTRO =
  "Born in Milan in 2016. Since then: Formentera, Lisbon, Barcelona, Bologna. " +
  "Electronic music and art under one roof, and a crowd that is part of the show — never just in front of it.";

export const CHAPTERS: Chapter[] = [
  {
    year: "2016",
    date: "22 December 2016 · Milan",
    title: "Where it started",
    text:
      "The first Point of View night, in Milan. The idea was already there: bring different points of view on art — sound, visuals, performance, light — into one single experience.",
    photos: [],
  },
  {
    year: "2017",
    date: "17 August 2017 · Formentera",
    title: "Island time",
    text: "The first night away from home, on the island of Formentera.",
    photos: [],
  },
  {
    year: "2022",
    date: "From 25 March 2022 · Lisbon",
    title: "Lisbon, LX Factory",
    text:
      "Lisbon becomes a second home. A run of nights at LX Factory with Sheri Vari, E.DUE.S, Emanuele Ross, Kaspar, Gazco, Matvee, Mayan and Klai — and a Christmas party to close the year.",
    photos: chapterPhotos("2022-lisbon", "Point of View in Lisbon, 2022"),
  },
  {
    year: "2023",
    date: "2023",
    title: "Micro Music Club & friends",
    text:
      "The Micro Music Club nights, Ripeat in Milan, two beach parties in the summer and Mirari in November, where art and music shared the same stage.",
    photos: chapterPhotos("2023-micro-music-club", "Point of View flyers, 2023"),
  },
  {
    year: "2024",
    date: "From 12 April 2024 · Barcelona",
    title: "Barcelona",
    text:
      "Barcelona joins the map: Bo Rei Disco Club in April, a day on the rooftop of The Social Hub in June, Cinco in October.",
    photos: chapterPhotos("2024-barcelona", "Point of View in Barcelona, 2024"),
  },
  {
    year: "2024",
    date: "February — December 2024",
    title: "Milan, Bologna & the rooftops",
    text:
      "Mirari's carnival edition, a Sunday in Milan, The Social Hub Bologna in September and the first Tutto Passa rooftop in December.",
    photos: chapterPhotos("2024-milan-bologna-rooftops", "Point of View in Milan and Bologna, 2024"),
  },
  {
    year: "2025",
    date: "2025 · Lisbon & Caparica",
    title: "Back to the origin",
    text:
      "Micro Club at LX Factory, another Tutto Passa rooftop, Tafico on the docks, Gui Boratto live on the beach at Waikiki, Caparica, and Disco Beach with Tonno Disko.",
    photos: chapterPhotos("2025-lisbon-caparica", "Point of View in Lisbon and Caparica, 2025"),
  },
  {
    year: "2025",
    date: "30 November 2025 · Barcelona",
    title: "Forum Station",
    text: "A Sunday at Forum Station, with an art market running alongside the music.",
    photos: chapterPhotos("2025-forum-station", "Point of View at Forum Station, Barcelona"),
  },
  {
    year: "2026",
    date: "24 January 2026 · Barcelona",
    title: "Vraba",
    text: "Winter in Barcelona: a full night at Vraba, lit in red.",
    photos: chapterPhotos("2026-vraba", "Point of View at Vraba, Barcelona"),
  },
  {
    year: "2026",
    date: "June & October 2026 · Barcelona",
    title: "Albura & ESC",
    text:
      "Summer on the Albura rooftop — and on 2 October four collectives press the same key: ESC.",
    photos: chapterPhotos("2026-albura-esc", "Point of View at Albura, Barcelona"),
  },
];

// Hero image of the page
export const STORY_COVER: Photo | undefined = chapterPhotos("2026-vraba", "Point of View at Vraba, Barcelona")[0];

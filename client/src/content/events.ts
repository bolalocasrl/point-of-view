// Upcoming events. Each one disappears from the site on its own once `endsAt`
// has passed, so the homepage never shows an old date with live ticket links.
// To add the next event: copy an entry, change the fields, keep `endsAt` in the
// venue's time zone (e.g. +02:00 for Barcelona in summer, +01:00 in winter).

export type TicketOption = { name: string; url: string };

export type UpcomingEvent = {
  id: string;
  city: string;
  title: string;
  date: string;
  venue: string;
  lineup: string;
  blurb: string;
  image: string;
  endsAt: string;
  ticketOptions: TicketOption[];
};

export const EVENTS: UpcomingEvent[] = [
  {
    id: "esc-2026-10-02",
    city: "Barcelona",
    title: "ESC — End. Shift. Connect.",
    date: "Friday, October 2 — 19:00 to 02:00",
    venue: "Albura Rooftop, Moll d'Espanya 8, Ciutat Vella",
    lineup: "DAGZZ, E.DUE.S, MARCO G, Mario Chicoli, Massif, Mastro Sally, MATE, SALVIA",
    blurb:
      "A sunset-to-night rooftop session above the port. House, deep house and tech house, four collectives, one direction: Point of View x No Alibi x Groovers Gonna Groove x Placeo.",
    image: "/assets/flyeresc.webp",
    endsAt: "2026-10-03T02:00:00+02:00",
    ticketOptions: [
      { name: "Resident Advisor", url: "https://it.ra.co/events/2538024" },
      { name: "Shotgun", url: "https://shotgun.live/en/events/esc-united-label-end-shift-conect" },
    ],
  },
];

// Events that have not finished yet, soonest first
export function upcomingEvents(now = new Date()): UpcomingEvent[] {
  return EVENTS
    .filter((e) => new Date(e.endsAt).getTime() > now.getTime())
    .sort((a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime());
}

// First real ticket link of the next event, if any
export function nextTicketUrl(now = new Date()): string | undefined {
  return upcomingEvents(now)[0]?.ticketOptions.find((t) => t.url && t.url !== "#")?.url;
}

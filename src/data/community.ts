export type GrowEvent = {
  slug: string;
  title: string;
  city: string;
  country: string;
  date: string; // ISO
  format: "Talk" | "Dinner" | "Salon" | "Launch";
  blurb: string;
  capacity?: string;
};

export const EVENTS: GrowEvent[] = [
  {
    slug: "lagos-builders-dinner",
    title: "Builders Dinner — Lagos",
    city: "Lagos",
    country: "Nigeria",
    date: "2026-06-12T19:00:00+01:00",
    format: "Dinner",
    blurb: "An intimate dinner with twelve operators building category-defining African companies.",
    capacity: "12 seats",
  },
  {
    slug: "nairobi-money-talks",
    title: "Money Talks — Nairobi",
    city: "Nairobi",
    country: "Kenya",
    date: "2026-07-03T18:30:00+03:00",
    format: "Talk",
    blurb: "A conversation on the economics of staying, with the Money desk and three guests.",
    capacity: "60 seats",
  },
  {
    slug: "capetown-creative-salon",
    title: "Creative Salon — Cape Town",
    city: "Cape Town",
    country: "South Africa",
    date: "2026-08-17T17:00:00+02:00",
    format: "Salon",
    blurb: "Designers, writers, and editors on what serious cultural work looks like now.",
    capacity: "40 seats",
  },
  {
    slug: "accra-issue-launch",
    title: "Issue 02 Launch — Accra",
    city: "Accra",
    country: "Ghana",
    date: "2026-09-21T19:30:00+00:00",
    format: "Launch",
    blurb: "Drinks, readings, and the first physical copies of Issue 02.",
    capacity: "100 seats",
  },
];

export type Letter = {
  slug: string;
  from: string;
  city: string;
  country: string;
  date: string;
  subject: string;
  body: string;
};

export const LETTERS: Letter[] = [
  {
    slug: "on-the-quiet-architects",
    from: "Adaeze, 32",
    city: "Lagos",
    country: "Nigeria",
    date: "April 2026",
    subject: "On 'The Quiet Architects of Lagos'",
    body: "I read it twice. The line about shipping every week for five years has been pinned above my desk since Monday. We have been quietly building a B2B distribution business for four years and the loneliness of unbranded work is real. Thank you for naming it.",
  },
  {
    slug: "from-a-reader-in-dakar",
    from: "Mamadou, 28",
    city: "Dakar",
    country: "Senegal",
    date: "April 2026",
    subject: "Une lettre de Dakar",
    body: "Merci pour ce premier numéro. La perspective francophone est souvent oubliée dans les médias panafricains anglophones. J'attends avec impatience un article sur l'écosystème de Dakar.",
  },
  {
    slug: "on-staying",
    from: "Tariro, 35",
    city: "Harare",
    country: "Zimbabwe",
    date: "April 2026",
    subject: "On 'The New Economics of Staying'",
    body: "I left in 2014 and returned in 2023. Your model is the first I've seen that takes the intangibles seriously. The decision is rarely about the spreadsheet — but the spreadsheet helps.",
  },
];

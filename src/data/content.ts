// Centralized content for issues, stories, and the business directory.

import cover01 from "@/assets/issue-01-cover.jpg";
import cover00 from "@/assets/issue-00-cover.jpg";
import portrait from "@/assets/community-portrait.jpg";
import nigeria from "@/assets/africa-nigeria.jpg";
import southafrica from "@/assets/africa-southafrica.jpg";
import kenya from "@/assets/africa-kenya.jpg";
import morocco from "@/assets/africa-morocco.jpg";

export type Issue = {
  slug: string;
  number: string;
  title: string;
  blurb: string;
  date: string;
  cover: string;
  pages: string[]; // image URLs for the flipbook
  pdfUrl?: string;
};

export const ISSUES: Issue[] = [
  {
    slug: "issue-01",
    number: "01",
    title: "The Builders Edition",
    blurb: "Founders, creators, and operators building across Africa.",
    date: "April 2026",
    cover: cover01,
    pages: [cover01, nigeria, kenya, southafrica, morocco, portrait, cover01],
    pdfUrl: "/issues/issue-01.pdf",
  },
  {
    slug: "issue-00",
    number: "00",
    title: "The Starting Point",
    blurb: "A look at the mindset and ideas behind a new generation.",
    date: "January 2026",
    cover: cover00,
    pages: [cover00, portrait, kenya, nigeria, cover00],
    pdfUrl: "/issues/issue-00.pdf",
  },
];

export type Story = {
  slug: string;
  category: "business" | "lifestyle" | "culture" | "money";
  title: string;
  dek: string;
  author: string;
  readTime: string;
  cover: string;
  // Each paragraph; we render the first ~50% on the story page.
  paragraphs: string[];
};

export const STORIES: Story[] = [
  {
    slug: "the-quiet-architects-of-lagos",
    category: "business",
    title: "The Quiet Architects of Lagos",
    dek: "How a new generation of operators is reshaping Nigeria's commercial spine—one unglamorous business at a time.",
    author: "Ada Okonkwo",
    readTime: "9 min read",
    cover: nigeria,
    paragraphs: [
      "On a Tuesday morning in Yaba, the air still tastes of last night's rain. Inside a converted warehouse, twelve people sit around a long oak table, talking about pricing tiers for a logistics product nobody outside their building has heard of. By the end of the year, it will move fifteen percent of inland freight in three states.",
      "This is the part of the story Lagos doesn't usually tell about itself. The headlines belong to the breakout fintechs, the celebrity founders, the unicorn rounds. But underneath the noise, there is a quieter class of builders—operators, more than visionaries—who are constructing the systems the city actually runs on.",
      "They are not chasing valuations. They are chasing distribution, defensibility, and a payroll that clears on the 28th of every month. Their offices are unbranded. Their LinkedIn profiles are blank. Their companies are profitable.",
      "We spent three months with five of them. What emerged was a portrait of a generation that is, above all, allergic to theatre.",
      "Take Tunde, 34, who runs a B2B distribution business out of an office above a hardware store in Surulere. He has 41 employees, contracts with three of the country's largest FMCG brands, and a self-imposed rule against speaking to the press. He agreed to this interview only after we promised not to use his last name.",
      "\"The market doesn't reward storytelling here,\" he says. \"It rewards consistency. If you ship every week for five years, you win. If you tweet every week for five years, you get tired.\"",
      "His view is unfashionable, but increasingly common. Across Lagos, a kind of operator-realism is hardening into a worldview. The builders we met spoke less about disruption and more about durability. Less about category creation and more about category dominance. Less about ten-year visions and more about the next 90 days.",
      "It is, in many ways, a generational correction.",
    ],
  },
  {
    slug: "what-we-wear-when-we-arrive",
    category: "lifestyle",
    title: "What We Wear When We Arrive",
    dek: "The new uniform of African ambition is quieter, more confident, and built to outlast the season.",
    author: "Lerato Mokoena",
    readTime: "7 min read",
    cover: kenya,
    paragraphs: [
      "There is a specific kind of outfit that has begun showing up in the lobbies of hotels in Nairobi, Cape Town, Lagos and Kigali. Tailored, but not stiff. Considered, but not loud. It signals belonging without announcing arrival.",
      "Call it the new uniform of African ambition: clothes designed to be read by other operators, not by the algorithm.",
      "The shift is subtle. Five years ago, the visual code of the African professional class leaned toward statement—bold prints, sharp silhouettes, the kind of look engineered to perform on a feed. Today, the codes have softened. Linen instead of suiting. Heritage prints reduced to a single accent. Watches that whisper rather than shout.",
      "It is not minimalism, exactly. It is closer to confidence.",
      "Designers across the continent are responding. In Accra, a small atelier called Anyẹmi has built a waitlist for unstructured jackets cut from locally woven cotton. In Cape Town, a quiet menswear label is reissuing its archive in muted earth tones. In Lagos, an unnamed studio sells out monthly drops without ever posting the products online.",
      "The customer for these brands is the same customer reshaping the boardroom: thirty-something, well-traveled, fluent in two or three professional contexts, and increasingly uninterested in being legible to outsiders.",
      "\"I dress for the people in the room with me,\" one founder told us in Nairobi. \"Not for anyone watching.\"",
    ],
  },
  {
    slug: "the-language-of-the-new-african-canon",
    category: "culture",
    title: "The Language of the New African Canon",
    dek: "From music to literature to memes, a generation is rewriting what cultural authority looks like.",
    author: "Kwame Boateng",
    readTime: "11 min read",
    cover: morocco,
    paragraphs: [
      "Cultural authority used to be granted by gatekeepers: editors, curators, label executives, the people who decided what would be on the cover. Today, on the African continent, that authority is being negotiated in public—in group chats, on Twitter Spaces, in the comments under a Burna Boy verse.",
      "The result is messy, fast, and unmistakably original.",
      "Consider the trajectory of a single phrase. In late 2024, a Ghanaian comedian used the word \"sharp\" in a thirty-second clip. By mid-2025, it had become shorthand across West Africa for a particular kind of social precision—being aware, being on time, being the person who notices what others miss. It now appears in advertising copy, song lyrics, and the casual speech of teenagers in Nairobi who have never been to Accra.",
      "This is not a unique story. It is the texture of how culture moves now.",
      "The old continental canon—built around named authors, named musicians, named festivals—is still there. It still matters. But running parallel to it is a faster, more diffuse canon, built out of fragments: lyrics, captions, references, in-jokes. It does not need permission to exist. It does not need to be archived. It moves at the speed of attention.",
      "What is being lost, and what is being gained?",
      "We spoke to writers, producers, curators, and several people who would not describe themselves as any of those things, about what it means to be culturally serious in 2026.",
    ],
  },
  {
    slug: "the-new-economics-of-staying",
    category: "money",
    title: "The New Economics of Staying",
    dek: "For a generation raised on the idea of leaving, the math of building a life on the continent is changing.",
    author: "Ifeoma Nwachukwu",
    readTime: "10 min read",
    cover: southafrica,
    paragraphs: [
      "For most of the last two decades, the financial logic for ambitious young Africans pointed in one direction: out. Higher salaries, stronger currencies, deeper capital markets. The math was almost insulting in its clarity.",
      "That math is changing. Not everywhere, not for everyone, but in enough pockets and across enough professions that a real conversation is now possible about the economics of staying.",
      "The numbers tell part of the story. Senior software engineers in Lagos now command compensation packages that, when adjusted for cost of living and dollar exposure, begin to rival entry-level offers in Berlin or Toronto. Founders raising in dollars and spending in naira or rand or shilling are running operating margins that would be impossible elsewhere.",
      "The intangibles tell the rest. Proximity to opportunity. Cultural fluency. The ability to build something meaningful in a market that is still being defined.",
      "None of this means the case for leaving has collapsed. For many people, in many fields, it is still the right answer. But the answer is no longer automatic, and that change—from default to choice—is reshaping the personal finance decisions of an entire cohort.",
      "We modeled the actual numbers across four cities, four professions, and three life stages. The results surprised us.",
    ],
  },
];

export type Business = {
  name: string;
  category: string;
  city: string;
  country: string;
  blurb: string;
  url: string;
};

export const BUSINESSES: Business[] = [
  { name: "Anyẹmi Atelier", category: "Fashion", city: "Accra", country: "Ghana", blurb: "Unstructured tailoring in locally woven cotton.", url: "#" },
  { name: "Karoo & Co.", category: "Coffee", city: "Cape Town", country: "South Africa", blurb: "Specialty roastery sourcing single-origin African beans.", url: "#" },
  { name: "Mara Logistics", category: "Logistics", city: "Lagos", country: "Nigeria", blurb: "Inland freight infrastructure for fast-moving goods.", url: "#" },
  { name: "Soko Studio", category: "Design", city: "Nairobi", country: "Kenya", blurb: "Industrial design studio for African consumer brands.", url: "#" },
  { name: "Atlas Capital", category: "Finance", city: "Casablanca", country: "Morocco", blurb: "Private credit for mid-market operators across the Maghreb.", url: "#" },
  { name: "Kintu Coffee Bar", category: "Hospitality", city: "Kampala", country: "Uganda", blurb: "Daytime café and evening listening room.", url: "#" },
];

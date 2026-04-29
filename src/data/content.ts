// Centralized content for issues, stories, and the business directory.

import cover01 from "@/assets/issue-01-cover.jpg";
import cover00 from "@/assets/issue-00-cover.jpg";
import portrait from "@/assets/community-portrait.jpg";
import nigeria from "@/assets/africa-nigeria.jpg";
import southafrica from "@/assets/africa-southafrica.jpg";
import kenya from "@/assets/africa-kenya.jpg";
import morocco from "@/assets/africa-morocco.jpg";
import ghana from "@/assets/africa-ghana.jpg";
import cameroon from "@/assets/africa-cameroon.jpg";
import sierraleone from "@/assets/africa-sierraleone.jpg";
import benin from "@/assets/africa-benin.jpg";
import egypt from "@/assets/africa-egypt.jpg";
import spreadFeature from "@/assets/spread-feature.jpg";
import spreadStill from "@/assets/spread-stillife.jpg";
import spreadPeople from "@/assets/spread-people.jpg";

// Vibrant city slides for hero
import cityLagos from "@/assets/city-lagos.jpg";
import cityNairobi from "@/assets/city-nairobi.jpg";
import cityCapetown from "@/assets/city-capetown.jpg";
import cityMarrakech from "@/assets/city-marrakech.jpg";

// Business directory imagery (each unique)
import bMaraCloud from "@/assets/biz/tech-mara-cloud.jpg";
import bSokoDevices from "@/assets/biz/tech-soko-devices.jpg";
import bPyramidAi from "@/assets/biz/tech-pyramid-ai.jpg";
import bKenteCode from "@/assets/biz/tech-kente-code.jpg";
import bPaystream from "@/assets/biz/tech-paystream.jpg";
import bBaobabSec from "@/assets/biz/tech-baobab-security.jpg";
import bAsaRecords from "@/assets/biz/music-asa-records.jpg";
import bHighlife from "@/assets/biz/music-highlife-house.jpg";
import bCapeSound from "@/assets/biz/music-cape-sound.jpg";
import bKwaitoLive from "@/assets/biz/music-kwaito-live.jpg";
import bSavanna from "@/assets/biz/music-savanna-sounds.jpg";
import bAfrobeat from "@/assets/biz/music-afrobeat-collective.jpg";
import bMaraLog from "@/assets/biz/biz-mara-logistics.jpg";
import bAtlasCap from "@/assets/biz/biz-atlas-capital.jpg";
import bNDTC from "@/assets/biz/biz-niger-delta-trade.jpg";
import bDakar from "@/assets/biz/biz-dakar-advisory.jpg";
import bUbuntu from "@/assets/biz/biz-ubuntu-ventures.jpg";
import bSavLegal from "@/assets/biz/biz-savanna-legal.jpg";
import bSahara from "@/assets/biz/auto-sahara-motors.jpg";
import bKiliEv from "@/assets/biz/auto-kilimanjaro-ev.jpg";
import bAtlasAuto from "@/assets/biz/auto-atlas-service.jpg";
import bCotonou from "@/assets/biz/auto-cotonou-bikes.jpg";
import bBaobabClass from "@/assets/biz/auto-baobab-classics.jpg";
import bJoziFleet from "@/assets/biz/auto-jozi-fleet.jpg";
import bAnyemi from "@/assets/biz/fashion-anyemi.jpg";
import bKaroo from "@/assets/biz/coffee-karoo.jpg";
import bSokoStudio from "@/assets/biz/design-soko-studio.jpg";
import bKintu from "@/assets/biz/hosp-kintu.jpg";
import bFreetown from "@/assets/biz/hosp-freetown-surf.jpg";
import bDouala from "@/assets/biz/hosp-douala-eats.jpg";
// New additions
import bTechFintech from "@/assets/biz/tech-lagos-fintech.jpg";
import bTechDC from "@/assets/biz/tech-datacenter.jpg";
import bMusicDakarDJ from "@/assets/biz/music-dakar-dj.jpg";
import bMusicVinyl from "@/assets/biz/music-vinyl-press.jpg";
import bBizConsult from "@/assets/biz/biz-consult.jpg";
import bBizSupply from "@/assets/biz/biz-supply.jpg";
import bAutoSuv from "@/assets/biz/auto-luxury-suv.jpg";
import bAutoCairo from "@/assets/biz/auto-cairo-taxi.jpg";
import bHospZanzibar from "@/assets/biz/hosp-zanzibar-hotel.jpg";
import bHospLagosBnb from "@/assets/biz/hosp-lagos-airbnb.jpg";
import bHospMarrakech from "@/assets/biz/hosp-marrakech-riad.jpg";
import bHospCpBnb from "@/assets/biz/hosp-capetown-airbnb.jpg";
import bHospSafari from "@/assets/biz/hosp-mara-safari.jpg";
import bRestLagos from "@/assets/biz/rest-lagos-jollof.jpg";
import bRestAddis from "@/assets/biz/rest-addis-injera.jpg";
import bRestMarrakech from "@/assets/biz/rest-marrakech-tagine.jpg";
import bRestJburg from "@/assets/biz/rest-jburg-braai.jpg";
import bRestNairobi from "@/assets/biz/rest-nairobi-rooftop.jpg";
import bRestDakar from "@/assets/biz/rest-dakar-seafood.jpg";
import bRestAccra from "@/assets/biz/rest-accra-waakye.jpg";
import bRestCairo from "@/assets/biz/rest-cairo-koshary.jpg";

export type FlipPage =
  | { kind: "image"; src: string; caption?: string }
  | {
      kind: "design";
      eyebrow?: string;
      title?: string;
      body?: string[];
      footer?: string;
      variant?: "cover" | "advert" | "toc" | "editorial" | "story" | "quote" | "back";
      image?: string;
      list?: { n: string; label: string; page: string }[];
    };

export type Issue = {
  slug: string;
  number: string;
  volume: string;
  title: string;
  blurb: string;
  date: string;
  cover: string;
  pages: FlipPage[];
  pdfUrl?: string;
};

export const ISSUES: Issue[] = [
  {
    slug: "issue-01",
    number: "01",
    volume: "Vol. I · MMXXVI",
    title: "The Builders Edition",
    blurb: "Founders, creators, and operators building across Africa.",
    date: "April 2026",
    cover: cover01,
    pdfUrl: "/issues/issue-01.pdf",
    pages: [
      { kind: "image", src: cover01, caption: "Cover" },
      {
        kind: "design",
        variant: "advert",
        eyebrow: "Advertisement",
        title: "Atlas Capital",
        body: [
          "Private credit. Built for the operators shaping the next decade of African business.",
        ],
        footer: "atlas-capital.africa",
      },
      {
        kind: "design",
        variant: "editorial",
        eyebrow: "Editor's Letter",
        title: "On building, quietly.",
        body: [
          "We started Growtiva because the most interesting story on the continent right now isn't being told loudly. It is being built — week by week, contract by contract, payroll by payroll.",
          "This first issue is a portrait of that work. Of the founders, designers, and operators who are choosing depth over noise. We are honored to publish them.",
        ],
        footer: "— The Editors",
      },
      {
        kind: "design",
        variant: "toc",
        eyebrow: "Inside Issue 01",
        title: "Contents",
        list: [
          { n: "01", label: "The Quiet Architects of Lagos", page: "p. 12" },
          { n: "02", label: "What We Wear When We Arrive", page: "p. 24" },
          { n: "03", label: "The New Economics of Staying", page: "p. 38" },
          { n: "04", label: "The Language of a New Canon", page: "p. 52" },
          { n: "05", label: "Field Notes from Five Cities", page: "p. 66" },
          { n: "06", label: "The Directory", page: "p. 78" },
        ],
      },
      {
        kind: "design",
        variant: "story",
        eyebrow: "Feature · Business",
        title: "The Quiet Architects of Lagos",
        body: [
          "On a Tuesday morning in Yaba, the air still tastes of last night's rain. Inside a converted warehouse, twelve people sit around a long oak table, talking about pricing tiers for a logistics product nobody outside their building has heard of.",
          "By the end of the year, it will move fifteen percent of inland freight in three states.",
        ],
        footer: "By Ada Okonkwo · 9 min",
      },
      { kind: "image", src: spreadFeature, caption: "Portrait — The Operators" },
      {
        kind: "design",
        variant: "quote",
        eyebrow: "On the record",
        body: [
          "“The market doesn't reward storytelling here. It rewards consistency. If you ship every week for five years, you win.”",
        ],
        footer: "— Tunde, B2B distribution, Surulere",
      },
      { kind: "image", src: spreadStill, caption: "Still Life — The Tools" },
      {
        kind: "design",
        variant: "story",
        eyebrow: "Feature · Lifestyle",
        title: "What We Wear When We Arrive",
        body: [
          "There is a specific kind of outfit that has begun showing up in the lobbies of hotels in Nairobi, Cape Town, Lagos and Kigali. Tailored, but not stiff. Considered, but not loud.",
          "It signals belonging without announcing arrival.",
        ],
        footer: "By Lerato Mokoena · 7 min",
      },
      { kind: "image", src: spreadPeople, caption: "Portrait — The Inner Circle" },
    ],
  },
  {
    slug: "issue-00",
    number: "00",
    volume: "Vol. 0 · MMXXVI",
    title: "The Starting Point",
    blurb: "A look at the mindset and ideas behind a new generation.",
    date: "January 2026",
    cover: cover00,
    pdfUrl: "/issues/issue-00.pdf",
    pages: [
      { kind: "image", src: cover00, caption: "Cover" },
      {
        kind: "design",
        variant: "editorial",
        eyebrow: "Prologue",
        title: "Why we are starting.",
        body: [
          "A short prologue about the magazine to come — its tone, its ambition, its readers.",
        ],
        footer: "— The Editors",
      },
      { kind: "image", src: portrait },
      { kind: "image", src: kenya },
      { kind: "image", src: nigeria },
      { kind: "image", src: cover00, caption: "Back Cover" },
    ],
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
      "Consider the trajectory of a single phrase. In late 2024, a Ghanaian comedian used the word \"sharp\" in a thirty-second clip. By mid-2025, it had become shorthand across West Africa for a particular kind of social precision—being aware, being on time, being the person who notices what others miss.",
      "This is not a unique story. It is the texture of how culture moves now.",
      "The old continental canon—built around named authors, named musicians, named festivals—is still there. It still matters. But running parallel to it is a faster, more diffuse canon, built out of fragments: lyrics, captions, references, in-jokes. It does not need permission to exist.",
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
      "The numbers tell part of the story. Senior software engineers in Lagos now command compensation packages that, when adjusted for cost of living and dollar exposure, begin to rival entry-level offers in Berlin or Toronto.",
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
  services: string;
  email?: string;
  phone?: string;
  url?: string;
  image: string;
};

export const BUSINESSES: Business[] = [
  // ============ Technology (6) ============
  { name: "Mara Cloud", category: "Technology", city: "Lagos", country: "Nigeria",
    blurb: "Pan-African cloud infrastructure for fast-growing teams.",
    services: "Cloud hosting, managed databases, edge compute, and 24/7 platform engineering support tailored to African startups.",
    email: "hello@maracloud.africa", phone: "+234 800 000 0001", url: "https://maracloud.africa", image: bMaraCloud },
  { name: "Soko Devices", category: "Technology", city: "Nairobi", country: "Kenya",
    blurb: "Hardware and IoT studio shipping connected devices.",
    services: "Industrial design, embedded software, certification, and small-batch manufacturing for African consumer hardware.",
    email: "studio@sokodevices.co", phone: "+254 700 000 002", image: bSokoDevices },
  { name: "Pyramid AI", category: "Technology", city: "Cairo", country: "Egypt",
    blurb: "Applied machine learning for the Arabic-speaking web.",
    services: "Custom NLP models, OCR for Arabic and African scripts, and ML deployment infrastructure.",
    email: "team@pyramid.ai", image: bPyramidAi },
  { name: "Kente Code", category: "Technology", city: "Accra", country: "Ghana",
    blurb: "Software studio building products for African businesses.",
    services: "Full-stack product development, mobile apps, and dedicated remote engineering pods.",
    email: "build@kentecode.com", phone: "+233 200 000 003", image: bKenteCode },
  { name: "Paystream", category: "Technology", city: "Kigali", country: "Rwanda",
    blurb: "Payments rails connecting African mobile money networks.",
    services: "Cross-border payouts, mobile money APIs, KYC, and merchant settlement across 12 African markets.",
    email: "hello@paystream.rw", phone: "+250 780 000 010", image: bPaystream },
  { name: "Baobab Security", category: "Technology", city: "Cape Town", country: "South Africa",
    blurb: "Cybersecurity operations for African enterprise.",
    services: "24/7 SOC monitoring, incident response, penetration testing, and managed detection across the continent.",
    email: "soc@baobabsec.co.za", image: bBaobabSec },

  // ============ Music (6) ============
  { name: "Asa Records", category: "Music", city: "Lagos", country: "Nigeria",
    blurb: "Independent label home to a new generation of Afro artists.",
    services: "A&R, distribution, publishing, and live tour production across West Africa and the diaspora.",
    email: "label@asarecords.ng", image: bAsaRecords },
  { name: "Highlife House", category: "Music", city: "Accra", country: "Ghana",
    blurb: "Studio and creative agency for Ghanaian music.",
    services: "Recording, mixing, mastering, music videos, and brand partnerships for highlife and afrobeats artists.",
    email: "hello@highlifehouse.gh", image: bHighlife },
  { name: "Cape Sound Lab", category: "Music", city: "Cape Town", country: "South Africa",
    blurb: "Boutique recording studio and mastering room.",
    services: "Analog tracking, hybrid mixing, and Dolby Atmos mastering for African and global artists.",
    email: "book@capesoundlab.co.za", image: bCapeSound },
  { name: "Kwaito Live", category: "Music", city: "Johannesburg", country: "South Africa",
    blurb: "Live event production and booking agency.",
    services: "Festival production, artist booking, sponsorship activation, and venue partnerships.",
    email: "live@kwaito.co.za", image: bKwaitoLive },
  { name: "Savanna Sounds", category: "Music", city: "Nairobi", country: "Kenya",
    blurb: "Nightlife brand and DJ collective for East Africa.",
    services: "Resident DJs, event curation, brand activations, and limited vinyl pressings.",
    email: "bookings@savannasounds.ke", image: bSavanna },
  { name: "Afrobeat Collective", category: "Music", city: "Lagos", country: "Nigeria",
    blurb: "Producer co-op crafting beats for global artists.",
    services: "Production, beat licensing, songwriting camps, and mentorship for emerging producers.",
    email: "studio@afrobeatcollective.com", image: bAfrobeat },

  // ============ Business (6) ============
  { name: "Mara Logistics", category: "Business", city: "Lagos", country: "Nigeria",
    blurb: "Inland freight infrastructure for fast-moving goods.",
    services: "Long-haul freight, last-mile delivery, fleet leasing, and supply chain analytics across Nigeria and Ghana.",
    email: "ops@maralogistics.africa", phone: "+234 800 000 0010", image: bMaraLog },
  { name: "Atlas Capital", category: "Business", city: "Casablanca", country: "Morocco",
    blurb: "Private credit for mid-market operators across the Maghreb.",
    services: "Working capital, growth debt, and structured finance for established African SMEs.",
    email: "deals@atlas-capital.africa", image: bAtlasCap },
  { name: "Niger Delta Trade Co.", category: "Business", city: "Port Harcourt", country: "Nigeria",
    blurb: "Commodity trading and export advisory.",
    services: "Sourcing, export documentation, quality control, and buyer matching for African agricultural commodities.",
    email: "trade@ndtc.ng", image: bNDTC },
  { name: "Dakar Advisory", category: "Business", city: "Dakar", country: "Senegal",
    blurb: "Strategy consultancy for francophone West Africa.",
    services: "Market entry, regulatory navigation, and growth strategy for businesses entering francophone markets.",
    email: "contact@dakaradvisory.com", image: bDakar },
  { name: "Ubuntu Ventures", category: "Business", city: "Cape Town", country: "South Africa",
    blurb: "Early-stage venture studio and accelerator.",
    services: "Pre-seed capital, co-working, founder coaching, and shared operations for African startups.",
    email: "team@ubuntuventures.co", image: bUbuntu },
  { name: "Savanna Legal", category: "Business", city: "Nairobi", country: "Kenya",
    blurb: "Boutique corporate law firm for growing companies.",
    services: "Corporate structuring, fundraising documentation, IP, and cross-border deal advisory.",
    email: "partners@savannalegal.ke", image: bSavLegal },

  // ============ Automobile (6) ============
  { name: "Sahara Motors", category: "Automobile", city: "Lagos", country: "Nigeria",
    blurb: "Premium pre-owned imports and concierge sales.",
    services: "Sourcing, importation, registration, and white-glove delivery of premium vehicles across Nigeria.",
    email: "sales@saharamotors.ng", phone: "+234 800 000 0020", image: bSahara },
  { name: "Kilimanjaro EV", category: "Automobile", city: "Nairobi", country: "Kenya",
    blurb: "Electric mobility for East Africa.",
    services: "EV imports, charging infrastructure, and fleet electrification for ride-hail and logistics operators.",
    email: "drive@kilimanjaro.ev", image: bKiliEv },
  { name: "Atlas Auto Service", category: "Automobile", city: "Marrakech", country: "Morocco",
    blurb: "European-trained service center for luxury vehicles.",
    services: "Service, diagnostics, parts, and restoration for European marques across North Africa.",
    email: "service@atlasauto.ma", image: bAtlasAuto },
  { name: "Cotonou Bikes", category: "Automobile", city: "Cotonou", country: "Benin",
    blurb: "Motorcycle distribution and financing for riders.",
    services: "Bike sales, work-to-own financing, training, and roadside support for commercial riders.",
    email: "ride@cotonoubikes.bj", image: bCotonou },
  { name: "Baobab Classics", category: "Automobile", city: "Dakar", country: "Senegal",
    blurb: "Restoration house for vintage African automobiles.",
    services: "Full restorations, sourcing, concours preparation, and private collection management.",
    email: "garage@baobabclassics.sn", image: bBaobabClass },
  { name: "Jozi Fleet", category: "Automobile", city: "Johannesburg", country: "South Africa",
    blurb: "Commercial fleet leasing for logistics operators.",
    services: "Long-term leasing, telematics, maintenance, and driver management for last-mile fleets.",
    email: "fleet@jozifleet.co.za", image: bJoziFleet },

  // ============ Other (existing categories preserved) ============
  { name: "Anyẹmi Atelier", category: "Fashion", city: "Accra", country: "Ghana",
    blurb: "Unstructured tailoring in locally woven cotton.",
    services: "Made-to-measure tailoring, ready-to-wear collections, and bespoke commissions for global clients.",
    email: "atelier@anyemi.gh", image: bAnyemi },
  { name: "Karoo & Co.", category: "Coffee", city: "Cape Town", country: "South Africa",
    blurb: "Specialty roastery sourcing single-origin African beans.",
    services: "Roasting, wholesale supply, café build-outs, and direct trade sourcing across the continent.",
    email: "hello@karoo.coffee", image: bKaroo },
  { name: "Soko Studio", category: "Design", city: "Nairobi", country: "Kenya",
    blurb: "Industrial design studio for African consumer brands.",
    services: "Brand identity, packaging design, product strategy, and prototyping.",
    email: "studio@sokodesign.co", image: bSokoStudio },
  { name: "Kintu Coffee Bar", category: "Hospitality", city: "Kampala", country: "Uganda",
    blurb: "Daytime café and evening listening room.",
    services: "Café service, private events, listening sessions, and cultural programming.",
    email: "hello@kintu.ug", image: bKintu },
  { name: "Freetown Surf Co.", category: "Hospitality", city: "Freetown", country: "Sierra Leone",
    blurb: "Beachfront retreat and surf school on the Atlantic.",
    services: "Boutique stays, surf coaching, retreats, and private group bookings.",
    email: "stay@freetownsurf.sl", image: bFreetown },
  { name: "Douala Eats", category: "Hospitality", city: "Douala", country: "Cameroon",
    blurb: "Modern Cameroonian restaurant group.",
    services: "Restaurants, catering, private dining, and culinary residencies.",
    email: "reservations@doualaeats.cm", image: bDouala },
];

export const COUNTRY_SLIDES = [
  { src: cityLagos, country: "Nigeria", place: "Lagos" },
  { src: cityNairobi, country: "Kenya", place: "Nairobi" },
  { src: cityCapetown, country: "South Africa", place: "Cape Town" },
  { src: cityMarrakech, country: "Morocco", place: "Marrakech" },
  { src: ghana, country: "Ghana", place: "Accra" },
  { src: cameroon, country: "Cameroon", place: "Douala" },
  { src: sierraleone, country: "Sierra Leone", place: "Freetown" },
  { src: benin, country: "Benin", place: "Cotonou" },
  { src: egypt, country: "Egypt", place: "Cairo" },
];

import { useEffect, useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { BUSINESSES, STORIES, ISSUES } from "@/data/content";
import { currencyFor } from "@/lib/currency";
import { slugify } from "@/lib/slug";

const COUNTRY_META: Record<string, { name: string; eyebrow: string; dek: string }> = {
  nigeria: {
    name: "Nigeria",
    eyebrow: "Country · West Africa",
    dek: "Operators, designers and writers shaping the most-watched commercial market on the continent.",
  },
  kenya: {
    name: "Kenya",
    eyebrow: "Country · East Africa",
    dek: "Capital, code and quiet ambition from Nairobi, Mombasa and the Rift.",
  },
  "south-africa": {
    name: "South Africa",
    eyebrow: "Country · Southern Africa",
    dek: "From Johannesburg boardrooms to Cape Town studios, the South African chapter.",
  },
  ghana: {
    name: "Ghana",
    eyebrow: "Country · West Africa",
    dek: "Accra-led design, music, and a rising operator class.",
  },
  morocco: {
    name: "Morocco",
    eyebrow: "Country · North Africa",
    dek: "Casablanca capital, Marrakech craft, and a Mediterranean-facing economy.",
  },
  egypt: {
    name: "Egypt",
    eyebrow: "Country · North Africa",
    dek: "Cairo's tech labs, classic taxis, and the Arabic-speaking African internet.",
  },
  senegal: {
    name: "Senegal",
    eyebrow: "Country · West Africa",
    dek: "Dakar's francophone strategy, music, and seafront economy.",
  },
};

const CountryPage = () => {
  const { country = "" } = useParams();
  const meta = COUNTRY_META[country.toLowerCase()];

  useEffect(() => {
    if (meta) document.title = `${meta.name} — Growtiva Africa`;
    window.scrollTo(0, 0);
  }, [meta]);

  const businesses = useMemo(
    () => (meta ? BUSINESSES.filter((b) => b.country === meta.name) : []),
    [meta]
  );
  const stories = useMemo(
    () =>
      meta
        ? STORIES.filter((s) =>
            s.tags?.some((t) => t.toLowerCase().includes(meta.name.toLowerCase())) ||
            s.paragraphs.some((p) => p.toLowerCase().includes(meta.name.toLowerCase()))
          )
        : [],
    [meta]
  );
  const issues = ISSUES;
  const cur = meta ? currencyFor(meta.name) : null;

  if (!meta) return <Navigate to="/" replace />;

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />

      <section className="pt-28 sm:pt-32 md:pt-40 pb-12 md:pb-20 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <Link to="/" className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-foreground/60 hover:text-foreground">
            <ArrowLeft size={14} /> Africa
          </Link>
          <span className="eyebrow block mt-8">{meta.eyebrow}</span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl mt-4 leading-[1.02]">{meta.name}</h1>
          <p className="mt-6 max-w-xl text-foreground/75 text-base sm:text-lg">{meta.dek}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-[11px] tracking-[0.22em] uppercase text-foreground/55">
            <span>{businesses.length} listings</span>
            <span>{stories.length} stories</span>
            {cur && <span>Currency · {cur.symbol} {cur.code}</span>}
          </div>
        </div>
      </section>

      {stories.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
            <span className="eyebrow">From the magazine</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-3 mb-8">Stories from {meta.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {stories.map((s) => (
                <Link key={s.slug} to={`/story/${s.slug}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden bg-foreground/5">
                    <img src={s.cover} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <span className="eyebrow text-accent mt-4 block">{s.category}</span>
                  <h3 className="font-serif text-2xl mt-2 group-hover:text-accent transition-colors">{s.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70 line-clamp-2">{s.dek}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {businesses.length > 0 && (
        <section className="py-16 md:py-24 bg-secondary/40 border-y border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
            <span className="eyebrow">Directory</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-3 mb-8">Businesses in {meta.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {businesses.map((b) => (
                <Link key={b.name} to={`/business/${slugify(b.name)}`}
                  className="group block bg-background border border-foreground/10 hover:border-foreground transition-colors">
                  <div className="aspect-[16/10] overflow-hidden bg-foreground/5">
                    <img src={b.image} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-foreground/55">
                      <span className="inline-flex items-center gap-1.5"><MapPin size={11} /> {b.city}</span>
                      {cur && <span className="text-accent">{cur.symbol}</span>}
                    </div>
                    <h3 className="font-serif text-xl mt-2 group-hover:text-accent transition-colors">{b.name}</h3>
                    <p className="text-sm text-foreground/70 mt-2 line-clamp-2">{b.blurb}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <span className="eyebrow">Issues featuring {meta.name}</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-3 mb-8">From the archive</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {issues.map((i) => (
              <Link key={i.slug} to={`/issues/${i.slug}`} className="group block">
                <div className="aspect-[3/4] overflow-hidden bg-foreground/5">
                  <img src={i.cover} alt={i.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="mt-3 text-[10px] tracking-[0.22em] uppercase text-foreground/55">№ {i.number} · {i.date}</div>
                <div className="font-serif text-lg mt-1 group-hover:text-accent transition-colors">{i.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CountryPage;

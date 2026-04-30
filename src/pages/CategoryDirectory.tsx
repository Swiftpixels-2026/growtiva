import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, MapPin, Map as MapIcon, List as ListIcon } from "lucide-react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import CityMap from "@/components/site/CityMap";
import { BUSINESSES } from "@/data/content";
import { slugify } from "@/lib/slug";

const CATEGORY_META: Record<string, { title: string; eyebrow: string; dek: string }> = {
  technology: {
    title: "Technology",
    eyebrow: "Sector 01",
    dek: "Cloud, AI, fintech, hardware and security studios shipping the African internet.",
  },
  music: {
    title: "Music",
    eyebrow: "Sector 02",
    dek: "Labels, studios, collectives and live producers shaping the continental sound.",
  },
  business: {
    title: "Business",
    eyebrow: "Sector 03",
    dek: "Operators, advisors and capital partners building durable companies.",
  },
  automobile: {
    title: "Automobile",
    eyebrow: "Sector 04",
    dek: "Dealers, fleets, EVs and restoration houses for a continent on the move.",
  },
  restaurant: {
    title: "Restaurant",
    eyebrow: "Sector 05",
    dek: "Tables worth booking — from heritage classics to modern fine dining.",
  },
  hospitality: {
    title: "Hospitality",
    eyebrow: "Sector 06",
    dek: "Hotels, riads, lodges and designer Airbnbs for the well-travelled.",
  },
};

const CategoryDirectory = () => {
  const { category = "" } = useParams();
  const meta = CATEGORY_META[category.toLowerCase()];
  const [country, setCountry] = useState<string>("All");
  const [view, setView] = useState<"list" | "map">("list");

  const all = useMemo(
    () => (meta ? BUSINESSES.filter((b) => b.category.toLowerCase() === meta.title.toLowerCase()) : []),
    [meta]
  );

  const countries = useMemo(() => {
    return ["All", ...Array.from(new Set(all.map((b) => b.country))).sort()];
  }, [all]);

  const featured = useMemo(() => all.slice(0, 3), [all]);
  const archive = useMemo(
    () => (country === "All" ? all : all.filter((b) => b.country === country)),
    [all, country]
  );

  useEffect(() => {
    if (meta) document.title = `${meta.title} Directory — Growtiva Africa`;
    window.scrollTo(0, 0);
  }, [meta]);

  if (!meta) return <Navigate to="/directory" replace />;

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 md:pt-40 pb-12 md:pb-20 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <Link to="/directory" className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-foreground/60 hover:text-foreground">
            <ArrowLeft size={14} /> Directory
          </Link>
          <span className="eyebrow block mt-8">{meta.eyebrow}</span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl mt-4 leading-[1.02]">{meta.title}</h1>
          <p className="mt-6 max-w-xl text-foreground/75 text-base sm:text-lg leading-relaxed">{meta.dek}</p>
          <div className="mt-6 text-[11px] tracking-[0.22em] uppercase text-foreground/50">
            {all.length} listings · {countries.length - 1} countries
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
            <div className="flex items-end justify-between mb-8 md:mb-12">
              <div>
                <span className="eyebrow">Editor's Picks</span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-3">Featured in {meta.title}</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {featured.map((b) => (
                <Link
                  key={b.name}
                  to={`/business/${slugify(b.name)}`}
                  className="group block"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-foreground/5">
                    <img
                      src={b.image}
                      alt={b.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-5">
                    <span className="eyebrow text-accent">{b.category}</span>
                    <h3 className="font-serif text-2xl md:text-3xl mt-2 group-hover:text-accent transition-colors">
                      {b.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/55 mt-2">
                      <MapPin size={12} /> {b.city}, {b.country}
                    </div>
                    <p className="mt-3 text-sm text-foreground/75 line-clamp-2">{b.blurb}</p>
                    {b.tags && b.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {b.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[9px] tracking-[0.18em] uppercase px-2 py-0.5 border border-foreground/20 text-foreground/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Country-filtered archive + map */}
      <section className="py-16 md:py-24 bg-secondary/40 border-y border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="eyebrow">Archive</span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-3">Browse by country</h2>
              </div>
              <div className="inline-flex border border-foreground/20 self-start">
                <button
                  onClick={() => setView("list")}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-[10px] tracking-[0.22em] uppercase transition-colors ${
                    view === "list" ? "bg-foreground text-background" : "hover:bg-foreground/5"
                  }`}
                >
                  <ListIcon size={14} /> List
                </button>
                <button
                  onClick={() => setView("map")}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-[10px] tracking-[0.22em] uppercase transition-colors border-l border-foreground/20 ${
                    view === "map" ? "bg-foreground text-background" : "hover:bg-foreground/5"
                  }`}
                >
                  <MapIcon size={14} /> Map
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {countries.map((c) => {
                const count = c === "All" ? all.length : all.filter((b) => b.country === c).length;
                const active = country === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCountry(c)}
                    className={`inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.22em] uppercase px-3 py-2 border transition-colors ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/30 hover:border-foreground"
                    }`}
                  >
                    <span>{c}</span>
                    <span
                      className={`text-[9px] tracking-normal px-1.5 py-0.5 rounded-sm ${
                        active ? "bg-background/20 text-background" : "bg-foreground/10 text-foreground/70"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {archive.length === 0 ? (
            <div className="border border-foreground/15 p-12 text-center bg-background">
              <p className="font-serif text-2xl">No listings yet</p>
            </div>
          ) : view === "map" ? (
            <CityMap businesses={archive} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {archive.map((b) => (
                <Link
                  key={b.name}
                  to={`/business/${slugify(b.name)}`}
                  className="group block bg-background border border-foreground/10 hover:border-foreground transition-colors"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-foreground/5">
                    <img
                      src={b.image}
                      alt={b.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-foreground/55">
                      <span>{b.city}, {b.country}</span>
                    </div>
                    <h3 className="font-serif text-xl mt-2 group-hover:text-accent transition-colors">{b.name}</h3>
                    <p className="text-sm text-foreground/70 mt-2 line-clamp-2">{b.blurb}</p>
                    {b.tags && b.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {b.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-[9px] tracking-[0.18em] uppercase px-2 py-0.5 border border-foreground/15 text-foreground/55">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CategoryDirectory;

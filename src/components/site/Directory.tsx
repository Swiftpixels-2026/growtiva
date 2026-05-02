import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Search, X, Map as MapIcon, List as ListIcon } from "lucide-react";
import { BUSINESSES } from "@/data/content";
import { slugify } from "@/lib/slug";
import CityMap from "./CityMap";

const FEATURED = ["Technology", "Music", "Business", "Automobile", "Restaurant", "Hospitality", "Fashion", "Coffee", "Design", "Education"];

const Directory = ({ embedded = false }: { embedded?: boolean }) => {
  const [filter, setFilter] = useState<string>("Technology");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "map">("list");
  const [form, setForm] = useState({ name: "", email: "", business: "", category: "", city: "", note: "" });

  const otherCategories = useMemo(
    () => Array.from(new Set(BUSINESSES.map((b) => b.category))).filter((c) => !FEATURED.includes(c)),
    []
  );
  const allCategories = [...FEATURED, ...otherCategories];

  // Search-aware base set (used to compute live counts per category)
  const searchMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BUSINESSES;
    return BUSINESSES.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.country.toLowerCase().includes(q) ||
        (b.tags ?? []).some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const b of searchMatches) map[b.category] = (map[b.category] ?? 0) + 1;
    return map;
  }, [searchMatches]);

  // Available tags for current category (Restaurant=cuisine, Hospitality=amenities)
  const tagsForCategory = useMemo(() => {
    if (filter !== "Restaurant" && filter !== "Hospitality") return [];
    const set = new Set<string>();
    for (const b of BUSINESSES) {
      if (b.category !== filter) continue;
      (b.tags ?? []).forEach((t) => set.add(t));
    }
    return Array.from(set).sort();
  }, [filter]);

  const tagCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const b of searchMatches) {
      if (b.category !== filter) continue;
      (b.tags ?? []).forEach((t) => (map[t] = (map[t] ?? 0) + 1));
    }
    return map;
  }, [searchMatches, filter]);

  const filtered = useMemo(() => {
    let base = searchMatches.filter((b) => b.category === filter);
    if (tag) base = base.filter((b) => (b.tags ?? []).includes(tag));
    return base;
  }, [filter, tag, searchMatches]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.business.trim()) {
      toast.error("Please complete the required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      toast.error("Please enter a valid email.");
      return;
    }
    toast.success("Application received. Our editors will be in touch.");
    setForm({ name: "", email: "", business: "", category: "", city: "", note: "" });
  };

  return (
    <section
      id="directory"
      className={`${embedded ? "py-24 md:py-48 bg-secondary/40 border-t border-foreground/10" : "pt-24 sm:pt-28 md:pt-36 pb-20 md:pb-32"}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-10 md:mb-16">
          <div>
            <span className="eyebrow">The Directory</span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl mt-4 md:mt-5 leading-[1.05]">Business Directory</h1>
          </div>
          <p className="max-w-md text-foreground/70 text-sm sm:text-base">
            A vetted index of African operators, makers, and studios shaping the modern continent.
          </p>
        </div>

        {/* Sticky filter bar (search + view toggle + categories) */}
        <div className="sticky top-16 md:top-20 z-30 -mx-4 sm:-mx-6 md:-mx-10 px-4 sm:px-6 md:px-10 py-3 md:py-4 bg-background/95 backdrop-blur-md border-b border-foreground/10 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.15)] mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-xl">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, city, or tag…"
                className="w-full bg-background border border-foreground/20 focus:border-foreground pl-10 pr-10 py-2.5 sm:py-3 outline-none text-sm placeholder:text-foreground/40 transition-colors"
                aria-label="Search the directory"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="inline-flex border border-foreground/20 self-start sm:self-auto">
              <button
                onClick={() => setView("list")}
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] tracking-[0.22em] uppercase transition-colors ${
                  view === "list" ? "bg-foreground text-background" : "hover:bg-foreground/5"
                }`}
                aria-pressed={view === "list"}
              >
                <ListIcon size={14} /> List
              </button>
              <button
                onClick={() => setView("map")}
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] tracking-[0.22em] uppercase transition-colors border-l border-foreground/20 ${
                  view === "map" ? "bg-foreground text-background" : "hover:bg-foreground/5"
                }`}
                aria-pressed={view === "map"}
              >
                <MapIcon size={14} /> Map
              </button>
            </div>
          </div>

          {/* Category filter chips — horizontal scroll on mobile, wrap on desktop */}
          <div className="mt-3 -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto sm:overflow-visible no-scrollbar">
            <div className="flex sm:flex-wrap gap-2 sm:gap-2.5 min-w-max sm:min-w-0 pr-4 sm:pr-0">
              {allCategories.map((c) => {
                const count = counts[c] ?? 0;
                const active = filter === c;
                return (
                  <button
                    key={c}
                    onClick={() => {
                      setFilter(c);
                      setTag(null);
                    }}
                    className={`shrink-0 inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.22em] uppercase whitespace-nowrap px-3 sm:px-4 py-2 border transition-colors ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/30 hover:border-foreground"
                    } ${count === 0 && query ? "opacity-50" : ""}`}
                  >
                    <span>{c}</span>
                    <span
                      className={`text-[9px] sm:text-[10px] tracking-normal px-1.5 py-0.5 rounded-sm ${
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
        </div>

        {/* Tag chips for Restaurant/Hospitality */}
        {tagsForCategory.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
            <span className="text-[10px] tracking-[0.22em] uppercase text-foreground/50 self-center mr-1">
              {filter === "Restaurant" ? "Cuisine" : "Amenities"}:
            </span>
            <button
              onClick={() => setTag(null)}
              className={`text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 border rounded-full transition-colors ${
                tag === null
                  ? "border-accent bg-accent/15 text-foreground"
                  : "border-foreground/20 hover:border-foreground/60"
              }`}
            >
              All
            </button>
            {tagsForCategory.map((t) => {
              const c = tagCounts[t] ?? 0;
              const active = tag === t;
              return (
                <button
                  key={t}
                  onClick={() => setTag(active ? null : t)}
                  className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 border rounded-full transition-colors ${
                    active
                      ? "border-accent bg-accent/15 text-foreground"
                      : "border-foreground/20 hover:border-foreground/60"
                  } ${c === 0 ? "opacity-50" : ""}`}
                >
                  <span>{t}</span>
                  <span className="text-[9px] text-foreground/55">({c})</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Result count */}
        <div className="mb-4 text-[11px] tracking-[0.22em] uppercase text-foreground/50">
          {filtered.length} {filtered.length === 1 ? "Listing" : "Listings"}
          {query && ` matching “${query}”`}
          {tag && ` · ${tag}`}
        </div>

        {filtered.length === 0 ? (
          <div className="border border-foreground/15 p-8 sm:p-12 text-center">
            <p className="font-serif text-xl sm:text-2xl">No matches found</p>
            <p className="text-sm text-foreground/60 mt-2">Try a different search term, tag, or category.</p>
          </div>
        ) : view === "map" ? (
          <CityMap businesses={filtered} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-foreground/15">
            {filtered.map((b) => (
              <Link
                key={b.name}
                to={`/business/${slugify(b.name)}`}
                className="group p-5 sm:p-7 md:p-8 border-r border-b border-foreground/15 hover:bg-foreground hover:text-background transition-colors duration-500 flex flex-col justify-between min-h-[200px] sm:min-h-[220px]"
              >
                <div>
                  <span className="eyebrow group-hover:text-background/60">{b.category}</span>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl mt-3 sm:mt-4">{b.name}</h3>
                  <p className="mt-2 sm:mt-3 text-sm opacity-80 max-w-[34ch]">{b.blurb}</p>
                  {b.tags && b.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {b.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] tracking-[0.18em] uppercase px-2 py-0.5 border border-current/30 opacity-70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-5 sm:mt-6 flex items-center justify-between text-[10px] sm:text-[11px] tracking-[0.22em] uppercase opacity-70">
                  <span className="truncate pr-2">{b.city}, {b.country}</span>
                  <span className="group-hover:text-accent transition-colors shrink-0">View →</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA: Apply to be listed */}
        <div className="mt-16 md:mt-24 grid grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="col-span-12 lg:col-span-5">
            <span className="eyebrow">Get Listed</span>
            <h3 className="font-serif text-3xl md:text-5xl mt-5 leading-[1.05]">
              Build something <span className="italic text-accent">remarkable</span>?
            </h3>
            <p className="mt-6 text-foreground/75 max-w-md leading-relaxed">
              We curate a small, intentional directory each issue. Tell us what you're building—we read every submission.
            </p>
          </div>

          <form onSubmit={submit} className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
            <input required maxLength={120} placeholder="Your name *" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 transition-colors" />
            <input required type="email" maxLength={255} placeholder="Email *" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 transition-colors" />
            <input required maxLength={120} placeholder="Business name *" value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 transition-colors" />
            <input maxLength={120} placeholder="Category" value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 transition-colors" />
            <input maxLength={120} placeholder="City, Country" value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="md:col-span-2 bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 transition-colors" />
            <textarea maxLength={1000} rows={3} placeholder="Tell us what you're building" value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="md:col-span-2 bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 resize-none transition-colors" />
            <button type="submit"
              className="md:col-span-2 mt-4 inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors w-full sm:w-fit">
              Apply for Listing →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Directory;

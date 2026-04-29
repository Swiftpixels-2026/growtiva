import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Search, X } from "lucide-react";
import { BUSINESSES } from "@/data/content";
import { slugify } from "@/lib/slug";

const FEATURED = ["Technology", "Music", "Business", "Automobile", "Restaurant", "Hospitality"];

const Directory = ({ embedded = false }: { embedded?: boolean }) => {
  const [filter, setFilter] = useState<string>("Technology");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ name: "", email: "", business: "", category: "", city: "", note: "" });

  const otherCategories = useMemo(
    () => Array.from(new Set(BUSINESSES.map((b) => b.category))).filter((c) => !FEATURED.includes(c)),
    []
  );
  const allCategories = [...FEATURED, ...otherCategories];

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const b of BUSINESSES) map[b.category] = (map[b.category] ?? 0) + 1;
    return map;
  }, []);

  const filtered = useMemo(() => {
    const base = BUSINESSES.filter((b) => b.category === filter);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.country.toLowerCase().includes(q)
    );
  }, [filter, query]);

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
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mt-4 md:mt-5 leading-[1.05]">Business Directory</h1>
          </div>
          <p className="max-w-md text-foreground/70 text-sm sm:text-base">
            A vetted index of African operators, makers, and studios shaping the modern continent.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-6 md:mb-8 max-w-xl">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, city, or country…"
            className="w-full bg-background border border-foreground/20 focus:border-foreground pl-10 pr-10 py-3 outline-none text-sm placeholder:text-foreground/40 transition-colors"
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

        {/* Filters with counts */}
        <div className="flex flex-wrap gap-2 mb-8 md:mb-12">
          {allCategories.map((c) => {
            const count = counts[c] ?? 0;
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.22em] uppercase px-3 sm:px-4 py-2 border transition-colors ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/30 hover:border-foreground"
                }`}
              >
                <span>{c}</span>
                <span className={`text-[9px] sm:text-[10px] tracking-normal px-1.5 py-0.5 rounded-sm ${active ? "bg-background/20 text-background" : "bg-foreground/10 text-foreground/70"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Result count */}
        <div className="mb-4 text-[11px] tracking-[0.22em] uppercase text-foreground/50">
          {filtered.length} {filtered.length === 1 ? "Listing" : "Listings"}
          {query && ` matching “${query}”`}
        </div>

        {filtered.length === 0 ? (
          <div className="border border-foreground/15 p-12 text-center">
            <p className="font-serif text-2xl">No matches found</p>
            <p className="text-sm text-foreground/60 mt-2">Try a different search term or category.</p>
          </div>
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

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { X, Mail, Phone, Globe, MapPin } from "lucide-react";
import { BUSINESSES, type Business } from "@/data/content";

const FEATURED = ["All", "Technology", "Music", "Business", "Automobile"];

const Directory = ({ embedded = false }: { embedded?: boolean }) => {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<Business | null>(null);
  const [form, setForm] = useState({ name: "", email: "", business: "", category: "", city: "", note: "" });

  const otherCategories = useMemo(
    () => Array.from(new Set(BUSINESSES.map((b) => b.category))).filter((c) => !FEATURED.includes(c)),
    []
  );
  const allCategories = [...FEATURED, ...otherCategories];

  const filtered = filter === "All" ? BUSINESSES : BUSINESSES.filter((b) => b.category === filter);

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
      className={`${embedded ? "py-32 md:py-48 bg-secondary/40 border-t border-foreground/10" : "pt-28 md:pt-36 pb-24 md:pb-32"}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-12 md:mb-16">
          <div>
            <span className="eyebrow">The Directory</span>
            <h1 className="font-serif text-4xl md:text-6xl mt-4 md:mt-5">Business Directory</h1>
          </div>
          <p className="max-w-md text-foreground/70">
            A vetted index of African operators, makers, and studios shaping the modern continent.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 md:mb-12">
          {allCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-[10px] sm:text-[11px] tracking-[0.22em] uppercase px-3 sm:px-4 py-2 border transition-colors ${
                filter === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/30 hover:border-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-foreground/15">
          {filtered.map((b) => (
            <button
              key={b.name}
              onClick={() => setActive(b)}
              className="group p-6 sm:p-8 border-r border-b border-foreground/15 hover:bg-foreground hover:text-background transition-colors duration-500 flex flex-col justify-between min-h-[220px] text-left"
            >
              <div>
                <span className="eyebrow group-hover:text-background/60">{b.category}</span>
                <h3 className="font-serif text-2xl md:text-3xl mt-4">{b.name}</h3>
                <p className="mt-3 text-sm opacity-80 max-w-[34ch]">{b.blurb}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-[10px] sm:text-[11px] tracking-[0.22em] uppercase opacity-70">
                <span>{b.city}, {b.country}</span>
                <span className="group-hover:text-accent transition-colors">View →</span>
              </div>
            </button>
          ))}
        </div>

        {/* CTA: Apply to be listed */}
        <div className="mt-20 md:mt-24 grid grid-cols-12 gap-8 md:gap-16 items-start">
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

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[110] bg-foreground/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fade-up"
          onClick={() => setActive(null)}
        >
          <div
            className="relative bg-background w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:text-accent"
            >
              <X size={22} />
            </button>
            <div className="aspect-[16/9] w-full overflow-hidden bg-foreground/5">
              <img src={active.image} alt={active.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 sm:p-10">
              <span className="eyebrow text-accent">{active.category}</span>
              <h2 className="font-serif text-3xl md:text-5xl mt-3 leading-[1.05]">{active.name}</h2>
              <div className="flex items-center gap-2 mt-3 text-sm text-foreground/60">
                <MapPin size={14} /> {active.city}, {active.country}
              </div>
              <div className="h-px w-12 bg-accent mt-6 mb-6" />
              <p className="text-foreground/80 leading-relaxed">{active.blurb}</p>
              <h3 className="font-serif text-lg mt-8 mb-2">Services</h3>
              <p className="text-foreground/75 leading-relaxed">{active.services}</p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                {active.email && (
                  <a href={`mailto:${active.email}`} className="flex items-center gap-2 link-underline w-fit">
                    <Mail size={14} /> {active.email}
                  </a>
                )}
                {active.phone && (
                  <a href={`tel:${active.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 link-underline w-fit">
                    <Phone size={14} /> {active.phone}
                  </a>
                )}
                {active.url && (
                  <a href={active.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 link-underline w-fit">
                    <Globe size={14} /> Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Directory;

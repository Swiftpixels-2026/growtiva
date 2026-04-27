import { useState } from "react";
import { toast } from "sonner";
import { BUSINESSES } from "@/data/content";

const Directory = () => {
  const [filter, setFilter] = useState<string>("All");
  const [form, setForm] = useState({ name: "", email: "", business: "", category: "", city: "", note: "" });

  const categories = ["All", ...Array.from(new Set(BUSINESSES.map((b) => b.category)))];
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
    <section id="directory" className="py-32 md:py-48 bg-secondary/40 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <span className="eyebrow">The Directory</span>
            <h2 className="font-serif text-4xl md:text-6xl mt-5">Business Directory</h2>
          </div>
          <p className="max-w-md text-foreground/70">
            A vetted index of African operators, makers, and studios shaping the modern continent.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-[11px] tracking-[0.22em] uppercase px-4 py-2 border transition-colors ${
                filter === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/30 hover:border-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-foreground/15">
          {filtered.map((b) => (
            <a
              key={b.name}
              href={b.url}
              className="group p-8 border-r border-b border-foreground/15 hover:bg-foreground hover:text-background transition-colors duration-500 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <span className="eyebrow group-hover:text-background/60">{b.category}</span>
                <h3 className="font-serif text-2xl md:text-3xl mt-4">{b.name}</h3>
                <p className="mt-3 text-sm opacity-80 max-w-[34ch]">{b.blurb}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-[11px] tracking-[0.22em] uppercase opacity-70">
                <span>{b.city}, {b.country}</span>
                <span className="group-hover:text-accent transition-colors">Visit →</span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA: Apply to be listed */}
        <div className="mt-24 grid grid-cols-12 gap-10 md:gap-16 items-start">
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
            <input
              required
              maxLength={120}
              placeholder="Your name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 transition-colors"
            />
            <input
              required
              type="email"
              maxLength={255}
              placeholder="Email *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 transition-colors"
            />
            <input
              required
              maxLength={120}
              placeholder="Business name *"
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 transition-colors"
            />
            <input
              maxLength={120}
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 transition-colors"
            />
            <input
              maxLength={120}
              placeholder="City, Country"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="md:col-span-2 bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 transition-colors"
            />
            <textarea
              maxLength={1000}
              rows={3}
              placeholder="Tell us what you're building"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="md:col-span-2 bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 resize-none transition-colors"
            />
            <button
              type="submit"
              className="md:col-span-2 mt-6 inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors w-full sm:w-fit"
            >
              Apply for Listing →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Directory;

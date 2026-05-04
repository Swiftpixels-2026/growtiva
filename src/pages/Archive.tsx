import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { ISSUES } from "@/data/content";
import { useIssueReader } from "@/components/site/IssuesProvider";

const yearOf = (date: string) => {
  const m = date.match(/\b(19|20)\d{2}\b/);
  return m ? m[0] : "—";
};

const Archive = () => {
  const { open } = useIssueReader();
  const [year, setYear] = useState<string>("All");
  const [theme, setTheme] = useState<string>("All");

  useEffect(() => {
    document.title = "The Archive — Growtiva Africa";
  }, []);

  const years = useMemo(
    () => ["All", ...Array.from(new Set(ISSUES.map((i) => yearOf(i.date)))).sort().reverse()],
    [],
  );
  const themes = useMemo(
    () => ["All", ...Array.from(new Set(ISSUES.map((i) => i.title.split(" ")[1] ?? i.title))).sort()],
    [],
  );

  const filtered = ISSUES.filter((i) => {
    const yOk = year === "All" || yearOf(i.date) === year;
    const tOk = theme === "All" || i.title.includes(theme);
    return yOk && tOk;
  });

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />

      <section className="pt-28 sm:pt-32 md:pt-40 pb-12 md:pb-16 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <Link to="/" className="eyebrow link-underline">← Growtiva</Link>
          <span className="eyebrow block mt-10">The Archive</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mt-5 leading-[1.02]">
            Every cover. Every issue.
          </h1>
          <p className="mt-7 max-w-xl text-foreground/70 text-base md:text-lg leading-relaxed">
            A chronological wall of every Growtiva Africa edition — filterable by year and theme. Click any cover to open the digital edition.
          </p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-background/90 backdrop-blur-md border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-4 flex flex-wrap items-center gap-3 md:gap-6">
          <span className="eyebrow shrink-0">Filter</span>

          <div className="flex flex-wrap gap-2">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`text-[11px] tracking-[0.18em] uppercase px-3 py-1.5 border transition-colors ${
                  year === y
                    ? "bg-foreground text-background border-foreground"
                    : "border-foreground/20 hover:border-foreground"
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          <span className="hidden md:inline h-4 w-px bg-foreground/20" />

          <div className="flex flex-wrap gap-2">
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`text-[11px] tracking-[0.18em] uppercase px-3 py-1.5 border transition-colors ${
                  theme === t
                    ? "bg-foreground text-background border-foreground"
                    : "border-foreground/20 hover:border-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <span className="ml-auto text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "issue" : "issues"}
          </span>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          {filtered.length === 0 ? (
            <p className="text-foreground/60 text-center py-20">No issues match those filters.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-16">
              {filtered.map((issue) => (
                <button
                  key={issue.slug}
                  onClick={() => open(issue.slug)}
                  className="group text-left"
                >
                  <div className="overflow-hidden bg-foreground/5 aspect-[3/4] shadow-[0_20px_40px_-20px_rgba(11,11,12,0.25)]">
                    <img
                      src={issue.cover}
                      alt={`Issue ${issue.number} — ${issue.title}`}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="eyebrow">Issue {issue.number}</span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      {yearOf(issue.date)}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg md:text-xl mt-2 leading-snug group-hover:text-accent transition-colors">
                    {issue.title}
                  </h3>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Archive;

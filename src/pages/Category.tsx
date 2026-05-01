import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { STORIES } from "@/data/content";

const titles: Record<string, { eyebrow: string; title: string; dek: string }> = {
  business: {
    eyebrow: "Section 01",
    title: "Business",
    dek: "Builders, operators, and the systems behind growth across the continent.",
  },
  lifestyle: {
    eyebrow: "Section 02",
    title: "Lifestyle",
    dek: "How ambitious Africans live, work, and design their lives.",
  },
  culture: {
    eyebrow: "Section 03",
    title: "Culture",
    dek: "Voices, trends, and ideas shaping identity.",
  },
  money: {
    eyebrow: "Section 04",
    title: "Money",
    dek: "Wealth, access, and financial intelligence for a new generation.",
  },
};

const Category = () => {
  const { slug = "" } = useParams();
  const meta = titles[slug];
  const stories = STORIES.filter((s) => s.category === slug);

  useEffect(() => {
    if (meta) document.title = `${meta.title} — Growtiva Africa`;
  }, [meta]);

  if (!meta) {
    return (
      <main className="bg-background text-foreground min-h-screen">
        <Nav />
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-10 py-20 sm:py-28 md:py-40 text-center">
          <h1 className="font-serif text-5xl">Section not found</h1>
          <Link to="/" className="link-underline mt-8 inline-block">Return home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground">
      <Nav />
      <section className="pt-36 md:pt-44 pb-16 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <Link to="/" className="eyebrow link-underline">← Growtiva</Link>
          <span className="eyebrow block mt-10">{meta.eyebrow}</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mt-5">
            {meta.title}
          </h1>
          <p className="mt-8 max-w-xl text-foreground/75 text-lg leading-relaxed">
            {meta.dek}
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          {stories.length === 0 ? (
            <p className="text-foreground/60">New stories landing soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
              {stories.map((s) => (
                <Link
                  to={`/story/${s.slug}`}
                  key={s.slug}
                  className="group block"
                >
                  <div className="overflow-hidden bg-foreground/5 aspect-[4/5]">
                    <img
                      src={s.cover}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                      loading="lazy"
                      width={1024}
                      height={1280}
                    />
                  </div>
                  <div className="mt-8 flex items-baseline justify-between">
                    <span className="eyebrow">{meta.title}</span>
                    <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                      {s.readTime}
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl mt-4 group-hover:text-accent transition-colors">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-foreground/70 max-w-md">{s.dek}</p>
                  <span className="mt-6 inline-block text-[11px] tracking-[0.22em] uppercase link-underline">
                    Read story →
                  </span>
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

export default Category;

import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { AUTHORS, STORIES } from "@/data/content";

const Author = () => {
  const { slug = "" } = useParams();
  const author = AUTHORS.find((a) => a.slug === slug);
  const stories = STORIES.filter((s) => s.authorSlug === slug);

  useEffect(() => {
    if (author) document.title = `${author.name} — Growtiva Africa`;
  }, [author]);

  if (!author) {
    return (
      <main className="bg-background text-foreground min-h-screen">
        <Nav />
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-10 py-32 text-center">
          <h1 className="font-serif text-5xl">Writer not found</h1>
          <Link to="/" className="link-underline mt-8 inline-block">Return home</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground">
      <Nav />

      <section className="pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-20 border-b border-foreground/10">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-12 gap-8 md:gap-14 items-start md:items-end">
          <div className="col-span-12 md:col-span-5">
            <img
              src={author.portrait}
              alt={author.name}
              className="w-44 h-44 md:w-full md:h-auto md:aspect-[4/5] object-cover rounded-full md:rounded-none shadow-[0_30px_60px_-20px_rgba(11,11,12,0.25)]"
            />
          </div>
          <div className="col-span-12 md:col-span-7">
            <span className="eyebrow">Contributor</span>
            <h1 className="font-serif text-4xl md:text-6xl mt-4 leading-[1.05]">{author.name}</h1>
            <p className="mt-3 text-foreground/60 text-sm md:text-base">
              {author.role}{author.city ? ` · ${author.city}` : ""}
            </p>
            <p className="mt-7 text-foreground/80 leading-relaxed max-w-xl text-base md:text-lg">
              {author.bio}
            </p>
            {author.twitter && (
              <a
                href={`https://twitter.com/${author.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-block link-underline text-[12px] tracking-[0.22em] uppercase"
              >
                @{author.twitter}
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <div>
              <span className="eyebrow">Archive</span>
              <h2 className="font-serif text-3xl md:text-5xl mt-3">
                {stories.length} {stories.length === 1 ? "story" : "stories"}
              </h2>
            </div>
          </div>

          {stories.length === 0 ? (
            <p className="text-foreground/60">No published stories yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {stories.map((s) => (
                <Link key={s.slug} to={`/story/${s.slug}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden bg-foreground/5">
                    <img
                      src={s.cover}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-6 flex items-baseline justify-between">
                    <span className="eyebrow">{s.category}</span>
                    <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                      {s.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl mt-4 group-hover:text-accent transition-colors leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-foreground/70 max-w-md">{s.dek}</p>
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

export default Author;

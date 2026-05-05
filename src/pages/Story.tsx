import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { STORIES, AUTHORS, ISSUES } from "@/data/content";

const Story = () => {
  const { slug = "" } = useParams();
  const story = STORIES.find((s) => s.slug === slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (story) document.title = `${story.title} — Growtiva Africa`;
  }, [story]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(100, (h.scrollTop / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!story) {
    return (
      <main className="bg-background text-foreground min-h-screen">
        <Nav />
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-10 py-20 sm:py-28 md:py-40 text-center">
          <h1 className="font-serif text-5xl">Story not found</h1>
          <Link to="/" className="link-underline mt-8 inline-block">Return home</Link>
        </div>
      </main>
    );
  }

  const author = story.authorSlug ? AUTHORS.find((a) => a.slug === story.authorSlug) : null;
  const issue = story.issueSlug ? ISSUES.find((i) => i.slug === story.issueSlug) : null;
  const related = (story.relatedSlugs ?? [])
    .map((s) => STORIES.find((x) => x.slug === s))
    .filter(Boolean) as typeof STORIES;

  // Show ~50% of the story
  const half = Math.max(1, Math.ceil(story.paragraphs.length / 2));
  const visible = story.paragraphs.slice(0, half);
  const remaining = story.paragraphs.length - visible.length;

  // Insert pull quote after paragraph index ~2
  const pullIdx = Math.min(2, Math.max(1, visible.length - 1));

  return (
    <main className="bg-background text-foreground">
      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-foreground/10 z-[60]">
        <div
          className="h-full bg-accent transition-[width] duration-150"
          style={{ width: `${progress}%` }}
          aria-hidden
        />
      </div>

      <Nav />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-10 text-center">
          <Link to={`/category/${story.category}`} className="eyebrow link-underline">
            ← {story.category}
          </Link>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mt-8 leading-[1.05]">
            {story.title}
          </h1>
          <p className="mt-8 text-lg md:text-xl text-foreground/70 italic max-w-2xl mx-auto leading-relaxed">
            {story.dek}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
            {author ? (
              <Link to={`/author/${author.slug}`} className="link-underline text-foreground/80">
                By {author.name}
              </Link>
            ) : (
              <span>By {story.author}</span>
            )}
            <span className="hidden sm:inline h-px w-10 bg-foreground/30" />
            <span>{story.readTime}</span>
            {story.publishedAt && (
              <>
                <span className="hidden sm:inline h-px w-10 bg-foreground/30" />
                <span>{story.publishedAt}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Hero image with caption */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10">
        <figure>
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={story.cover}
              alt={story.title}
              className="w-full h-full object-cover"
              width={1600}
              height={900}
            />
          </div>
          {story.coverCredit && (
            <figcaption className="mt-3 text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
              {story.coverCredit}
            </figcaption>
          )}
        </figure>
      </div>

      {/* Audio version */}
      {story.audioUrl && (
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10 mt-8">
          <div className="border border-foreground/15 p-5 sm:p-6 bg-secondary/40">
            <div className="flex items-center justify-between mb-3">
              <span className="eyebrow">Listen to this story</span>
              <span className="text-[11px] tracking-[0.18em] uppercase text-foreground/55">{story.readTime}</span>
            </div>
            <audio controls preload="none" src={story.audioUrl} className="w-full">
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      )}

      {/* Body */}
      <article className="py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-12 gap-8 md:gap-12">
          {/* Sidenote rail (desktop) */}
          <aside className="hidden lg:block col-span-3">
            {story.sidenote && (
              <div className="sticky top-32 border-l border-foreground/15 pl-5">
                <span className="eyebrow block">{story.sidenote.label}</span>
                <p className="mt-3 text-[13px] leading-[1.7] text-foreground/65">
                  {story.sidenote.body}
                </p>
              </div>
            )}
          </aside>

          <div className="col-span-12 lg:col-span-9">
            <div className="max-w-[680px] mx-auto lg:mx-0">
              {visible.map((p, idx) => (
                <div key={idx}>
                  <p
                    className={`text-foreground/85 leading-[1.85] text-lg ${
                      idx === 0
                        ? "first-letter:font-serif first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:mt-1"
                        : "mt-7"
                    }`}
                  >
                    {p}
                  </p>

                  {story.pullQuote && idx === pullIdx && (
                    <figure className="my-12 md:my-14 border-y border-foreground/15 py-10">
                      <blockquote className="font-serif text-2xl md:text-4xl leading-[1.2] text-foreground italic">
                        “{story.pullQuote.text}”
                      </blockquote>
                      {story.pullQuote.attribution && (
                        <figcaption className="mt-5 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
                          — {story.pullQuote.attribution}
                        </figcaption>
                      )}
                    </figure>
                  )}

                  {/* Sidenote inline on mobile */}
                  {story.sidenote && idx === 0 && (
                    <aside className="lg:hidden mt-8 border-l-2 border-accent pl-4 py-2 bg-secondary/40">
                      <span className="eyebrow block">{story.sidenote.label}</span>
                      <p className="mt-2 text-sm leading-[1.7] text-foreground/70">
                        {story.sidenote.body}
                      </p>
                    </aside>
                  )}
                </div>
              ))}

              {/* Tags */}
              {story.tags && story.tags.length > 0 && (
                <div className="mt-14 flex flex-wrap gap-2">
                  {story.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] tracking-[0.18em] uppercase border border-foreground/20 px-3 py-1.5 text-foreground/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Paywall / continue */}
              {remaining > 0 && (
                <div className="mt-16 relative">
                  <div className="border-t border-foreground/15 pt-12 text-center">
                    <span className="eyebrow">Continue Reading</span>
                    <h3 className="font-serif text-3xl md:text-4xl mt-5 max-w-md mx-auto leading-tight">
                      The other half of this story lives in{" "}
                      <span className="italic text-accent">
                        {issue ? `Issue ${issue.number}` : "the Issue"}
                      </span>
                      .
                    </h3>
                    <p className="mt-5 text-foreground/65 max-w-md mx-auto">
                      {remaining} more {remaining === 1 ? "passage" : "passages"} await — read the full piece inside the digital edition.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        to={issue ? `/issues/${issue.slug}` : "/#latest"}
                        className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors"
                      >
                        Read in the Magazine
                      </Link>
                      <button
                        onClick={() => {
                          toast.success("Saved. We'll email you when the full story drops.");
                        }}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 text-[12px] tracking-[0.22em] uppercase border border-foreground hover:bg-foreground hover:text-background transition-colors"
                      >
                        Notify Me
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Author byline card */}
      {author && (
        <section className="border-t border-foreground/10 py-16 md:py-20 bg-secondary/40">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col sm:flex-row gap-8 items-start sm:items-center">
            <img
              src={author.portrait}
              alt={author.name}
              className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="eyebrow">About the writer</span>
              <h3 className="font-serif text-2xl md:text-3xl mt-2">{author.name}</h3>
              <p className="text-sm text-foreground/60 mt-1">{author.role}{author.city ? ` · ${author.city}` : ""}</p>
              <p className="mt-4 text-foreground/75 leading-relaxed">{author.bio}</p>
              <Link to={`/author/${author.slug}`} className="mt-5 inline-block link-underline text-[12px] tracking-[0.2em] uppercase">
                More from {author.name.split(" ")[0]} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 md:py-28 border-t border-foreground/10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <div>
                <span className="eyebrow">In this issue</span>
                <h2 className="font-serif text-3xl md:text-5xl mt-4">Keep reading</h2>
              </div>
              <Link to="/archive" className="hidden sm:inline-block link-underline text-[12px] tracking-[0.22em] uppercase">
                The archive →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {related.map((r) => (
                <Link key={r.slug} to={`/story/${r.slug}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden bg-foreground/5">
                    <img src={r.cover} alt={r.title} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]" loading="lazy" />
                  </div>
                  <span className="eyebrow block mt-5">{r.category}</span>
                  <h3 className="font-serif text-xl md:text-2xl mt-3 group-hover:text-accent transition-colors leading-snug">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-sm text-foreground/65 line-clamp-2">{r.dek}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default Story;

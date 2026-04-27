import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { STORIES } from "@/data/content";

const Story = () => {
  const { slug = "" } = useParams();
  const story = STORIES.find((s) => s.slug === slug);

  useEffect(() => {
    if (story) document.title = `${story.title} — Growtiva Africa`;
  }, [story]);

  if (!story) {
    return (
      <main className="bg-background text-foreground min-h-screen">
        <Nav />
        <div className="max-w-[800px] mx-auto px-6 py-48 text-center">
          <h1 className="font-serif text-5xl">Story not found</h1>
          <Link to="/" className="link-underline mt-8 inline-block">Return home</Link>
        </div>
      </main>
    );
  }

  // Show ~50% of the story
  const half = Math.max(1, Math.ceil(story.paragraphs.length / 2));
  const visible = story.paragraphs.slice(0, half);
  const remaining = story.paragraphs.length - visible.length;

  return (
    <main className="bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="pt-36 md:pt-44 pb-16">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
          <Link to={`/category/${story.category}`} className="eyebrow link-underline">
            ← {story.category}
          </Link>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mt-8 leading-[1.05]">
            {story.title}
          </h1>
          <p className="mt-8 text-lg md:text-xl text-foreground/70 italic max-w-2xl mx-auto leading-relaxed">
            {story.dek}
          </p>
          <div className="mt-10 flex items-center justify-center gap-6 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
            <span>By {story.author}</span>
            <span className="h-px w-10 bg-foreground/30" />
            <span>{story.readTime}</span>
          </div>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={story.cover}
            alt={story.title}
            className="w-full h-full object-cover"
            width={1600}
            height={900}
          />
        </div>
      </div>

      {/* Body — 50% */}
      <article className="py-20 md:py-28">
        <div className="max-w-[680px] mx-auto px-6 md:px-10">
          {visible.map((p, idx) => (
            <p
              key={idx}
              className={`text-foreground/85 leading-[1.85] text-lg ${
                idx === 0
                  ? "first-letter:font-serif first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:mt-1"
                  : "mt-7"
              }`}
            >
              {p}
            </p>
          ))}

          {/* Paywall / continue */}
          <div className="mt-14 relative">
            <div className="h-32 -mt-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
            <div className="border-t border-foreground/15 pt-12 text-center">
              <span className="eyebrow">Continue Reading</span>
              <h3 className="font-serif text-3xl md:text-4xl mt-5 max-w-md mx-auto leading-tight">
                The other half of this story lives in <span className="italic text-accent">Issue {story.category === "business" ? "01" : "01"}</span>.
              </h3>
              <p className="mt-5 text-foreground/65 max-w-md mx-auto">
                {remaining} more {remaining === 1 ? "passage" : "passages"} await — read the full piece inside the digital edition, or subscribe to be notified when the next issue lands.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/#latest"
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
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default Story;

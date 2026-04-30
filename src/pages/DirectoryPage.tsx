import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Directory from "@/components/site/Directory";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const SECTORS = [
  { slug: "technology", label: "Technology" },
  { slug: "music", label: "Music" },
  { slug: "business", label: "Business" },
  { slug: "automobile", label: "Automobile" },
  { slug: "restaurant", label: "Restaurant" },
  { slug: "hospitality", label: "Hospitality" },
];

const DirectoryPage = () => {
  useEffect(() => {
    document.title = "Business Directory — Growtiva Africa";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "A vetted directory of African businesses across Technology, Music, Business, Automobile, Restaurant, and Hospitality."
    );
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Directory />

      {/* Sector landing-page index */}
      <section className="py-16 md:py-24 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <span className="eyebrow">Sector pages</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-3 mb-8">
            Explore each sector in depth
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {SECTORS.map((s) => (
              <Link
                key={s.slug}
                to={`/directory/${s.slug}`}
                className="group p-5 border border-foreground/15 hover:bg-foreground hover:text-background transition-colors"
              >
                <div className="font-serif text-lg md:text-xl">{s.label}</div>
                <div className="mt-2 text-[10px] tracking-[0.22em] uppercase opacity-60 group-hover:opacity-100">
                  Open page →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default DirectoryPage;

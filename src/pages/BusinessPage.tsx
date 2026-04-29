import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Mail, Phone, Globe, MapPin, ArrowLeft } from "lucide-react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { BUSINESSES } from "@/data/content";
import { slugify } from "@/lib/slug";

const BusinessPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const business = useMemo(
    () => BUSINESSES.find((b) => slugify(b.name) === slug),
    [slug]
  );

  const related = useMemo(
    () =>
      business
        ? BUSINESSES.filter(
            (b) => b.category === business.category && b.name !== business.name
          ).slice(0, 3)
        : [],
    [business]
  );

  useEffect(() => {
    if (!business) return;
    document.title = `${business.name} — Growtiva Directory`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", `${business.name} — ${business.blurb}`);
    window.scrollTo(0, 0);
  }, [business]);

  if (!business) {
    return (
      <main className="bg-background text-foreground min-h-screen">
        <Nav />
        <section className="pt-32 sm:pt-40 pb-32 max-w-[900px] mx-auto px-4 sm:px-6 text-center">
          <span className="eyebrow">Not Found</span>
          <h1 className="font-serif text-4xl sm:text-5xl mt-5">Business not found</h1>
          <button onClick={() => navigate("/directory")} className="mt-10 link-underline">
            Back to Directory →
          </button>
        </section>
        <Footer />
      </main>
    );
  }

  // Build a small gallery from the business image and related imagery
  const gallery = [
    business.image,
    ...related.map((r) => r.image),
  ].slice(0, 4);

  const services = business.services
    .split(/,\s*|\.\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 md:pt-40 pb-10 md:pb-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <Link to="/directory" className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-foreground/60 hover:text-foreground">
            <ArrowLeft size={14} /> Directory
          </Link>

          <div className="mt-8 grid grid-cols-12 gap-6 md:gap-12 items-start">
            <div className="col-span-12 md:col-span-7">
              <span className="eyebrow text-accent">{business.category}</span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl mt-4 leading-[1.02]">
                {business.name}
              </h1>
              <div className="flex items-center gap-2 mt-4 text-sm text-foreground/60">
                <MapPin size={14} /> {business.city}, {business.country}
              </div>
              <p className="mt-6 md:mt-8 text-base sm:text-lg text-foreground/80 max-w-xl leading-relaxed">
                {business.blurb}
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="aspect-[4/5] w-full overflow-hidden bg-foreground/5">
                <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 1 && (
        <section className="py-10 md:py-16 bg-secondary/40 border-y border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
            <span className="eyebrow">Gallery</span>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {gallery.map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden bg-foreground/5">
                  <img src={src} alt={`${business.name} gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services + Contact */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-12 gap-8 md:gap-16">
          <div className="col-span-12 md:col-span-7">
            <span className="eyebrow">Services</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-4">What they offer</h2>
            <div className="h-px w-12 bg-accent mt-5 mb-8" />
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {services.map((s, i) => (
                <li key={i} className="flex items-baseline gap-3 border-b border-foreground/10 pb-3">
                  <span className="font-serif italic text-accent text-sm w-6">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-foreground/85 leading-snug">{s}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-foreground/70 leading-relaxed">{business.services}</p>
          </div>

          <aside className="col-span-12 md:col-span-5">
            <div className="bg-foreground text-background p-6 sm:p-8 md:p-10">
              <span className="text-[10px] tracking-[0.3em] uppercase text-background/60">Contact</span>
              <h3 className="font-serif text-2xl md:text-3xl mt-3">Get in touch</h3>
              <div className="h-px w-12 bg-accent mt-5 mb-6" />
              <div className="flex flex-col gap-4 text-sm">
                {business.email && (
                  <a href={`mailto:${business.email}`} className="flex items-center gap-3 hover:text-accent transition-colors break-all">
                    <Mail size={16} className="shrink-0" /> {business.email}
                  </a>
                )}
                {business.phone && (
                  <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-accent transition-colors">
                    <Phone size={16} className="shrink-0" /> {business.phone}
                  </a>
                )}
                {business.url && (
                  <a href={business.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-accent transition-colors break-all">
                    <Globe size={16} className="shrink-0" /> {business.url.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>
              <a
                href={business.email ? `mailto:${business.email}?subject=Inquiry%20via%20Growtiva%20Africa` : "#"}
                className="mt-8 inline-flex items-center justify-center w-full bg-accent text-foreground px-6 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-background hover:text-foreground transition-colors"
              >
                Contact {business.name.split(" ")[0]} →
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 md:py-24 border-t border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
            <div className="flex items-end justify-between mb-8 md:mb-12">
              <div>
                <span className="eyebrow">More in {business.category}</span>
                <h2 className="font-serif text-3xl md:text-4xl mt-3">Related listings</h2>
              </div>
              <Link to="/directory" className="text-[11px] tracking-[0.22em] uppercase link-underline hidden sm:inline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {related.map((b) => (
                <Link
                  key={b.name}
                  to={`/business/${slugify(b.name)}`}
                  className="group block"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-foreground/5">
                    <img src={b.image} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="mt-4">
                    <span className="eyebrow">{b.category}</span>
                    <h3 className="font-serif text-xl md:text-2xl mt-2 group-hover:text-accent transition-colors">{b.name}</h3>
                    <p className="text-sm text-foreground/60 mt-1">{b.city}, {b.country}</p>
                  </div>
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

export default BusinessPage;

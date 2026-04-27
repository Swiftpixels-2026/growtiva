import { useEffect, useState } from "react";
import magazine from "@/assets/magazine-mockup.jpg";
import nigeria from "@/assets/africa-nigeria.jpg";
import southafrica from "@/assets/africa-southafrica.jpg";
import kenya from "@/assets/africa-kenya.jpg";
import morocco from "@/assets/africa-morocco.jpg";

const slides = [
  { src: nigeria, country: "Nigeria", place: "Lagos" },
  { src: kenya, country: "Kenya", place: "Nairobi" },
  { src: southafrica, country: "South Africa", place: "Cape Town" },
  { src: morocco, country: "Morocco", place: "Marrakech" },
];

const Hero = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-stretch">
          {/* Left: Type */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-10">
              <span className="eyebrow">Issue 01 · Out Now</span>
              <span className="h-px w-16 bg-foreground/30" />
            </div>

            <h1 className="font-serif text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] leading-[0.95] tracking-tight animate-fade-up">
              Growtiva
              <br />
              <span className="italic text-accent">Africa</span>
            </h1>

            <p className="mt-10 max-w-xl text-foreground/75 text-base leading-relaxed">
              A digital magazine documenting business, lifestyle, culture, and money
              across a new generation of Africans.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href="#latest"
                className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors"
              >
                Read Latest Issue
                <span aria-hidden>→</span>
              </a>
              <a
                href="#issues"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-[12px] tracking-[0.22em] uppercase border border-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Browse All Issues
              </a>
            </div>
          </div>

          {/* Right: Magazine (top) + sliding Africa imagery (bottom), as separate panels */}
          <div className="col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-5 gap-6">
            {/* Magazine — its own panel */}
            <div className="sm:col-span-3 relative bg-secondary/60 flex items-center justify-center p-6 md:p-10 aspect-[4/5] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.12),transparent_70%)]" aria-hidden />
              <img
                src={magazine}
                alt="Growtiva Africa — Issue 01, The Builders Edition magazine cover mockup"
                className="relative max-h-full w-auto h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)] animate-fade-up"
                width={1024}
                height={1024}
              />
              <div className="absolute left-4 top-4 eyebrow text-foreground/60">Issue 01</div>
              <div className="absolute right-4 bottom-4 text-[11px] tracking-[0.2em] uppercase text-foreground/60">
                Vol. I · MMXXVI
              </div>
            </div>

            {/* Sliding African cities — its own panel */}
            <div className="sm:col-span-2 relative aspect-[3/5] sm:aspect-auto overflow-hidden bg-foreground/5">
              {slides.map((s, idx) => (
                <div
                  key={s.src}
                  className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
                  style={{ opacity: idx === i ? 1 : 0 }}
                  aria-hidden={idx !== i}
                >
                  <img
                    src={s.src}
                    alt={`${s.place}, ${s.country} — editorial photograph`}
                    className="w-full h-full object-cover"
                    loading={idx === 0 ? "eager" : "lazy"}
                    width={1024}
                    height={1280}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                </div>
              ))}

              <div className="absolute left-4 bottom-4 right-4 text-background">
                <div className="eyebrow text-background/70">Across Africa</div>
                <div className="font-serif text-lg md:text-xl mt-1 leading-tight">
                  {slides[i].place},
                  <br />
                  <span className="italic">{slides[i].country}</span>
                </div>
                <div className="mt-4 flex gap-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setI(idx)}
                      aria-label={`Show ${slides[idx].country}`}
                      className={`h-px transition-all ${
                        idx === i ? "w-8 bg-background" : "w-4 bg-background/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-24 md:pb-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-4 mb-10">
              <span className="eyebrow">Issue 01 · Out Now</span>
              <span className="h-px w-16 bg-foreground/30" />
            </div>

            <h1 className="font-serif text-[44px] sm:text-[64px] md:text-[88px] lg:text-[112px] leading-[0.95] tracking-tight animate-fade-up">
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

          <div className="col-span-12 lg:col-span-5 hidden lg:block">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={heroBg}
                alt="Editorial photograph of a contemporary African urban skyline at golden hour"
                className="w-full h-full object-cover"
                width={1280}
                height={1600}
              />
            </div>
            <div className="mt-4 flex justify-between text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              <span>Vol. I</span>
              <span>MMXXVI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

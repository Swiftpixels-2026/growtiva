import cover from "@/assets/issue-01-cover.jpg";

const LatestIssue = () => {
  return (
    <section id="latest" className="py-32 md:py-48 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              <div
                className="absolute -inset-6 md:-inset-10 bg-accent/10 -z-10"
                aria-hidden
              />
              <img
                src={cover}
                alt="Growtiva Africa Issue 01 — The Builders Edition magazine cover"
                className="w-full h-auto shadow-[0_40px_80px_-20px_rgba(11,11,12,0.25)]"
                loading="lazy"
                width={1024}
                height={1280}
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
            <span className="eyebrow">Latest Issue</span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mt-6 leading-[1.02]">
              Issue 01
              <br />
              <span className="italic text-accent">The Builders Edition</span>
            </h2>

            <div className="rule my-10 max-w-[120px]" />

            <p className="text-base text-foreground/75 max-w-lg leading-relaxed">
              A curated collection of stories, insights, and perspectives from Africans
              building across industries, cities, and cultures.
            </p>
            <p className="mt-5 text-base text-foreground/60 max-w-lg italic">
              Featuring founders, operators, and creatives shaping what's next.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href="#flipbook"
                className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors"
              >
                Read Flipbook
              </a>
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-[12px] tracking-[0.22em] uppercase border border-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Download PDF
              </a>
            </div>

            <dl className="mt-16 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "Pages", v: "84" },
                { k: "Stories", v: "12" },
                { k: "Format", v: "Digital" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="eyebrow">{s.k}</dt>
                  <dd className="font-serif text-2xl mt-2">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestIssue;

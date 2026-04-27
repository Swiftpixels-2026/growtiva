import portrait from "@/assets/community-portrait.jpg";

const Community = () => {
  return (
    <section id="community" className="py-32 md:py-48 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="col-span-12 lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={portrait}
                alt="Editorial portrait of an African creative professional"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1080}
                height={1600}
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:pl-8">
            <span className="eyebrow">The Inner Circle</span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mt-6 leading-[1.02]">
              A network <span className="italic text-accent">behind</span> the pages
            </h2>

            <div className="rule my-10 max-w-[120px]" />

            <p className="text-base text-foreground/75 max-w-xl leading-relaxed">
              Growtiva Africa is more than a publication. It's a growing network of
              builders, creatives, and thinkers contributing to a shared narrative of
              modern Africa.
            </p>
            <p className="mt-5 text-base text-foreground/75 max-w-xl leading-relaxed">
              The stories don't just live here—they're shaped by the people reading,
              sharing, and building alongside them.
            </p>

            <a
              href="#newsletter"
              className="mt-12 inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors"
            >
              Join the Community
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;

const Advertise = () => {
  return (
    <section id="advertise" className="py-32 md:py-48 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-10 md:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <span className="eyebrow">Partnerships</span>
            <h2 className="font-serif text-4xl md:text-6xl mt-6 leading-[1.02]">
              Advertise with <span className="italic text-accent">Growtiva</span>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:pt-4">
            <p className="text-base text-foreground/80 leading-relaxed max-w-xl">
              Partner with Growtiva Africa to reach a focused audience of ambitious,
              culturally aware Africans.
            </p>
            <p className="mt-5 text-base text-foreground/75 leading-relaxed max-w-xl">
              Our digital editions and limited print runs offer brands a refined way to
              show up—alongside ideas, stories, and people that matter.
            </p>
            <p className="mt-8 italic text-foreground/60 max-w-xl">
              Selective partnerships. Thoughtful placement. Long-term visibility.
            </p>

            <a
              href="mailto:hello@growtiva.africa"
              className="mt-12 inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors"
            >
              Request Media Kit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advertise;

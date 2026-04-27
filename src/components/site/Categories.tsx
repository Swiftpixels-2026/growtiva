const categories = [
  { n: "01", title: "Business", body: "Builders, operators, and the systems behind growth." },
  { n: "02", title: "Lifestyle", body: "How ambitious Africans live, work, and design their lives." },
  { n: "03", title: "Culture", body: "Voices, trends, and ideas shaping identity." },
  { n: "04", title: "Money", body: "Wealth, access, and financial intelligence for a new generation." },
];

const Categories = () => {
  return (
    <section id="categories" className="py-32 md:py-48 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-20">
          <span className="eyebrow">Sections</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-5">Inside Growtiva</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-foreground/15">
          {categories.map((c) => (
            <a
              href="#issues"
              key={c.n}
              className="group relative p-8 md:p-10 border-b border-foreground/15 lg:border-r last:lg:border-r-0 md:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r min-h-[280px] flex flex-col justify-between hover:bg-foreground hover:text-background transition-colors duration-500"
            >
              <span className="eyebrow group-hover:text-background/60">{c.n}</span>
              <div>
                <h3 className="font-serif text-3xl md:text-4xl">{c.title}</h3>
                <p className="mt-4 text-sm leading-relaxed opacity-80 max-w-[28ch]">
                  {c.body}
                </p>
                <span className="mt-6 inline-block text-[11px] tracking-[0.22em] uppercase opacity-60 group-hover:text-accent group-hover:opacity-100 transition-all">
                  Explore →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import portrait from "@/assets/picturesforgrowtiva/Growtiva_Field_Note_01.png";
import collage2 from "@/assets/picturesforgrowtiva/Growtiva_Field_Note_02.png";
import collage3 from "@/assets/picturesforgrowtiva/Growtiva_Field_Note_03.png";
import portrait2 from "@/assets/picturesforgrowtiva/Growtiva_Inner_Circle_01.png";
import collage22 from "@/assets/picturesforgrowtiva/Growtiva_Inner_Circle_02.png";
import collage32 from "@/assets/picturesforgrowtiva/Growtiva_Inner_Circle_03.png";

const innercirclegallery = [
  {
    src: portrait2,
    alt: "Editorial collage of African creatives and founders",
  },
  {
    src: collage22,
    alt: "Portraits of African artists, designers and entrepreneurs",
  },
  {
    src: collage32,
    alt: "African creatives in studios, ateliers and city rooftops",
  },
];

const fieldnotesgallery = [
  { src: portrait, alt: "Editorial collage of African creatives and founders" },
  {
    src: collage2,
    alt: "Portraits of African artists, designers and entrepreneurs",
  },
  {
    src: collage3,
    alt: "African creatives in studios, ateliers and city rooftops",
  },
];

const Community = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % innercirclegallery.length),
      4500,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % fieldnotesgallery.length),
      4500,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="community"
      className="py-20 sm:py-28 md:py-40 border-t border-foreground/10"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="col-span-12 lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden relative bg-foreground/5">
              {innercirclegallery.map((g, i) => (
                <img
                  key={g.src}
                  src={g.src}
                  alt={g.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                  loading={i === 0 ? "eager" : "lazy"}
                  width={1080}
                  height={1600}
                />
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:pl-8">
            <span className="eyebrow">The Inner Circle</span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mt-6 leading-[1.02]">
              A private network{" "}
              <span className="italic text-accent">behind</span> the pages
            </h2>

            <div className="rule my-10 max-w-[120px]" />

            <p className="text-base text-foreground/75 max-w-xl leading-relaxed">
              The Inner Circle is a curated membership of founders, creatives,
              and cultural architects shaping a new African century. Members
              receive each issue first, alongside private briefings, salons, and
              introductions reserved for the few.
            </p>
            <p className="mt-5 text-base text-foreground/75 max-w-xl leading-relaxed">
              This is where the next chapter is written quietly, deliberately,
              and in the company of equals.
            </p>

            <Link
              to="/join"
              className="mt-12 inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors"
            >
              Join the Inner Circle
            </Link>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <div className="flex items-end justify-between mb-6">
            <span className="eyebrow">ICONIC AFRICA</span>
            <div className="flex gap-2">
              {fieldnotesgallery.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show collage ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-px transition-all duration-500 ${
                    i === active ? "w-12 bg-foreground" : "w-6 bg-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="relative aspect-[16/7] overflow-hidden bg-foreground/5">
            {fieldnotesgallery.map((g, i) => (
              <img
                key={g.src}
                src={g.src}
                alt={g.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1600ms] ease-in-out ${
                  i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
                loading="lazy"
                width={1920}
                height={840}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;

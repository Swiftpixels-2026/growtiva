import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import type { Issue, FlipPage } from "@/data/content";

type Props = {
  issue: Issue | null;
  onClose: () => void;
};

const PageFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background w-full h-full overflow-hidden border border-foreground/10">
    {children}
  </div>
);

const DesignPage = ({ p }: { p: Extract<FlipPage, { kind: "design" }> }) => {
  const variant = p.variant ?? "editorial";

  if (variant === "advert") {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 md:p-12 bg-foreground text-background">
        <span className="text-[10px] tracking-[0.3em] uppercase text-background/50">
          {p.eyebrow}
        </span>
        <div>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.05]">
            {p.title}
          </h2>
          {p.body?.map((b, i) => (
            <p key={i} className="mt-6 text-background/75 max-w-[40ch] text-sm md:text-base leading-relaxed">
              {b}
            </p>
          ))}
        </div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-accent">{p.footer}</div>
      </div>
    );
  }

  if (variant === "toc") {
    return (
      <div className="w-full h-full p-8 md:p-12 flex flex-col">
        <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">
          {p.eyebrow}
        </span>
        <h2 className="font-serif text-3xl md:text-5xl mt-3">{p.title}</h2>
        <div className="h-px w-12 bg-accent mt-5 mb-6" />
        <ul className="flex-1 flex flex-col gap-4 md:gap-5">
          {p.list?.map((it) => (
            <li key={it.n} className="flex items-baseline gap-4 border-b border-foreground/10 pb-3">
              <span className="font-serif italic text-accent text-lg w-8">{it.n}</span>
              <span className="font-serif text-base md:text-lg flex-1">{it.label}</span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/50">
                {it.page}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (variant === "quote") {
    return (
      <div className="w-full h-full p-8 md:p-14 bg-secondary/60 flex flex-col justify-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">{p.eyebrow}</span>
        <blockquote className="mt-6 font-serif italic text-2xl md:text-4xl leading-tight text-foreground">
          {p.body?.[0]}
        </blockquote>
        <div className="mt-8 text-[11px] tracking-[0.25em] uppercase text-foreground/60">
          {p.footer}
        </div>
      </div>
    );
  }

  // editorial / story
  return (
    <div className="w-full h-full p-8 md:p-12 flex flex-col">
      <span className="text-[10px] tracking-[0.3em] uppercase text-accent">
        {p.eyebrow}
      </span>
      <h2 className="font-serif text-2xl md:text-4xl mt-3 leading-[1.05]">{p.title}</h2>
      <div className="h-px w-12 bg-foreground/30 mt-5 mb-6" />
      <div className="flex-1 space-y-4 overflow-hidden">
        {p.body?.map((b, i) => (
          <p key={i} className={`text-foreground/80 text-sm md:text-base leading-relaxed ${i === 0 ? "first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:leading-none" : ""}`}>
            {b}
          </p>
        ))}
      </div>
      <div className="mt-6 text-[10px] tracking-[0.3em] uppercase text-foreground/50">
        {p.footer}
      </div>
    </div>
  );
};

const ImagePage = ({ p }: { p: Extract<FlipPage, { kind: "image" }> }) => (
  <div className="w-full h-full relative bg-foreground/5">
    <img src={p.src} alt={p.caption ?? ""} className="absolute inset-0 w-full h-full object-cover select-none" draggable={false} />
    {p.caption && (
      <div className="absolute bottom-3 left-3 bg-background/85 px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase text-foreground">
        {p.caption}
      </div>
    )}
  </div>
);

const Flipbook = ({ issue, onClose }: Props) => {
  const bookRef = useRef<any>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState({ w: 420, h: 560 });

  useEffect(() => {
    if (!issue) return;
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxSpreadW = Math.min(vw * 0.94, 1180);
      const maxH = vh * 0.78;
      let pageW = maxSpreadW / 2;
      let pageH = pageW * 1.32;
      if (pageH > maxH) {
        pageH = maxH;
        pageW = pageH / 1.32;
      }
      setSize({ w: Math.floor(pageW), h: Math.floor(pageH) });
    };
    compute();
    window.addEventListener("resize", compute);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("resize", compute);
      document.body.style.overflow = "";
    };
  }, [issue]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!issue) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") bookRef.current?.pageFlip()?.flipNext();
      if (e.key === "ArrowLeft") bookRef.current?.pageFlip()?.flipPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [issue, onClose]);

  if (!issue) return null;
  const total = issue.pages.length;

  const share = async () => {
    const url = `${window.location.origin}/issues/${issue.slug}`;
    const data = { title: `Growtiva Africa — Issue ${issue.number}`, text: issue.title, url };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Issue link copied to clipboard.");
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-foreground/95 backdrop-blur-sm flex flex-col animate-fade-up">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 h-16 border-b border-background/10 text-background">
        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-[10px] tracking-[0.3em] uppercase text-background/60">
            Issue {issue.number} · {issue.volume}
          </span>
          <span className="font-serif text-base md:text-lg truncate">{issue.title}</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={share}
            className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase border border-background/40 px-4 py-2 hover:bg-background hover:text-foreground transition-colors"
          >
            <Share2 size={14} /> Share
          </button>
          {issue.pdfUrl && (
            <a
              href={issue.pdfUrl}
              download
              className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase border border-background/40 px-4 py-2 hover:bg-background hover:text-foreground transition-colors"
            >
              <Download size={14} /> PDF
            </a>
          )}
          <button onClick={onClose} aria-label="Close flipbook" className="p-2 hover:text-accent transition-colors">
            <X size={22} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-2 sm:px-4 py-4 md:py-6">
        {/* @ts-expect-error - react-pageflip types are loose */}
        <HTMLFlipBook
          ref={bookRef}
          width={size.w}
          height={size.h}
          size="stretch"
          minWidth={280}
          maxWidth={760}
          minHeight={350}
          maxHeight={1000}
          drawShadow
          showCover
          mobileScrollSupport
          className="shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
          onFlip={(e: any) => setPage(e.data)}
        >
          {issue.pages.map((p, idx) => (
            <div key={idx} className="bg-background">
              <PageFrame>
                {p.kind === "image" ? <ImagePage p={p} /> : <DesignPage p={p} />}
              </PageFrame>
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 h-16 border-t border-background/10 text-background">
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
          className="flex items-center gap-2 text-[11px] md:text-[12px] tracking-[0.22em] uppercase hover:text-accent transition-colors"
        >
          <ChevronLeft size={16} /> Prev
        </button>
        <span className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-background/60">
          Page {Math.min(page + 1, total)} / {total}
        </span>
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipNext()}
          className="flex items-center gap-2 text-[11px] md:text-[12px] tracking-[0.22em] uppercase hover:text-accent transition-colors"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Flipbook;

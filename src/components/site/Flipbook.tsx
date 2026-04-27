import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import type { Issue } from "@/data/content";

type Props = {
  issue: Issue | null;
  onClose: () => void;
};

const Flipbook = ({ issue, onClose }: Props) => {
  const bookRef = useRef<any>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState({ w: 420, h: 560 });

  useEffect(() => {
    if (!issue) return;
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Fit two-page spread: width budget = 90vw, height budget = 80vh
      const maxSpreadW = Math.min(vw * 0.92, 1100);
      const maxH = vh * 0.78;
      // page aspect ~ 4:5
      let pageW = maxSpreadW / 2;
      let pageH = pageW * 1.25;
      if (pageH > maxH) {
        pageH = maxH;
        pageW = pageH / 1.25;
      }
      // single-page mode below 720px will be handled by lib
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

  return (
    <div className="fixed inset-0 z-[100] bg-foreground/95 backdrop-blur-sm flex flex-col animate-fade-up">
      {/* Topbar */}
      <div className="flex items-center justify-between px-5 md:px-10 h-16 border-b border-background/10 text-background">
        <div className="flex flex-col leading-tight">
          <span className="eyebrow text-background/60">Issue {issue.number}</span>
          <span className="font-serif text-base md:text-lg">{issue.title}</span>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          {issue.pdfUrl && (
            <a
              href={issue.pdfUrl}
              download
              className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase border border-background/40 px-4 py-2 hover:bg-background hover:text-foreground transition-colors"
            >
              <Download size={14} /> PDF
            </a>
          )}
          <button
            onClick={onClose}
            aria-label="Close flipbook"
            className="p-2 hover:text-accent transition-colors"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Book */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        {/* @ts-expect-error - react-pageflip types are loose */}
        <HTMLFlipBook
          ref={bookRef}
          width={size.w}
          height={size.h}
          size="stretch"
          minWidth={280}
          maxWidth={700}
          minHeight={350}
          maxHeight={900}
          drawShadow
          showCover
          mobileScrollSupport
          className="shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
          onFlip={(e: any) => setPage(e.data)}
        >
          {issue.pages.map((src, idx) => (
            <div key={idx} className="bg-background overflow-hidden">
              <img
                src={src}
                alt={`${issue.title} — page ${idx + 1}`}
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-5 md:px-10 h-16 border-t border-background/10 text-background">
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
          className="flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase hover:text-accent transition-colors"
        >
          <ChevronLeft size={16} /> Prev
        </button>
        <span className="text-[11px] tracking-[0.22em] uppercase text-background/60">
          Page {Math.min(page + 1, total)} / {total}
        </span>
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipNext()}
          className="flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase hover:text-accent transition-colors"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Flipbook;

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ISSUES } from "@/data/content";
import { useIssueReader } from "@/components/site/IssuesProvider";
import { useGatedDownload } from "@/lib/useGatedDownload";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

const IssuePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { open } = useIssueReader();
  const download = useGatedDownload();
  const issue = ISSUES.find((i) => i.slug === slug);

  useEffect(() => {
    if (!issue) return;
    document.title = `Issue ${issue.number} — ${issue.title} · Growtiva Africa`;
    open(issue.slug);
  }, [issue, open]);

  if (!issue) {
    return (
      <main className="bg-background text-foreground min-h-screen">
        <Nav />
        <section className="pt-32 md:pt-40 pb-24 md:pb-32 max-w-[900px] mx-auto px-4 sm:px-6 md:px-10 text-center">
          <span className="eyebrow">Not Found</span>
          <h1 className="font-serif text-5xl mt-5">Issue not found</h1>
          <button onClick={() => navigate("/")} className="mt-10 link-underline">
            Return home →
          </button>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />
      <section className="pt-32 md:pt-40 pb-20 md:pb-32 max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-12 gap-8 md:gap-16 items-start">
        <div className="col-span-12 md:col-span-5">
          <img src={issue.cover} alt={`${issue.title} cover`} className="w-full h-auto shadow-[0_40px_80px_-20px_rgba(11,11,12,0.25)]" />
        </div>
        <div className="col-span-12 md:col-span-7">
          <span className="eyebrow">Issue {issue.number} · {issue.volume}</span>
          <h1 className="font-serif text-4xl md:text-6xl mt-4 leading-[1.02]">{issue.title}</h1>
          <p className="mt-6 text-foreground/75 max-w-lg leading-relaxed">{issue.blurb}</p>
          <p className="mt-3 text-foreground/60">{issue.date}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button onClick={() => open(issue.slug)} className="bg-foreground text-background px-6 sm:px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors">
              Open Flipbook
            </button>
            {issue.pdfUrl && (
              <a href={issue.pdfUrl} download className="border border-foreground px-6 sm:px-8 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-foreground hover:text-background transition-colors text-center">
                Download PDF
              </a>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default IssuePage;

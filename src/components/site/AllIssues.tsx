import { ISSUES } from "@/data/content";
import { useIssueReader } from "./IssuesProvider";
import { downloadIssuePdf } from "@/lib/downloadIssuePdf";

const AllIssues = () => {
  const { open } = useIssueReader();

  return (
    <section id="issues" className="py-20 sm:py-28 md:py-40 bg-secondary/40 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-20">
          <div>
            <span className="eyebrow">The Archive</span>
            <h2 className="font-serif text-4xl md:text-6xl mt-5">All Issues</h2>
          </div>
          <p className="max-w-md text-foreground/70">
            A growing archive of ideas, people, and perspectives shaping modern Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {ISSUES.map((issue) => (
            <article key={issue.slug} className="group">
              <button
                type="button"
                onClick={() => open(issue.slug)}
                className="relative overflow-hidden bg-foreground/5 block w-full text-left"
                aria-label={`Open Issue ${issue.number}`}
              >
                <img
                  src={issue.cover}
                  alt={`Growtiva Africa Issue ${issue.number} — ${issue.title}`}
                  className="w-full h-auto transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                  width={1024}
                  height={1280}
                />
              </button>

              <div className="mt-8 flex items-baseline justify-between">
                <span className="eyebrow">Issue {issue.number}</span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  {issue.date}
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl mt-4">{issue.title}</h3>
              <p className="mt-4 text-foreground/70 max-w-md">{issue.blurb}</p>

              <div className="mt-6 flex items-center gap-8 text-[12px] tracking-[0.2em] uppercase">
                <button onClick={() => open(issue.slug)} className="link-underline">
                  Read Issue
                </button>
                <button
                  onClick={() => downloadIssuePdf(issue)}
                  className="link-underline text-muted-foreground hover:text-foreground"
                >
                  Download PDF
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllIssues;

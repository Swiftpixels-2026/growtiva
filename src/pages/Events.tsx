import { useEffect, useState } from "react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { EVENTS } from "@/data/community";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import { Calendar, MapPin } from "lucide-react";

const Events = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", note: "" });

  useEffect(() => {
    document.title = "Events — Growtiva Africa";
    window.scrollTo(0, 0);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      toast.error("Please add your name and a valid email.");
      return;
    }
    toast.success("RSVP received. We'll be in touch.");
    setForm({ name: "", email: "", note: "" });
    setOpen(null);
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />
      <section className="pt-28 sm:pt-32 md:pt-40 pb-12 md:pb-20 border-b border-foreground/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
          <span className="eyebrow">The Loop</span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl mt-4 leading-[1.02]">
            {t("events.title")}
          </h1>
          <p className="mt-6 max-w-xl text-foreground/75 text-base sm:text-lg">{t("events.dek")}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 grid gap-6 md:gap-8">
          {EVENTS.map((ev) => {
            const d = new Date(ev.date);
            const dateStr = d.toLocaleDateString(undefined, {
              weekday: "long", year: "numeric", month: "long", day: "numeric",
            });
            const timeStr = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
            const isOpen = open === ev.slug;
            return (
              <article key={ev.slug} className="border border-foreground/15 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <span className="eyebrow text-accent">{ev.format}</span>
                    <h2 className="font-serif text-2xl md:text-3xl mt-3">{ev.title}</h2>
                    <p className="mt-3 text-foreground/75 max-w-2xl">{ev.blurb}</p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] tracking-[0.22em] uppercase text-foreground/60">
                      <span className="inline-flex items-center gap-1.5"><Calendar size={12} /> {dateStr} · {timeStr}</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin size={12} /> {ev.city}, {ev.country}</span>
                      {ev.capacity && <span>{ev.capacity}</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(isOpen ? null : ev.slug)}
                    className="shrink-0 inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors"
                  >
                    {isOpen ? "Close" : t("events.rsvp")}
                  </button>
                </div>

                {isOpen && (
                  <form onSubmit={submit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-foreground/15 pt-6">
                    <input required maxLength={120} placeholder="Your name *" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40" />
                    <input required type="email" maxLength={255} placeholder="Email *" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40" />
                    <textarea maxLength={500} rows={3} placeholder="Anything we should know?" value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      className="md:col-span-2 bg-transparent border-b border-foreground/30 focus:border-foreground py-3 outline-none text-base placeholder:text-foreground/40 resize-none" />
                    <button type="submit"
                      className="md:col-span-2 inline-flex items-center justify-center bg-foreground text-background px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors w-full sm:w-fit">
                      Confirm RSVP →
                    </button>
                  </form>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Events;

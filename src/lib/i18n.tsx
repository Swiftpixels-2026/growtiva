import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "fr" | "pt";

type Dict = Record<string, { en: string; fr: string; pt: string }>;

const DICT: Dict = {
  "nav.issues": { en: "Issues", fr: "Numéros", pt: "Edições" },
  "nav.archive": { en: "Archive", fr: "Archives", pt: "Arquivo" },
  "nav.categories": { en: "Categories", fr: "Catégories", pt: "Categorias" },
  "nav.directory": { en: "Directory", fr: "Annuaire", pt: "Diretório" },
  "nav.community": { en: "Community", fr: "Communauté", pt: "Comunidade" },
  "nav.advertise": { en: "Advertise", fr: "Publicité", pt: "Anunciar" },
  "nav.events": { en: "Events", fr: "Événements", pt: "Eventos" },
  "nav.letters": { en: "Letters", fr: "Lettres", pt: "Cartas" },
  "nav.innerCircle": { en: "Inner Circle", fr: "Cercle Privé", pt: "Círculo Íntimo" },
  "lang.label": { en: "Language", fr: "Langue", pt: "Idioma" },
  "events.title": { en: "Events & Dinners", fr: "Événements & Dîners", pt: "Eventos & Jantares" },
  "events.dek": {
    en: "Talks, dinners, and gatherings hosted by Growtiva across the continent.",
    fr: "Conférences, dîners et rencontres organisés par Growtiva sur tout le continent.",
    pt: "Palestras, jantares e encontros organizados pela Growtiva por todo o continente.",
  },
  "events.rsvp": { en: "RSVP", fr: "Réserver", pt: "Confirmar" },
  "letters.title": { en: "Reader Letters", fr: "Courrier des Lecteurs", pt: "Cartas dos Leitores" },
  "letters.dek": {
    en: "Responses, dispatches, and quiet provocations from the Growtiva readership.",
    fr: "Réponses, dépêches et provocations discrètes du lectorat Growtiva.",
    pt: "Respostas, despachos e provocações silenciosas dos leitores da Growtiva.",
  },
  "letters.submit": { en: "Submit a letter", fr: "Envoyer une lettre", pt: "Enviar uma carta" },
};

type I18nCtx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };

const Ctx = createContext<I18nCtx>({ lang: "en", setLang: () => {}, t: (k) => k });

const STORAGE_KEY = "growtiva.lang";

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as Lang | null;
    if (stored === "en" || stored === "fr" || stored === "pt") setLangState(stored);
    else {
      const nav = (typeof navigator !== "undefined" ? navigator.language.slice(0, 2) : "en") as Lang;
      if (nav === "fr" || nav === "pt") setLangState(nav);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
    document.documentElement.lang = l;
  };

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const t = (key: string) => DICT[key]?.[lang] ?? key;

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
};

export const useI18n = () => useContext(Ctx);

export const LanguageToggle = ({ compact = false }: { compact?: boolean }) => {
  const { lang, setLang } = useI18n();
  const opts: Lang[] = ["en", "fr", "pt"];
  return (
    <div
      className={`inline-flex border border-foreground/20 ${compact ? "text-[10px]" : "text-[11px]"} tracking-[0.2em] uppercase`}
      role="group"
      aria-label="Language"
    >
      {opts.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1.5 transition-colors ${
            lang === l ? "bg-foreground text-background" : "hover:bg-foreground/5"
          } ${l !== "en" ? "border-l border-foreground/20" : ""}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
};

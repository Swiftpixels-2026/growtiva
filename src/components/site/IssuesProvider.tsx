import { createContext, useContext, useState, ReactNode } from "react";
import { ISSUES, type Issue } from "@/data/content";
import Flipbook from "./Flipbook";
import { useEmailGate } from "@/lib/emailGate";

type Ctx = {
  open: (slug: string) => void;
  close: () => void;
};

const IssuesCtx = createContext<Ctx | null>(null);

export const useIssueReader = () => {
  const ctx = useContext(IssuesCtx);
  if (!ctx) throw new Error("useIssueReader must be used inside <IssuesProvider>");
  return ctx;
};

export const IssuesProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<Issue | null>(null);

  const open = (slug: string) => {
    const found = ISSUES.find((i) => i.slug === slug) ?? ISSUES[0];
    setActive(found);
  };
  const close = () => setActive(null);

  return (
    <IssuesCtx.Provider value={{ open, close }}>
      {children}
      <Flipbook issue={active} onClose={close} />
    </IssuesCtx.Provider>
  );
};

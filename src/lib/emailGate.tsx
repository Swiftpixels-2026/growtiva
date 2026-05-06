import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const STORAGE_KEY = "growtiva:reader-email";
const emailSchema = z.string().trim().email().max(255);

type Ctx = {
  /** Resolves with the captured email (or existing one) before running the gated action. Rejects if user cancels. */
  require: (intent?: string) => Promise<string>;
  getEmail: () => string | null;
};

const EmailGateCtx = createContext<Ctx | null>(null);

export const useEmailGate = () => {
  const ctx = useContext(EmailGateCtx);
  if (!ctx) throw new Error("useEmailGate must be used inside <EmailGateProvider>");
  return ctx;
};

export const EmailGateProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<string>("continue");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resolver, setResolver] = useState<{ resolve: (e: string) => void; reject: () => void } | null>(null);

  const getEmail = useCallback(() => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  }, []);

  const require = useCallback((intentLabel = "continue") => {
    return new Promise<string>((resolve, reject) => {
      const existing = getEmail();
      if (existing) { resolve(existing); return; }
      setIntent(intentLabel);
      setValue("");
      setError(null);
      setResolver({ resolve, reject });
      setOpen(true);
    });
  }, [getEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(value);
    if (!parsed.success) {
      setError("Please enter a valid email address.");
      return;
    }
    try { localStorage.setItem(STORAGE_KEY, parsed.data); } catch {}
    toast.success("Welcome to Growtiva Africa.", { description: "Enjoy the issue." });
    setOpen(false);
    resolver?.resolve(parsed.data);
    setResolver(null);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next && resolver) {
      resolver.reject();
      setResolver(null);
    }
    setOpen(next);
  };

  return (
    <EmailGateCtx.Provider value={{ require, getEmail }}>
      {children}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md bg-background border-foreground/15">
          <DialogHeader>
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent">The Reading Room</span>
            <DialogTitle className="font-serif text-2xl md:text-3xl leading-tight mt-2">
              One detail before you {intent}.
            </DialogTitle>
            <DialogDescription className="text-foreground/70 text-sm leading-relaxed">
              Drop your email and we'll unlock the issue. You'll also be the first to know
              when the next one drops — no spam, ever.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              type="email"
              required
              autoFocus
              value={value}
              onChange={(e) => { setValue(e.target.value); if (error) setError(null); }}
              placeholder="you@domain.com"
              maxLength={255}
              className="w-full bg-transparent border border-foreground/30 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
            />
            {error && <p className="text-[12px] text-destructive">{error}</p>}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center bg-foreground text-background px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors"
            >
              Unlock & {intent}
            </button>
            <p className="text-[10px] tracking-[0.18em] uppercase text-foreground/45 text-center">
              We respect your inbox.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </EmailGateCtx.Provider>
  );
};

import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { submitReadingRoom } from "@/api/forms";

const STORAGE_KEY = "growtiva:reader-email";
const VERIFIED_AT_KEY = "growtiva:reader-verified-at";
const emailSchema = z.string().trim().email().max(255);

type Ctx = {
  /** Resolves with the captured email (or existing one) before running the gated action. Rejects if user cancels. */
  require: (intent?: string) => Promise<string>;
  getEmail: () => string | null;
  isVerified: boolean;
  reset: () => void;
};

const EmailGateCtx = createContext<Ctx | null>(null);

export const useEmailGate = () => {
  const ctx = useContext(EmailGateCtx);
  if (!ctx) throw new Error("useEmailGate must be used inside <EmailGateProvider>");
  return ctx;
};

const readStored = (): string | null => {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
};

export const EmailGateProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<string>("continue");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [storedEmail, setStoredEmail] = useState<string | null>(() => readStored());

  // Use a ref for the pending resolver — avoids stale closures and React warnings
  // from storing functions inside setState.
  const resolverRef = useRef<{ resolve: (e: string) => void; reject: () => void } | null>(null);

  // Keep verified state in sync across tabs.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setStoredEmail(readStored());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const getEmail = useCallback(() => readStored(), []);

  const require = useCallback((intentLabel = "continue") => {
    return new Promise<string>((resolve, reject) => {
      const existing = readStored();
      if (existing) { resolve(existing); return; }
      // Resolve any leftover pending resolver before opening a new one.
      resolverRef.current?.reject();
      resolverRef.current = { resolve, reject };
      setIntent(intentLabel);
      setValue("");
      setError(null);
      setOpen(true);
    });
  }, []);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(VERIFIED_AT_KEY);
    } catch (err) {
      console.error("Failed to reset email gate localStorage state:", err);
    }
    setStoredEmail(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(value);
    if (!parsed.success) {
      setError("Please enter a valid email address.");
      return;
    }
    
    setSubmitting(true);
    setError(null);
    try {
      const res = await submitReadingRoom({ email: parsed.data });
      if (!res.success) {
        setError(res.error || "Failed to submit email. Please try again.");
        return;
      }
      
      try {
        localStorage.setItem(STORAGE_KEY, parsed.data);
        localStorage.setItem(VERIFIED_AT_KEY, new Date().toISOString());
      } catch (err) {
        console.error("Failed to store email gate state to localStorage:", err);
      }
      setStoredEmail(parsed.data);
      toast.success("You're verified.", { description: "Welcome to Growtiva Africa." });
      setOpen(false);
      const r = resolverRef.current;
      resolverRef.current = null;
      r?.resolve(parsed.data);
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      const r = resolverRef.current;
      resolverRef.current = null;
      r?.reject();
    }
    setOpen(next);
  };

  return (
    <EmailGateCtx.Provider value={{ require, getEmail, isVerified: !!storedEmail, reset }}>
      {children}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md bg-background border-foreground/15">
          <DialogHeader>
            <span className="block text-[10px] tracking-[0.3em] uppercase text-accent">
              The Reading Room
            </span>
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
              disabled={submitting}
              className="w-full bg-transparent border border-foreground/30 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
            />
            {error && <p className="text-[12px] text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center bg-foreground text-background px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Unlocking…" : `Unlock & ${intent}`}
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

/**
 * Small inline badge — surfaces "You're verified" state on gated CTAs so
 * returning readers can see their access is already unlocked.
 */
export const VerifiedBadge = ({ className = "" }: { className?: string }) => {
  const { isVerified, getEmail } = useEmailGate();
  if (!isVerified) return null;
  const email = getEmail();
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase text-accent ${className}`}
      title={email ? `Verified as ${email}` : "Verified"}
    >
      <CheckCircle2 size={12} /> Verified
    </span>
  );
};

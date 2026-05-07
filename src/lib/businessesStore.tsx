import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BUSINESSES as BAKED, type Business } from "@/data/content";
import { slugify } from "@/lib/slug";

type Overrides = Record<string, Partial<Business>>; // keyed by slug
type Store = {
  added: Business[];
  overrides: Overrides;
  deleted: string[]; // slugs
};

const KEY = "growtiva:directory-store-v1";
const empty: Store = { added: [], overrides: {}, deleted: [] };

function read(): Store {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}
function write(s: Store) {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("growtiva:directory-changed"));
}

type Ctx = {
  businesses: Business[];
  store: Store;
  addBusiness: (b: Business) => void;
  updateBusiness: (slug: string, patch: Partial<Business>) => void;
  deleteBusiness: (slug: string) => void;
  resetAll: () => void;
};

const DirectoryContext = createContext<Ctx | null>(null);

export const DirectoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<Store>(() => read());

  useEffect(() => {
    const sync = () => setStore(read());
    window.addEventListener("storage", sync);
    window.addEventListener("growtiva:directory-changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("growtiva:directory-changed", sync);
    };
  }, []);

  const businesses = useMemo<Business[]>(() => {
    const base = BAKED.filter((b) => !store.deleted.includes(slugify(b.name)));
    const merged = base.map((b) => {
      const s = slugify(b.name);
      return store.overrides[s] ? { ...b, ...store.overrides[s] } : b;
    });
    return [...store.added, ...merged];
  }, [store]);

  const addBusiness = useCallback((b: Business) => {
    const next = read();
    next.added = [b, ...next.added.filter((x) => slugify(x.name) !== slugify(b.name))];
    write(next);
    setStore(next);
  }, []);

  const updateBusiness = useCallback((slug: string, patch: Partial<Business>) => {
    const next = read();
    // If it's an "added" business, patch in place
    const addedIdx = next.added.findIndex((x) => slugify(x.name) === slug);
    if (addedIdx >= 0) {
      next.added[addedIdx] = { ...next.added[addedIdx], ...patch };
    } else {
      next.overrides[slug] = { ...(next.overrides[slug] ?? {}), ...patch };
    }
    write(next);
    setStore(next);
  }, []);

  const deleteBusiness = useCallback((slug: string) => {
    const next = read();
    next.added = next.added.filter((x) => slugify(x.name) !== slug);
    delete next.overrides[slug];
    if (BAKED.some((b) => slugify(b.name) === slug)) {
      next.deleted = Array.from(new Set([...next.deleted, slug]));
    }
    write(next);
    setStore(next);
  }, []);

  const resetAll = useCallback(() => {
    write(empty);
    setStore(empty);
  }, []);

  return (
    <DirectoryContext.Provider value={{ businesses, store, addBusiness, updateBusiness, deleteBusiness, resetAll }}>
      {children}
    </DirectoryContext.Provider>
  );
};

export const useDirectory = () => {
  const ctx = useContext(DirectoryContext);
  if (!ctx) throw new Error("useDirectory must be used inside <DirectoryProvider>");
  return ctx;
};

/** Helper for non-context callers: merged snapshot at call time. */
export const getMergedBusinesses = (): Business[] => {
  const store = read();
  const base = BAKED.filter((b) => !store.deleted.includes(slugify(b.name)));
  const merged = base.map((b) => {
    const s = slugify(b.name);
    return store.overrides[s] ? { ...b, ...store.overrides[s] } : b;
  });
  return [...store.added, ...merged];
};

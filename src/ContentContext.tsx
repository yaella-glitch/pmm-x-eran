import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import defaultContent from "./content.json";

type ContentType = typeof defaultContent;

type ContextValue = {
  content: ContentType;
  setContent: (next: ContentType) => void;
  resetContent: () => void;
  hasOverride: boolean;
};

const STORAGE_KEY = "pmm-eran-content-override-v3";

const ContentContext = createContext<ContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<ContentType>(defaultContent);
  const [hasOverride, setHasOverride] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setContentState(parsed);
        setHasOverride(true);
      }
    } catch (e) {
      console.error("Failed to load saved content", e);
    }
  }, []);

  const setContent = (next: ContentType) => {
    setContentState(next);
    setHasOverride(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Failed to persist content", e);
    }
  };

  const resetContent = () => {
    setContentState(defaultContent);
    setHasOverride(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear content override", e);
    }
  };

  return (
    <ContentContext.Provider value={{ content, setContent, resetContent, hasOverride }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): ContentType {
  const ctx = useContext(ContentContext);
  if (!ctx) return defaultContent;
  return ctx.content;
}

export function useContentController() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContentController must be used inside ContentProvider");
  return ctx;
}

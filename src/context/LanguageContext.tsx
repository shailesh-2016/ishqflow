"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import en from "../locales/en.json";
import hi from "../locales/hi.json";

type Language = "en" | "hi";
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const translations = {
  en,
  hi,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check if user has a saved preference, otherwise default to "en"
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "en" || saved === "hi")) {
      setLanguage(saved);
    }
    setMounted(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // Provide an empty/default context during SSR to avoid hydration mismatch,
  // but since we render the children, we will just use "en" initially during SSR.
  const t = translations[language];

  if (!mounted) {
    // Avoid hydration mismatch by rendering default english during SSR
    return (
      <LanguageContext.Provider value={{ language: "en", setLanguage: handleSetLanguage, t: translations.en }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={language}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="contents"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

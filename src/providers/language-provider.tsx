"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Language, languages, translations } from "~/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Check for saved language preference
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as Language;
      const validLanguages: Language[] = ["en", "de", "es", "fr", "it"];
      if (savedLang && validLanguages.includes(savedLang)) {
        setLanguageState(savedLang);
      } else {
        // Detect browser language
        const browserLang = navigator.language.split("-")[0];
        if (browserLang === "de") {
          setLanguageState("de");
        } else if (browserLang === "es") {
          setLanguageState("es");
        } else if (browserLang === "fr") {
          setLanguageState("fr");
        } else if (browserLang === "it") {
          setLanguageState("it");
        } else {
          setLanguageState("en");
        }
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  const t = (path: string): string => {
    const keys = path.split(".");
    let value: any = translations[language];
    
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) {
        // Fallback to English
        value = translations.en;
        for (const fallbackKey of keys) {
          value = value?.[fallbackKey];
        }
        break;
      }
    }
    
    return value ?? path;
  };

  // Always provide context, but use default language during SSR
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
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


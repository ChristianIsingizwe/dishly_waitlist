import en from "./translations/en.json";
import de from "./translations/de.json";
import es from "./translations/es.json";
import fr from "./translations/fr.json";
import it from "./translations/it.json";

export type Language = "en" | "de" | "es" | "fr" | "it";

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
];

export const translations = {
  en,
  de,
  es,
  fr,
  it,
} as const;

export function getTranslation(lang: Language) {
  return translations[lang];
}

export function getNestedTranslation(lang: Language, path: string) {
  const keys = path.split(".");
  let value: any = translations[lang];
  
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) {
      // Fallback to English if translation is missing
      value = translations.en;
      for (const fallbackKey of keys) {
        value = value?.[fallbackKey];
      }
      break;
    }
  }
  
  return value ?? path;
}


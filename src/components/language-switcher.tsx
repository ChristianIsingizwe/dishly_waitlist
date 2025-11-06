"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "~/providers/language-provider";
import { languages } from "~/lib/i18n";
import { Button } from "./ui/button";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => {
          const currentIndex = languages.findIndex((l) => l.code === language);
          const nextIndex = (currentIndex + 1) % languages.length;
          setLanguage(languages[nextIndex].code);
        }}
      >
        <Globe className="size-4" />
        <span className="hidden sm:inline">{languages.find((l) => l.code === language)?.flag}</span>
        <span className="hidden md:inline text-xs">
          {languages.find((l) => l.code === language)?.name}
        </span>
      </Button>
    </div>
  );
}


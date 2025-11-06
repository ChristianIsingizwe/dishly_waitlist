"use client";

import { useLanguage } from "~/providers/language-provider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="flex flex-col justify-center items-center gap-4 pb-4">
      <div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {t("footer.copyright")}{" "}
          <span className="font-semibold text-foreground">Dishly</span>
        </p>
      </div>
    </footer>
  );
}

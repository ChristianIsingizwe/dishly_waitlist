"use client";

import { useState } from "react";

import Countdown from "./countdown";
import People from "./people";
import { Logo } from "./svgs";
import Form from "./form";
import { useLanguage } from "~/providers/language-provider";

export default function Hero({ waitlistPeople }: { waitlistPeople: number }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center justify-center gap-6 mb-6">
        <Logo />
        <div className="flex items-center gap-4 rounded-full border border-border px-4 py-1 relative">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
          </span>
          <p className="uppercase text-sm font-medium">
            {t("hero.availableBadge")}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 max-w-2xl">
        <h2 className="text-4xl font-bold text-foreground">
          {isSuccess ? t("hero.titleSuccess") : t("hero.title")}
        </h2>
        <p className="text-base text-muted-foreground text-center max-w-md">
          {isSuccess ? t("hero.descriptionSuccess") : t("hero.description")}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-full max-w-md">
        <Form onSuccessChange={setIsSuccess} />
      </div>
      <div className="flex items-center justify-center gap-2">
        <People count={waitlistPeople} />
      </div>
      <Countdown period={new Date("2025-11-30")} />
    </div>
  );
}

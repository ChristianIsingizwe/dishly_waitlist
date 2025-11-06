"use client";

import { ChefHat } from "lucide-react";
import { useLanguage } from "~/providers/language-provider";

export default function Mission() {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12 w-full px-4">
      <div className="bg-card border border-border rounded-xl p-8 md:p-12 max-w-4xl w-full shadow-xs relative">
        <div className="absolute top-6 right-6 size-14 rounded-full bg-[#e5ff00] flex items-center justify-center shadow-xs">
          <ChefHat className="size-7 text-black" />
        </div>

        <div className="flex flex-col gap-6 pr-20">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              {t("mission.label")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("mission.title")}
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-muted-foreground">
            <p className="text-base leading-relaxed">
              {t("mission.description")}
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                {t("mission.launchDate")}
              </span>
              <span className="text-sm text-muted-foreground">
                {t("mission.launchDateValue")}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                {t("mission.keyBenefit")}
              </span>
              <span className="text-sm text-muted-foreground">
                {t("mission.keyBenefitValue")}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                {t("mission.builtFor")}
              </span>
              <span className="text-sm text-muted-foreground">
                {t("mission.builtForValue")}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm font-semibold text-foreground">CH</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  ISINGIZWE Christian
                </span>
                <span className="text-xs text-muted-foreground">
                  {t("mission.founder")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm font-semibold text-foreground">NB</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  Nsanzimana Bruno
                </span>
                <span className="text-xs text-muted-foreground">
                  {t("mission.coFounder")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

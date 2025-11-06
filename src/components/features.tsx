"use client";

import { MessageSquare, Map, ShoppingCart } from "lucide-react";
import { useLanguage } from "~/providers/language-provider";

export default function Features() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: MessageSquare,
      title: t("features.aiSearch.title"),
      description: t("features.aiSearch.description"),
    },
    {
      icon: Map,
      title: t("features.maps.title"),
      description: t("features.maps.description"),
    },
    {
      icon: ShoppingCart,
      title: t("features.preOrder.title"),
      description: t("features.preOrder.description"),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-12 py-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-xl p-8 flex flex-col items-center gap-5 shadow-xs hover:shadow-sm transition-shadow aspect-square min-h-[280px]"
          >
            <div className="size-14 rounded-full bg-[#e5ff00] flex items-center justify-center shadow-xs">
              <feature.icon className="size-7 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-foreground text-center">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

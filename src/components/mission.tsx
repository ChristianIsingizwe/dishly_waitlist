import { ChefHat } from "lucide-react";

export default function Mission() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12 w-full px-4">
      <div className="bg-card border border-border rounded-xl p-8 md:p-12 max-w-4xl w-full shadow-xs relative">
        <div className="absolute top-6 right-6 size-14 rounded-full bg-[#e5ff00] flex items-center justify-center shadow-xs">
          <ChefHat className="size-7 text-black" />
        </div>

        <div className="flex flex-col gap-6 pr-20">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              The Future of Food Discovery is Here
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-muted-foreground">
            <p className="text-base leading-relaxed">
            We’re reimagining how people discover food. With natural conversation, image search, and personalized preference understanding—much like how you interact with ChatGPT—our AI helps you uncover the perfect dish and the restaurants that serve it best.
            Powered by real-time dish data, AI-native search, and 3D navigation, our mission is to make finding great food intuitive, effortless, and uniquely personal.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                Launch Date:
              </span>
              <span className="text-sm text-muted-foreground">
                1<sup>st</sup> December 2025
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                Key Benefit:
              </span>
              <span className="text-sm text-muted-foreground">
                Find perfect meals instantly, skip the wait
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                Built For:
              </span>
              <span className="text-sm text-muted-foreground">
                Food lovers, diners, and restaurants
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
                  Founder of Dishly
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
                  Co-founder of Dishly
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { MessageSquare, Map, ShoppingCart } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: MessageSquare,
      title: "AI-Enabled Food Search",
      description:
        "Chat with our AI like ChatGPT to discover food and nearby restaurants. Get real-time, trustworthy data from registered restaurants in your area.",
    },
    {
      icon: Map,
      title: "Real 3D Maps Guidance",
      description:
        "Navigate to your chosen restaurant with immersive 3D maps that provide clear, detailed guidance right to your destination.",
    },
    {
      icon: ShoppingCart,
      title: "Easy Pre-Ordering",
      description:
        "Pre-order for dine-in or pickup. Your meal is ready exactly when you arrive—no waiting, no delays.",
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

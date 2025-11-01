"use client";

import { useRef } from "react";
import Faq from "~/components/faq";
import Features from "~/components/features";
import Footer from "~/components/footer";
import Hero from "~/components/hero";
import { Confetti, ConfettiRef } from "~/components/magicui/confetti";
import Mission from "~/components/mission";
import Powered from "~/components/powered";

export function LandingPage({ waitlistPeople }: { waitlistPeople: number }) {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <main className="mx-auto max-w-screen-2xl w-full h-full flex-1 flex flex-col relative">
      <Confetti
        ref={confettiRef}
        className="fixed inset-0 z-50 pointer-events-none"
        manualstart={true}
      />
      <Hero waitlistPeople={waitlistPeople} />
      <Features />
      <Mission />
      <Faq />
      <Footer />
    </main>
  );
}

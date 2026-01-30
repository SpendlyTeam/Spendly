"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FeaturesSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".feature-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 60%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, []);

  return (
    <section ref={cardsRef} className="relative py-20 text-center bg-slate-950">
      <h2 className="text-4xl font-bold mb-4">
        Why choose <span className="text-logoGreen">Spendly?</span>
      </h2>

      <p className="text-gray-400 max-w-2xl mx-auto mb-12">
        One clean dashboard that gives you a complete overview of your financial
        habits, expenses, and trends across categories and months.
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="feature-card bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <h3 className="text-2xl font-bold mb-2 text-logoGreen">
            Category Breakdown
          </h3>
          <p className="text-gray-300">
            Understand exactly how much you spend on food, rent, transport,
            entertainment, and more — all in one place.
          </p>
        </div>

        <div className="feature-card bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <h3 className="text-2xl font-bold mb-2 text-logoGreen">
            Spending Over Time
          </h3>
          <p className="text-gray-300">
            Visualize monthly spending patterns with clear charts that help you
            spot trends, spikes, and opportunities to save.
          </p>
        </div>

        <div className="feature-card bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <h3 className="text-2xl font-bold mb-2 text-logoGreen">
            Transaction History
          </h3>
          <p className="text-gray-300">
            Browse and analyze every transaction with filters, categories,
            dates, and totals — full clarity, zero clutter.
          </p>
        </div>
      </div>
    </section>
  );
}

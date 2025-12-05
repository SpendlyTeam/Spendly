"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";
import placeholder from "../../public/placeholder.webp";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }

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
        }
      );
    }
  }, []);

  return (
    <div className="w-full min-h-screen font-sans overflow-x-hidden bg-slate-900 text-white">
      <section
        ref={heroRef}
        className="relative flex items-center justify-center h-screen bg-transparent"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${placeholder.src ?? placeholder})` }}
        />

        <div className="absolute inset-0 bg-logoGreen mix-blend-multiply opacity-60" />

        <div className="relative z-10 max-w-3xl text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            TAKE CONTROL OF YOUR <span className="text-logoGreen">SPENDING</span>
          </h1>

          <p className="text-lg md:text-2xl mb-8 text-gray-200 drop-shadow">
            Spendly is a clean and simple finance dashboard that helps you
            understand where your money really goes — no spreadsheets needed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-logoGreen text-black font-semibold shadow-lg hover:brightness-110 transition"
            >
              Open Dashboard
              <FiArrowRight />
            </a>

          </div>

          <p className="mt-6 text-sm text-gray-300">
            Monthly summaries • Category insights • Charts • Transaction history
          </p>
        </div>
      </section>

      <section
        ref={cardsRef}
        className="py-20 text-center bg-slate-950"
      >
        <h2 className="text-4xl font-bold mb-4">
          Why choose <span className="text-logoGreen">Spendly?</span>
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          One clean dashboard that gives you a complete overview of your
          financial habits, expenses, and trends across categories and months.
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
              Visualize monthly spending patterns with clear charts that help
              you spot trends, spikes, and opportunities to save.
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
    </div>
  );
};

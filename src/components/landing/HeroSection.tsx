"use client";

import { FiArrowRight } from "react-icons/fi";

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center h-screen bg-transparent">
      <div className="absolute inset-0 bg-black/30 z-5" />

      <div className="relative z-10 max-w-3xl text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          TAKE CONTROL OF YOUR <span className="text-logoGreen">SPENDING</span>
        </h1>

        <p className="text-lg md:text-2xl mb-8 text-gray-200 drop-shadow">
          Spendly is a clean and simple finance dashboard that helps you
          understand where your money really goes no spreadsheets needed.
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
  );
}

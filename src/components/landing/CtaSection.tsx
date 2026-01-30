"use client";

import { FiArrowRight } from "react-icons/fi";

export function CtaSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-black/30">
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
          Start Taking Control <span className="text-logoGreen">Today</span>
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of users who have transformed their financial habits
          with Spendly.
        </p>
        <a
          href="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-logoGreen text-black font-bold text-lg shadow-xl hover:brightness-110 transition"
        >
          Get Started Now
          <FiArrowRight />
        </a>
        <p className="mt-4 text-sm text-gray-400">
          No credit card required • Free to start
        </p>
      </div>
    </section>
  );
}

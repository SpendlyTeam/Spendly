"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HowItWorksSection() {
  const howItWorksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (howItWorksRef.current) {
      const steps = howItWorksRef.current.querySelectorAll(".step-item");
      gsap.fromTo(
        steps,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.3,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: howItWorksRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, []);

  return (
    <section ref={howItWorksRef} className="relative py-20 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          How <span className="text-logoGreen">It Works</span>
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
          Get started in three simple steps and start tracking your finances
          like a pro.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="step-item text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-logoGreen rounded-full flex items-center justify-center text-black font-bold text-2xl">
              1
            </div>
            <h3 className="text-xl font-bold mb-2 text-logoGreen">
              Input Your Data
            </h3>
            <p className="text-gray-400">
              Quickly log your expenses and income manually. No bank connection
              required.
            </p>
          </div>

          <div className="step-item text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-logoGreen rounded-full flex items-center justify-center text-black font-bold text-2xl">
              2
            </div>
            <h3 className="text-xl font-bold mb-2 text-logoGreen">
              Create Categories
            </h3>
            <p className="text-gray-400">
              Define your own custom categories to organize your finances
              exactly how you want.
            </p>
          </div>

          <div className="step-item text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-logoGreen rounded-full flex items-center justify-center text-black font-bold text-2xl">
              3
            </div>
            <h3 className="text-xl font-bold mb-2 text-logoGreen">
              View Insights
            </h3>
            <p className="text-gray-400">
              Discover spending patterns, trends, and opportunities to save
              money.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

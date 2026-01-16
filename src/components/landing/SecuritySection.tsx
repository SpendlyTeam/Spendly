"use client";

import { useRef, useEffect } from "react";
import { FiShield, FiLock, FiEye } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SecuritySection() {
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trustRef.current) {
      const trustItems = trustRef.current.querySelectorAll(".trust-item");
      gsap.fromTo(
        trustItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trustRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, []);

  return (
    <section ref={trustRef} className="relative py-20 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Your Data is <span className="text-logoGreen">Safe</span>
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
          We take security seriously. Your financial information is protected
          with industry-leading encryption.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="trust-item text-center p-6 bg-slate-800 rounded-lg border border-slate-700">
            <FiShield className="w-12 h-12 mx-auto mb-4 text-logoGreen" />
            <h3 className="text-xl font-bold mb-2">Bank-Level Encryption</h3>
            <p className="text-gray-400">
              Your data is encrypted with the same security standards used by
              major banks.
            </p>
          </div>

          <div className="trust-item text-center p-6 bg-slate-800 rounded-lg border border-slate-700">
            <FiLock className="w-12 h-12 mx-auto mb-4 text-logoGreen" />
            <h3 className="text-xl font-bold mb-2">Privacy First</h3>
            <p className="text-gray-400">
              We never sell your data. Your financial information stays private,
              always.
            </p>
          </div>

          <div className="trust-item text-center p-6 bg-slate-800 rounded-lg border border-slate-700">
            <FiEye className="w-12 h-12 mx-auto mb-4 text-logoGreen" />
            <h3 className="text-xl font-bold mb-2">Full Transparency</h3>
            <p className="text-gray-400">
              You have complete control over your data with the ability to
              export or delete anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

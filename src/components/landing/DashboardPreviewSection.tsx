"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dashboardMock from "../../../public/dashboardMock.png";

gsap.registerPlugin(ScrollTrigger);

export function DashboardPreviewSection() {
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dashboardRef.current) {
      gsap.fromTo(
        dashboardRef.current.querySelector(".dashboard-mock"),
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: dashboardRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, []);

  return (
    <section ref={dashboardRef} className="relative py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Your Finance Dashboard,{" "}
          <span className="text-logoGreen">Simplified</span>
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          A clean, intuitive interface designed to make financial tracking
          effortless.
        </p>

        <div className="dashboard-mock relative rounded-xl overflow-hidden shadow-2xl border border-slate-700 w-full aspect-video md:h-[600px]">
          <Image
            src={dashboardMock}
            alt="Dashboard Mock"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </section>
  );
}

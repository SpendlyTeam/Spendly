"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowRight,
  FiShield,
  FiLock,
  FiEye,
  FiChevronDown,
} from "react-icons/fi";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import dashboardMock from "../../public/dashboardMock.png";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        },
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
        },
      );
    }

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

    if (faqRef.current) {
      gsap.fromTo(
        faqRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, []);

  const faqs = [
    {
      question: "Is my financial data secure?",
      answer:
        "Absolutely. We use bank-level encryption to protect your data. Your information is stored securely and never shared with third parties.",
    },
    {
      question: "Can I use Spendly on mobile?",
      answer:
        "Yes! Spendly is fully responsive and works beautifully on phones, tablets, and desktops.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Yes! You can export your transaction history and reports in CSV or PDF format at any time.",
    },
    {
      question: "Is Spendly free?",
      answer:
        "Yes, Spendly is completely free to use. We believe in making financial clarity accessible to everyone.",
    },
  ];

  return (
    <div className="w-full min-h-screen font-sans overflow-x-hidden bg-slate-900 text-white">
      <section
        ref={heroRef}
        className="relative flex items-center justify-center h-screen bg-transparent"
      >
        <ShaderGradientCanvas
          pixelDensity={1}
          fov={45}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <ShaderGradient
            animate="on"
            // @ts-expect-error Works as expected without typescript error
            axesHelper="off"
            bgColor1="#000000"
            bgColor2="#000000"
            brightness={1.2}
            cAzimuthAngle={170}
            cDistance={4.41}
            cPolarAngle={70}
            cameraZoom={1}
            color1="#7ed957"
            color2="#059669"
            color3="#a3e635"
            destination="onCanvas"
            embedMode="off"
            envPreset="city"
            format="gif"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="off"
            lightType="3d"
            pixelDensity={1}
            positionX={0}
            positionY={0.9}
            positionZ={-0.3}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={45}
            rotationY={0}
            rotationZ={0}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.2}
            uFrequency={0}
            uSpeed={0.2}
            uStrength={3.4}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>

        <div className="absolute inset-0 bg-black/30 z-5" />

        <div className="relative z-10 max-w-3xl text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            TAKE CONTROL OF YOUR{" "}
            <span className="text-logoGreen">SPENDING</span>
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

      <section ref={cardsRef} className="py-20 text-center bg-slate-950">
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

      <section ref={howItWorksRef} className="py-20 bg-slate-900">
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
                Quickly log your expenses and income manually. No bank
                connection required.
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

      <section ref={dashboardRef} className="py-20 bg-slate-950">
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

      <section ref={trustRef} className="py-20 bg-slate-900">
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
                We never sell your data. Your financial information stays
                private, always.
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

      <section ref={faqRef} className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Frequently Asked <span className="text-logoGreen">Questions</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Got questions? We have got answers.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-700 transition"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <FiChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openFaq === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-4 pt-2 text-gray-400 border-t border-slate-700">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-logoGreen/20 via-emerald-600/10 to-transparent" />
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
    </div>
  );
}

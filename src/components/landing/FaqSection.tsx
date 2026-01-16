"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <section className="relative py-20 bg-slate-950">
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
  );
}

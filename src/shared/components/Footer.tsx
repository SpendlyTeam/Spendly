import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const socials = [
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  { href: "https://github.com", label: "GitHub", icon: Github },
];

export const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 space-y-10 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
              Spendly
            </p>
            <h2 className="text-2xl font-bold">
              Stay on top of every dollar you spend.
            </h2>
          </div>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-full bg-logoGreen px-5 py-3 text-sm font-semibold text-gray-900 shadow-lg shadow-logoGreen/30 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-logoGreen"
          >
            Get started
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr,2fr]">
          <div className="space-y-3 text-gray-300">
            <p className="text-lg font-semibold text-white">Spendly</p>
            <p className="text-sm leading-relaxed text-gray-400">
              Track expenses, stick to budgets, and reach your goals with
              Spendly’s modern finance toolkit.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Spendly. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {socials.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-logoGreen/60 hover:text-logoGreen"
                aria-label={item.label}
              >
                <item.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

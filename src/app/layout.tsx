import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/shared/components/Header";
import { Footer } from "@/shared/components/Footer";

export const metadata: Metadata = {
  title: "Spendly",
  description:
    "Spendly is the modern finance application that helps you track expenses, manage budgets, and save money effortlessly. Take control of your financial future today.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="flex flex-col min-h-screen bg-slate-950 text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

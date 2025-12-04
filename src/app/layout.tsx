import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/shared/Header';

export const metadata: Metadata = {
  title: 'Spendly',
  description:
    'Spendly is the modern finance application that helps you track expenses, manage budgets, and save money effortlessly. Take control of your financial future today.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}

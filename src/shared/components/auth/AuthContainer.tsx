"use client";

import { Outfit } from "next/font/google";
import { ReactNode } from "react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

interface AuthContainerProps {
  children: ReactNode;
}

export function AuthContainer({ children }: AuthContainerProps) {
  return (
    <div
      className={`w-full flex justify-center items-center ${outfit.variable} font-sans`}
    >
      {children}
    </div>
  );
}

import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark bg-slate-950 min-h-screen flex w-full flex-grow items-center justify-center pt-32 pb-12">
      {children}
    </div>
  );
}

import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="relative w-full max-w-[768px] min-h-[480px] bg-white dark:bg-slate-900 rounded-[20px] shadow-2xl overflow-hidden">
      {children}
    </div>
  );
}

import { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  className?: string;
}

export function FormContainer({
  children,
  className = "",
}: FormContainerProps) {
  return (
    <div
      className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 bg-white dark:bg-slate-900 ${className}`}
    >
      <div className="h-full flex flex-col justify-center items-center px-10 text-center">
        {children}
      </div>
    </div>
  );
}

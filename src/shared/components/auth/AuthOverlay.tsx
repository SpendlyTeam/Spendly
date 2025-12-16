import { ReactNode } from "react";

interface AuthOverlayProps {
  isRegister: boolean;
  children: ReactNode;
}

export function AuthOverlay({ isRegister, children }: AuthOverlayProps) {
  return (
    <div
      className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-[100] ${
        isRegister ? "-translate-x-full" : ""
      }`}
    >
      <div
        className={`bg-gradient-to-r from-green-400 to-green-700 relative -left-full h-full w-[200%] transform transition-transform duration-600 ease-in-out ${
          isRegister ? "translate-x-1/2" : "translate-x-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

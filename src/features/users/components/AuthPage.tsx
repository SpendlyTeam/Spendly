"use client";

import { useState, useEffect } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { AuthContainer } from "@/shared/components/auth/AuthContainer";
import { AuthCard } from "@/shared/components/auth/AuthCard";
import { FormContainer } from "@/shared/components/auth/FormContainer";
import { AuthFormHeader } from "@/shared/components/auth/AuthFormHeader";
import { AuthOverlay } from "@/shared/components/auth/AuthOverlay";
import { OverlayPanel } from "@/shared/components/auth/OverlayPanel";

interface AuthPageProps {
  initialMode?: "login" | "register";
}

export function AuthPage({ initialMode = "login" }: AuthPageProps) {
  const [isRegister, setIsRegister] = useState(initialMode === "register");

  useEffect(() => {
    setIsRegister(initialMode === "register");
  }, [initialMode]);

  const toggleMode = () => {
    setIsRegister(!isRegister);
  };

  return (
    <AuthContainer>
      <AuthCard>
        <FormContainer
          className={
            isRegister
              ? "z-[5] opacity-100 translate-x-[100%]"
              : "opacity-0 z-[1]"
          }
        >
          <AuthFormHeader title="Register" />
          <RegisterForm />
        </FormContainer>

        <FormContainer
          className={`z-[2] ${isRegister ? "translate-x-[100%]" : ""}`}
        >
          <AuthFormHeader title="Login" />
          <LoginForm />
        </FormContainer>

        <AuthOverlay isRegister={isRegister}>
          <OverlayPanel
            title="Welcome Back!"
            description="To keep your finances on track please login with your personal info"
            buttonText="Login"
            onButtonClick={toggleMode}
            isActive={isRegister}
            side="left"
          />
          <OverlayPanel
            title="Hello, Friend!"
            description="Enter your personal details and start your journey with us"
            buttonText="Register"
            onButtonClick={toggleMode}
            isActive={!isRegister}
            side="right"
          />
        </AuthOverlay>
      </AuthCard>
    </AuthContainer>
  );
}

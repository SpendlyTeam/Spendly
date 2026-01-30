import { ForgotPasswordForm } from "@/features/users/components/ForgotPasswordForm";
import { AuthCard } from "@/shared/components/auth/AuthCard";
import { AuthContainer } from "@/shared/components/auth/AuthContainer";

export default function ForgotPasswordPage() {
  return (
    <div className="dark bg-slate-950 min-h-screen flex w-full flex-grow items-center justify-center">
      <AuthContainer>
        <AuthCard>
          <div className="w-full min-h-[480px] flex items-center justify-center p-8">
            <ForgotPasswordForm />
          </div>
        </AuthCard>
      </AuthContainer>
    </div>
  );
}

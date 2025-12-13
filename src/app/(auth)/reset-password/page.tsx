import { ResetPasswordForm } from "@/features/users/components/ResetPasswordForm";
import { AuthCard } from "@/shared/components/auth/AuthCard";
import { AuthContainer } from "@/shared/components/auth/AuthContainer";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <div className="dark bg-slate-950 min-h-screen flex w-full flex-grow items-center justify-center">
      <AuthContainer>
        <AuthCard>
          <div className="w-full h-full flex items-center justify-center p-8">
            <Suspense
              fallback={
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin w-5 h-5" />
                  Loading...
                </div>
              }
            >
              <ResetPasswordForm />
            </Suspense>
          </div>
        </AuthCard>
      </AuthContainer>
    </div>
  );
}

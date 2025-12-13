import { AuthPage } from "@/features/users/components/AuthPage";

export default function LoginPage() {
  return (
    <div className="dark bg-slate-950 min-h-screen flex w-full flex-grow items-center justify-center">
      <AuthPage initialMode="login" />
    </div>
  );
}

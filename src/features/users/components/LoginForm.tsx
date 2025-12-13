"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { PasswordInput } from "@/shared/components/PasswordInput";
import { Label } from "@/shared/components/Label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";

export function LoginForm() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const emailNotVerified = (msg: string) =>
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (emailOrUsername.includes("@")) {
      await authClient.signIn.email(
        {
          email: emailOrUsername,
          password,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
          },
          onError: (ctx) => {
            emailNotVerified(ctx.error.message);
            setLoading(false);
          },
        },
      );
    } else {
      await authClient.signIn.username(
        {
          username: emailOrUsername,
          password,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
          },
          onError: (ctx) => {
            emailNotVerified(ctx.error.message);
            setLoading(false);
          },
        },
      );
    }
  };

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleLogin}>
        <div className="grid gap-4">
          <div className="grid gap-2 text-left">
            <Label htmlFor="email">Email or Username</Label>
            <Input
              id="email"
              type="text"
              required
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="bg-gray-100 dark:bg-slate-800 border-none"
            />
          </div>
          <div className="grid gap-2 text-left">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 dark:bg-slate-800 border-none"
            />
          </div>
          <div className="flex justify-center mt-2">
            <Link
              href="/forgot-password"
              className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            >
              Forgot your password?
            </Link>
          </div>
          <Button
            className="w-full bg-green-600 hover:bg-green-700 font-bold text-white rounded-full py-6 uppercase tracking-wider mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
}

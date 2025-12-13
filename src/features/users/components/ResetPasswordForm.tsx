"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/shared/components/Button";
import { PasswordInput } from "@/shared/components/PasswordInput";
import { Label } from "@/shared/components/Label";
import { toast, Bounce } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "bottom-right",
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters", {
        position: "bottom-right",
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    if (!token) {
      toast.error("Invalid or missing reset token", {
        position: "bottom-right",
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    setLoading(true);
    try {
      await authClient.resetPassword(
        {
          newPassword,
          token,
        },
        {
          onSuccess: () => {
            setLoading(false);
            toast.success("Password reset successfully", {
              position: "bottom-right",
              theme: "dark",
              transition: Bounce,
            });
            router.push("/auth");
          },
          onError: (ctx) => {
            setLoading(false);
            toast.error(ctx.error.message, {
              position: "bottom-right",
              theme: "dark",
              transition: Bounce,
            });
          },
        },
      );
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Something went wrong. Please try again.", {
        position: "bottom-right",
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  if (!token) {
    return (
      <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold dark:text-white">Invalid Link</h3>
        <p className="text-gray-500 dark:text-gray-400">
          This password reset link is invalid or has expired.
        </p>
        <div className="pt-4">
          <Link
            href="/forgot-password"
            className="inline-flex h-12 items-center justify-center rounded-full bg-green-600 px-8 text-sm font-medium text-white shadow-lg shadow-green-500/20 transition-all hover:bg-green-700 hover:scale-[1.02]"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight dark:text-white">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Enter your new password below
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2 text-left">
            <Label
              htmlFor="password"
              className="text-gray-500 font-medium ml-1"
            >
              New Password
            </Label>
            <PasswordInput
              id="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-gray-50/50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-800 focus:ring-green-500 focus:border-green-500 transition-all rounded-xl py-6"
            />
          </div>
          <div className="grid gap-2 text-left">
            <Label
              htmlFor="confirmPassword"
              className="text-gray-500 font-medium ml-1"
            >
              Confirm Password
            </Label>
            <PasswordInput
              id="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-50/50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-800 focus:ring-green-500 focus:border-green-500 transition-all rounded-xl py-6"
            />
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-700 font-bold text-white rounded-full py-6 uppercase tracking-wider mt-4 shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02]"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Resetting...
              </span>
            ) : (
              "Reset Password"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

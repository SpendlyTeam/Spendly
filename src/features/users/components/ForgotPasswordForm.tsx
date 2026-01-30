"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { Label } from "@/shared/components/Label";
import { toast, Bounce } from "react-toastify";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authClient.requestPasswordReset(
        {
          email,
          redirectTo: "/reset-password",
        },
        {
          onSuccess: () => {
            setLoading(false);
            setSubmitted(true);
            toast.success("Reset link sent to your email", {
              position: "bottom-right",
              theme: "dark",
              transition: Bounce,
            });
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

  if (submitted) {
    return (
      <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold dark:text-white">Check your email</h3>
        <p className="text-gray-500 dark:text-gray-400">
          We have sent a password reset link to{" "}
          <span className="font-semibold text-gray-900 dark:text-gray-200">
            {email}
          </span>
          .
        </p>
        <div className="pt-4">
          <Button
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-full py-3 uppercase tracking-wider transition-colors"
            onClick={() => setSubmitted(false)}
          >
            Use different email
          </Button>
        </div>
        <div className="flex justify-center mt-4">
          <Link
            href="/auth"
            className="text-sm font-medium text-gray-400 hover:text-green-500 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight dark:text-white">
          Forgot Password?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Enter your email to receive a password reset link
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2 text-left">
            <Label htmlFor="email" className="text-gray-500 font-medium ml-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </Button>
          <div className="flex justify-center mt-6">
            <Link
              href="/auth"
              className="text-sm font-medium text-gray-400 hover:text-green-500 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

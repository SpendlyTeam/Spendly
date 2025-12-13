"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { PasswordInput } from "@/shared/components/PasswordInput";
import { Label } from "@/shared/components/Label";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await authClient.signUp.email(
      {
        email,
        password,
        name: username,
        username,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
          setLoading(false);
        },
      },
    );
  };

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleRegister}>
        <div className="grid gap-4">
          <div className="grid gap-2 text-left">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="johndoe123"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-100 dark:bg-slate-800 border-none"
            />
          </div>
          <div className="grid gap-2 text-left">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Button
            className="w-full bg-green-600 hover:bg-green-700 font-bold text-white rounded-full py-6 uppercase tracking-wider mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </Button>
        </div>
      </form>
    </div>
  );
}

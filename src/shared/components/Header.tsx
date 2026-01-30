"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import logow from "../../../public/logow.svg";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 lg:top-4 lg:left-1/2 lg:-translate-x-1/2 lg:max-w-7xl z-[1001]">
      <div className="grid grid-cols-2 lg:grid-cols-3 items-center bg-gray-900/95 backdrop-blur-md text-white px-6 py-3 rounded-none lg:rounded-full shadow-lg border border-white/5 lg:border">
        <div className="flex items-center space-x-3 justify-start">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src={logow}
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <p className="font-bold text-lg leading-none flex items-center m-0 h-10">
              <span className="text-white">Spend</span>
              <span className="text-logoGreen">ly</span>
            </p>
          </Link>
        </div>

        <nav className="hidden lg:flex justify-center">
          <ul className="flex space-x-8">
            <li className="hover:scale-105 transition-transform">
              <Link
                href="/"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Overview
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 justify-end">
          {session && (
            <button
              onClick={handleLogout}
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              <LogOut size={16} />
              Log out
            </button>
          )}

          <Link
            href={session ? "/dashboard" : "/auth"}
            className="hidden lg:block bg-white text-gray-900 px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors"
          >
            {session ? "Dashboard" : "Account"}
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-1 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-4 lg:hidden">
          <nav className="flex flex-col space-y-4 p-2">
            <Link
              href="/"
              className="px-4 py-3 rounded-xl text-gray-200 hover:bg-white/10 hover:text-white transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href={session ? "/dashboard" : "/auth"}
              className="px-4 py-3 rounded-xl bg-logoGreen/20 text-logoGreen hover:bg-logoGreen/30 transition-colors font-bold text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {session ? "Dashboard" : "Account"}
            </Link>

            {session && (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-gray-200 hover:bg-white/10 hover:text-white transition-colors font-medium w-full"
              >
                <LogOut size={18} />
                Log out
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

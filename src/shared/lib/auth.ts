import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import db from "@/shared/lib/db";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  trustedOrigins: [
    "http://localhost:3000",
    "spendlyapp-b4c6a.web.app",
    "spendlyapp-b4c6a.firebaseapp.com",
  ],
  plugins: [nextCookies()],
});

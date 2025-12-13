import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

import { Resend } from "resend";
import { getWelcomeEmailHtml } from "./email-templates/welcome-email";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Spendly <account@notify.spendly.fun>",
        to: user.email,
        subject: "Verify your email address",
        html: getWelcomeEmailHtml(url),
      });
    },
  },
  plugins: [username()],
});

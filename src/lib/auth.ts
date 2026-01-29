import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { getResetPasswordEmailHtml } from "./email-templates/reset-password";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

import { Resend } from "resend";
import { getWelcomeEmailHtml } from "./email-templates/welcome-email";

const EMAIL_SENDER_NAME = process.env.EMAIL_SENDER_NAME || "Spendly";
const EMAIL_SENDER_ADDRESS =
  process.env.EMAIL_SENDER_ADDRESS || "account@notify.spendly.fun";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: `${EMAIL_SENDER_NAME} <${EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: "Reset your password",
        html: getResetPasswordEmailHtml(url),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: `${EMAIL_SENDER_NAME} <${EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: "Verify your email address",
        html: getWelcomeEmailHtml(url),
      });
    },
  },
  plugins: [username()],
});

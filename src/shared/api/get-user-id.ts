import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getUserIdOrThrow() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.id) {
    return session.user.id;
  }

  const DEMO_USER_ID = process.env.DEMO_USER_ID;
  if (!DEMO_USER_ID) throw new Error("Missing DEMO_USER_ID in .env");
  return DEMO_USER_ID;
}

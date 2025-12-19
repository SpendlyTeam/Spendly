import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getUserIdOrThrow() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.id) {
    return session.user.id;
  }
}

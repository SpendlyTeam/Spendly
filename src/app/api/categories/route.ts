import { NextResponse } from "next/server";
import { prisma } from "@/shared/api/prisma";
import { getUserIdOrThrow } from "@/shared/api/get-user-id";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

export async function GET() {
  const userId = await getUserIdOrThrow();

  const categories = await prisma.category.findMany({
    where: { userId },
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true, color: true },
  });

  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const userId = await getUserIdOrThrow();
  const body = await req.json();

  const name = String(body.name ?? "").trim();
  const color = body.color ? String(body.color) : null;

  if (!name) {
    return NextResponse.json({ message: "Invalid name" }, { status: 400 });
  }

  let baseSlug = slugify(body.slug ? String(body.slug) : name);
  if (!baseSlug) baseSlug = "category";

  let slug = baseSlug;
  for (let i = 2; i < 50; i++) {
    const exists = await prisma.category.findFirst({
      where: { userId, slug },
      select: { id: true },
    });
    if (!exists) break;
    slug = `${baseSlug}-${i}`;
  }

  const created = await prisma.category.create({
    data: {
      userId,
      name,
      slug,
      color,
    },
    select: { id: true, name: true, slug: true, color: true },
  });

  return NextResponse.json(created, { status: 201 });
}

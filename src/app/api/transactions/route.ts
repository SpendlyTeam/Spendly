import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/shared/api/prisma";
import { getUserIdOrThrow } from "@/shared/api/get-user-id";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const userId = await getUserIdOrThrow();

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const where: Prisma.TransactionWhereInput = { userId };
  if (from || to) {
    const dateFilter: Prisma.DateTimeFilter = {};
    if (from) dateFilter.gte = new Date(from);
    if (to) dateFilter.lte = new Date(to);
    where.date = dateFilter;
  }

  const transactions = await prisma.transaction.findMany({
    where,
    include: {
      category: { select: { id: true, name: true, slug: true, color: true } },
    },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const userId = await getUserIdOrThrow();

  const body = await req.json();

  const amountCents = Number(body.amountCents);
  const categoryId = String(body.categoryId);
  const date = new Date(body.date);

  if (!Number.isFinite(amountCents) || amountCents <= 0) {
    return NextResponse.json(
      { message: "Invalid amountCents" },
      { status: 400 },
    );
  }
  if (!categoryId) {
    return NextResponse.json(
      { message: "Invalid categoryId" },
      { status: 400 },
    );
  }
  if (Number.isNaN(date.getTime())) {
    return NextResponse.json({ message: "Invalid date" }, { status: 400 });
  }

  const cat = await prisma.category.findFirst({
    where: { id: categoryId, userId },
    select: { id: true },
  });
  if (!cat)
    return NextResponse.json(
      { message: "Category not found" },
      { status: 404 },
    );

  const created = await prisma.transaction.create({
    data: {
      userId,
      categoryId,
      amountCents,
      date,
      description: body.description ?? null,
    },
    include: {
      category: { select: { id: true, name: true, slug: true, color: true } },
    },
  });

  return NextResponse.json(created, { status: 201 });
}

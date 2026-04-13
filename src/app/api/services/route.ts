import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      title: true,
      shortDescription: true,
      icon: true,
      slug: true,
    },
  });
  return NextResponse.json(services);
}

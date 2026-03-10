import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    await requireAuth();

    const where = {
      path: { not: { startsWith: "/dash" } },
      NOT: { ip: { in: ["127.0.0.1", "::1", "localhost"] } },
    };

    const visits = await prisma.visit.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    const total = await prisma.visit.count({ where });

    return NextResponse.json({ total, visits });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }
    console.error("GET /api/analytics/visits error", error);
    return NextResponse.json(
      { message: "Erro ao carregar visitas." },
      { status: 500 },
    );
  }
}


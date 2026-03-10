import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    await requireAuth();

    const messages = await prisma.contactMessage.findMany({
      orderBy: [{ createdAt: "desc" }],
    });

    return NextResponse.json(messages);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }
    console.error("GET /api/messages error", error);
    return NextResponse.json({ message: "Erro ao listar mensagens." }, { status: 500 });
  }
}


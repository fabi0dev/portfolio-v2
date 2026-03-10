import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error("GET /api/skills error", error);
    return NextResponse.json({ message: "Erro ao listar skills." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const category = typeof body.category === "string" ? body.category.trim() : "";
    const order = typeof body.order === "number" ? body.order : 0;

    if (!name || !category) {
      return NextResponse.json({ message: "Nome e categoria são obrigatórios." }, { status: 400 });
    }

    const skill = await prisma.skill.create({
      data: { name, category, order },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }
    console.error("POST /api/skills error", error);
    return NextResponse.json({ message: "Erro ao criar skill." }, { status: 500 });
  }
}


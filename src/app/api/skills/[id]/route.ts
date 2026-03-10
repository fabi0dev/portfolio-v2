import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAuth();
    const body = await request.json();

    const { id } = await context.params;

    const name = typeof body.name === "string" ? body.name.trim() : undefined;
    const category = typeof body.category === "string" ? body.category.trim() : undefined;
    const order = typeof body.order === "number" ? body.order : undefined;

    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = name;
    if (category !== undefined) data.category = category;
    if (order !== undefined) data.order = order;

    const skill = await prisma.skill.update({
      where: { id },
      data,
    });

    return NextResponse.json(skill);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }
    console.error("PUT /api/skills/[id] error", error);
    return NextResponse.json({ message: "Erro ao atualizar skill." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    await requireAuth();

    const { id } = await context.params;

    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Skill removida com sucesso." });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }
    console.error("DELETE /api/skills/[id] error", error);
    return NextResponse.json({ message: "Erro ao remover skill." }, { status: 500 });
  }
}


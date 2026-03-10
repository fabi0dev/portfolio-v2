import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await requireAuth();
    const body = await request.json();

    const title = typeof body.title === "string" ? body.title.trim() : undefined;
    const description =
      typeof body.description === "string" ? body.description.trim() : undefined;
    const tags = Array.isArray(body.tags) ? body.tags : undefined;
    const image = typeof body.image === "string" ? body.image.trim() : undefined;
    const githubUrl =
      typeof body.githubUrl === "string" ? body.githubUrl.trim() : undefined;
    const deployUrl =
      typeof body.deployUrl === "string" ? body.deployUrl.trim() : undefined;
    const order = typeof body.order === "number" ? body.order : undefined;

    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (tags !== undefined) data.tags = JSON.stringify(tags);
    if (image !== undefined) data.image = image;
    if (githubUrl !== undefined) data.githubUrl = githubUrl;
    if (deployUrl !== undefined) data.deployUrl = deployUrl;
    if (order !== undefined) data.order = order;

    const project = await prisma.project.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({
      ...project,
      tags: JSON.parse(project.tags || "[]"),
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }
    console.error("PUT /api/projects/[id] error", error);
    return NextResponse.json({ message: "Erro ao atualizar projeto." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    await requireAuth();

    await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Projeto removido com sucesso." });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }
    console.error("DELETE /api/projects/[id] error", error);
    return NextResponse.json({ message: "Erro ao remover projeto." }, { status: 500 });
  }
}


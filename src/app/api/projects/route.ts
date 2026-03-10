import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    return NextResponse.json(
      projects.map((project) => ({
        ...project,
        tags: JSON.parse(project.tags || "[]"),
      })),
    );
  } catch (error) {
    console.error("GET /api/projects error", error);
    return NextResponse.json({ message: "Erro ao listar projetos." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();

    const title = typeof body.title === "string" ? body.title.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const tags = Array.isArray(body.tags) ? body.tags : [];
    const image = typeof body.image === "string" ? body.image.trim() : null;
    const githubUrl = typeof body.githubUrl === "string" ? body.githubUrl.trim() : null;
    const deployUrl = typeof body.deployUrl === "string" ? body.deployUrl.trim() : null;
    const order = typeof body.order === "number" ? body.order : 0;

    if (!title || !description) {
      return NextResponse.json(
        { message: "Título e descrição são obrigatórios." },
        { status: 400 },
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        tags: JSON.stringify(tags),
        image: image || undefined,
        githubUrl: githubUrl || undefined,
        deployUrl: deployUrl || undefined,
        order,
      },
    });

    return NextResponse.json(
      {
        ...project,
        tags,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }
    console.error("POST /api/projects error", error);
    return NextResponse.json({ message: "Erro ao criar projeto." }, { status: 500 });
  }
}


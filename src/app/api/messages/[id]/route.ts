import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ContactStatus } from "@prisma/client";

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await requireAuth();
    const body = await request.json();

    const status = body.status as ContactStatus | undefined;

    if (!status || !Object.values(ContactStatus).includes(status)) {
      return NextResponse.json({ message: "Status inválido." }, { status: 400 });
    }

    const message = await prisma.contactMessage.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(message);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }
    console.error("PATCH /api/messages/[id] error", error);
    return NextResponse.json({ message: "Erro ao atualizar mensagem." }, { status: 500 });
  }
}


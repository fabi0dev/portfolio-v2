import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const userFromToken = await requireAuth();

    const body = await request.json();
    const currentPassword =
      typeof body.currentPassword === "string" ? body.currentPassword : "";
    const newPassword =
      typeof body.newPassword === "string" ? body.newPassword : "";

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Dados inválidos." },
        { status: 400 },
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "A nova senha deve ter pelo menos 8 caracteres." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userFromToken.id },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 404 },
      );
    }

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { message: "Senha atual incorreta." },
        { status: 401 },
      );
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: newHash,
      },
    });

    return NextResponse.json(
      { message: "Senha alterada com sucesso." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Change password error", error);
    return NextResponse.json(
      { message: "Erro ao alterar a senha." },
      { status: 500 },
    );
  }
}


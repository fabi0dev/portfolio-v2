import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

function validateEmail(email: string) {
  if (!email || email.length > 254) return false;
  return EMAIL_REGEX.test(email);
}

function looksLikeSpam(message: string) {
  const lower = message.toLowerCase();

  if (/(http|https):\/\/|www\./.test(lower)) return true;
  if (/(viagra|bitcoin|casino|porn)/.test(lower)) return true;
  if (/(earn money fast|work from home|get rich quick)/.test(lower)) return true;

  const words = lower.split(/\s+/);
  const uniqueWords = new Set(words);
  if (uniqueWords.size && words.length / uniqueWords.size > 5) return true;

  return false;
}

function getClientInfo(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    (request as any).ip ||
    null;

  const userAgent = request.headers.get("user-agent") || null;

  return { ip, userAgent };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const rawEmail = typeof body.email === "string" ? body.email.trim() : "";
    const email = rawEmail.toLowerCase();
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!validateEmail(email)) {
      return NextResponse.json({ message: "E-mail inválido." }, { status: 400 });
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { message: "Mensagem deve ter entre 10 e 2000 caracteres." },
        { status: 400 },
      );
    }

    if (looksLikeSpam(message)) {
      return NextResponse.json(
        { message: "Mensagem identificada como potencial spam." },
        { status: 400 },
      );
    }

    const { ip, userAgent } = getClientInfo(request);

    await prisma.contactMessage.create({
      data: {
        email,
        message,
        ip: ip || undefined,
        userAgent: userAgent || undefined,
      },
    });

    return NextResponse.json(
      { message: "Mensagem enviada com sucesso. Obrigado pelo contato!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/contact error", error);
    return NextResponse.json({ message: "Erro ao enviar mensagem." }, { status: 500 });
  }
}


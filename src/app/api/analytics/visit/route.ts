import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const path =
      typeof body.path === "string" && body.path.length > 0
        ? body.path
        : "/";
    const durationMs =
      typeof body.durationMs === "number" && Number.isFinite(body.durationMs)
        ? Math.max(0, Math.round(body.durationMs))
        : null;

    const forwardedFor =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      null;
    const ip =
      forwardedFor?.split(",")[0]?.trim() ??
      // @ts-expect-error - ip may be provided by some runtimes
      (request.ip as string | undefined) ??
      null;

    if (path.startsWith("/dash")) {
      return NextResponse.json({ ok: true });
    }
    const isLocalhost =
      ip === "127.0.0.1" || ip === "::1" || ip === "localhost";
    if (isLocalhost) {
      return NextResponse.json({ ok: true });
    }

    const userAgent = request.headers.get("user-agent") ?? null;

    await prisma.visit.create({
      data: {
        path,
        ip: ip ?? undefined,
        userAgent: userAgent ?? undefined,
        durationMs: durationMs ?? undefined,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/analytics/visit error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}


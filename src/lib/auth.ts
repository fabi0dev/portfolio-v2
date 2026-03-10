import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

export const AUTH_COOKIE_NAME = "portfolio_auth";

const AUDIENCE = "portfolio-dashboard";
const ISSUER = "portfolio-app";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET (ou JWT_SECRET) não configurado.");
  }
  return new TextEncoder().encode(secret);
}

export type AuthTokenPayload = {
  sub: string;
  email: string;
};

export async function createAuthToken(payload: AuthTokenPayload) {
  const secret = getSecretKey();

  const token = await new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setAudience(AUDIENCE)
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return token;
}

export async function getAuthUserFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret, {
      audience: AUDIENCE,
      issuer: ISSUER,
    });

    return {
      id: payload.sub as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getAuthUserFromCookies();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}


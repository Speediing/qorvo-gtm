import { NextResponse } from "next/server";
import { AUTH_COOKIE, passwordMatches, sessionToken } from "@/lib/auth";

function safeNext(
  value: string | null | undefined,
  requestUrl: string,
): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return "/";
  }
  try {
    const base = new URL(requestUrl);
    const target = new URL(value, base);
    if (target.origin !== base.origin) {
      return "/";
    }
    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return "/";
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  let password = "";
  let next = "/";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { password?: string; next?: string };
    password = body.password || "";
    next = safeNext(body.next, request.url);
  } else {
    const form = await request.formData();
    password = String(form.get("password") || "");
    next = safeNext(String(form.get("next") || "/"), request.url);
  }

  if (!passwordMatches(password)) {
    if (contentType.includes("application/json")) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    const err = new URL("/login", request.url);
    err.searchParams.set("error", "1");
    if (next !== "/") err.searchParams.set("next", next);
    return NextResponse.redirect(err, { status: 303 });
  }

  const response = contentType.includes("application/json")
    ? NextResponse.json({ ok: true, next })
    : NextResponse.redirect(new URL(next, request.url), { status: 303 });

  response.cookies.set(AUTH_COOKIE, await sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}

import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/contact-schema";
import { EmailNotConfiguredError, sendInquiryEmails } from "@/lib/email";

/* Simple per-IP limit: 5 submissions per 10 minutes per server instance. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot filled in: pretend success so bots learn nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendInquiryEmails(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof EmailNotConfiguredError) {
      console.error("[contact]", error.message);
      return NextResponse.json(
        { ok: false, error: "Our email service isn't configured yet. Please email us directly." },
        { status: 503 },
      );
    }
    console.error("[contact] failed to send email", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message right now. Please try again shortly." },
      { status: 502 },
    );
  }
}

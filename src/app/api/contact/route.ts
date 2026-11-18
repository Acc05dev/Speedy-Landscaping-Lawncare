import { NextResponse } from "next/server";

/**
 * Receives the estimate form and forwards it to CONTACT_WEBHOOK_URL.
 *
 * TODO (before launch): set CONTACT_WEBHOOK_URL in Vercel to a form endpoint that emails
 * the owner, for example a Formspree form URL or a Zapier / Make webhook. Until it is set
 * this route answers 503 and the form tells visitors to call or text instead.
 */

type Payload = Record<string, unknown>;

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot field: real visitors never fill it in.
  if (text(data.company, 200)) return NextResponse.json({ ok: true });

  const lead = {
    name: text(data.name, 120),
    phone: text(data.phone, 40),
    email: text(data.email, 160),
    location: text(data.location, 120),
    service: text(data.service, 120),
    message: text(data.message, 3000),
  };

  if (!lead.name || !lead.phone) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...lead, _subject: `New estimate request: ${lead.service || "website"}` }),
    });
    if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}

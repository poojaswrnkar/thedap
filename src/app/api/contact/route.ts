import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/data/site";
import { destinationOptions } from "@/data/home";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  mobile_no?: string;
  destination?: string;
  message?: string;
  /** Honeypot — real users never fill this. */
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,19}$/;

function esc(v: string) {
  return v.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  // Silently accept honeypot hits so bots don't learn anything.
  if (body.company) {
    return NextResponse.json({ success: true, message: "Thank you! Your message was sent. ✈️" });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.mobile_no ?? "").trim();
  const destination = (body.destination ?? "").trim();
  const message = (body.message ?? "").trim();

  const errors: string[] = [];
  if (name.length < 2 || name.length > 100) errors.push("a valid name");
  if (!EMAIL_RE.test(email)) errors.push("a valid email");
  if (!PHONE_RE.test(phone)) errors.push("a valid phone number");
  if (!destinationOptions.includes(destination)) errors.push("a destination");
  if (message.length < 5 || message.length > 3000) errors.push("a short note about your trip");

  if (errors.length) {
    return NextResponse.json(
      { success: false, message: `Please provide ${errors.join(", ")}.` },
      { status: 422 },
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

  // No mail transport configured — don't pretend the enquiry was delivered.
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn("[contact] SMTP not configured; enquiry not delivered:", {
      name,
      email,
      phone,
      destination,
    });
    return NextResponse.json(
      {
        success: false,
        message: `Our online form isn't connected yet. Please call ${site.contact.phoneIntl} or email ${site.contact.email} — we'll respond right away.`,
      },
      { status: 503 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: Number(SMTP_PORT ?? 587) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"${site.name} Website" <${SMTP_USER}>`,
      to: CONTACT_TO ?? site.contact.email,
      replyTo: `"${name}" <${email}>`,
      subject: `New trip enquiry — ${destination} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDestination: ${destination}\n\n${message}`,
      html: `
        <h2 style="font-family:sans-serif">New trip enquiry</h2>
        <table style="font-family:sans-serif;border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0"><b>Name</b></td><td>${esc(name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Email</b></td><td>${esc(email)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Phone</b></td><td>${esc(phone)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Destination</b></td><td>${esc(destination)}</td></tr>
        </table>
        <p style="font-family:sans-serif;white-space:pre-wrap">${esc(message)}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Thank you! Your message was sent. ✈️" });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      {
        success: false,
        message: `We couldn't send that just now. Please call ${site.contact.phoneIntl} and we'll help straight away.`,
      },
      { status: 502 },
    );
  }
}

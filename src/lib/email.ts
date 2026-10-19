import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import type { Inquiry } from "./contact-schema";

/**
 * Gmail SMTP transport.
 *
 * Required environment variables (see .env.example):
 *   GMAIL_USER          the Gmail / Google Workspace address that sends mail
 *   GMAIL_APP_PASSWORD  a 16-character Google App Password (not your normal password)
 *   CONTACT_TO_EMAIL    where new inquiries are delivered (defaults to GMAIL_USER)
 */
let transporter: Transporter | null = null;

export class EmailNotConfiguredError extends Error {
  constructor() {
    super("Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local.");
  }
}

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !pass) throw new EmailNotConfiguredError();

  transporter ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
  return transporter;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr>
    <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:160px;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;white-space:pre-wrap">${escapeHtml(value)}</td>
  </tr>`;
}

function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 12px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0">
        <tr><td style="background:linear-gradient(120deg,#06b6d4,#2563eb,#4f46e5);background-color:#2563eb;padding:24px 28px">
          <div style="color:#ffffff;font-size:20px;font-weight:bold">TalentBridge US-BD</div>
          <div style="color:#e0f2fe;font-size:13px;margin-top:4px">${escapeHtml(title)}</div>
        </td></tr>
        <tr><td style="padding:24px 28px">${body}</td></tr>
        <tr><td style="padding:16px 28px;background:#f8fafc;color:#94a3b8;font-size:12px">
          TalentBridge US-BD Solutions Inc. · Austin, TX · Dhaka, Bangladesh
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

function describe(inquiry: Inquiry) {
  if (inquiry.type === "booking") {
    return {
      subject: `New strategy call booking: ${inquiry.name}${inquiry.company ? ` (${inquiry.company})` : ""}`,
      title: "New strategy call request",
      rows: [
        row("Name", inquiry.name),
        row("Email", inquiry.email),
        row("Company", inquiry.company),
        row("Preferred date", inquiry.date),
        row("Preferred time", `${inquiry.time} · ${inquiry.timezone}`),
      ],
      text: `Name: ${inquiry.name}\nEmail: ${inquiry.email}\nCompany: ${inquiry.company}\nDate: ${inquiry.date}\nTime: ${inquiry.time} ${inquiry.timezone}`,
    };
  }
  return {
    subject: `New consultation request: ${inquiry.name}${inquiry.company ? ` (${inquiry.company})` : ""}`,
    title: "New consultation request",
    rows: [
      row("Name", inquiry.name),
      row("Email", inquiry.email),
      row("Company", inquiry.company),
      row("Growth goal", inquiry.goal),
      row("Message", inquiry.message),
      row("Submitted from", inquiry.source),
    ],
    text: `Name: ${inquiry.name}\nEmail: ${inquiry.email}\nCompany: ${inquiry.company}\nGoal: ${inquiry.goal}\nSource: ${inquiry.source}\n\n${inquiry.message}`,
  };
}

export async function sendInquiryEmails(inquiry: Inquiry) {
  const mailer = getTransporter();
  const from = process.env.GMAIL_USER!;
  const to = process.env.CONTACT_TO_EMAIL || from;
  const info = describe(inquiry);

  // 1) Notify the TalentBridge team.
  await mailer.sendMail({
    from: `"TalentBridge Website" <${from}>`,
    to,
    replyTo: `"${inquiry.name.replace(/"/g, "")}" <${inquiry.email}>`,
    subject: info.subject,
    text: info.text,
    html: layout(
      info.title,
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${info.rows.join("")}</table>
       <p style="color:#64748b;font-size:12px;margin-top:20px">Reply to this email to respond directly to ${escapeHtml(inquiry.name)}.</p>`,
    ),
  });

  // 2) Confirmation to the visitor. A failure here shouldn't fail the request.
  const confirmation =
    inquiry.type === "booking"
      ? `We've received your request for a strategy call on <b>${escapeHtml(inquiry.date)}</b> at <b>${escapeHtml(inquiry.time)} (${escapeHtml(inquiry.timezone)})</b>. A workforce strategist will email you a calendar invite within one business day.`
      : "Thanks for reaching out. A TalentBridge client representative will get back to you within 24 hours with next steps.";

  try {
    await mailer.sendMail({
      from: `"TalentBridge US-BD" <${from}>`,
      to: inquiry.email,
      subject: inquiry.type === "booking" ? "Your TalentBridge strategy call request" : "We received your message",
      text: confirmation.replace(/<[^>]+>/g, ""),
      html: layout(
        "Thanks for contacting us",
        `<p style="color:#0f172a;font-size:15px;line-height:1.6">Hi ${escapeHtml(inquiry.name.split(" ")[0])},</p>
         <p style="color:#334155;font-size:14px;line-height:1.7">${confirmation}</p>
         <p style="color:#334155;font-size:14px;line-height:1.7">— The TalentBridge US-BD team</p>`,
      ),
    });
  } catch (error) {
    console.error("[email] confirmation email failed", error);
  }
}

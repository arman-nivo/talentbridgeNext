import { z } from "zod";

export const GROWTH_GOALS = [
  "Hire 1-5 engineers / specialists",
  "Hire 6-20 (scale team)",
  "Full enterprise managed hub",
  "Workforce analytics consulting",
] as const;

export const TIMEZONES = ["US Central (CT)", "US Eastern (ET)", "US Mountain (MT)", "US Pacific (PT)"] as const;

const name = z.string().trim().min(2, "Please enter your name").max(100);
const email = z.email({ error: "Please enter a valid work email" }).max(200);
/**
 * Hidden field that real visitors never fill in. Bots usually do.
 * It is accepted here and checked in the API route, which silently drops the message.
 */
const honeypot = z.string().max(500).optional().default("");

export const contactSchema = z.object({
  type: z.literal("contact"),
  name,
  email,
  company: z.string().trim().max(150).optional().default(""),
  goal: z.enum(GROWTH_GOALS, { error: "Please choose a growth goal" }),
  message: z.string().trim().max(5000).optional().default(""),
  source: z.string().trim().max(200).optional().default(""),
  website: honeypot,
});

export const bookingSchema = z.object({
  type: z.literal("booking"),
  name,
  email,
  company: z.string().trim().max(150).optional().default(""),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date"),
  time: z.string().trim().min(1, "Please choose a time").max(20),
  timezone: z.enum(TIMEZONES, { error: "Please choose a timezone" }),
  website: honeypot,
});

export const inquirySchema = z.discriminatedUnion("type", [contactSchema, bookingSchema]);

export type ContactInput = z.input<typeof contactSchema>;
export type BookingInput = z.input<typeof bookingSchema>;
export type Inquiry = z.output<typeof inquirySchema>;

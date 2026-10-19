# TalentBridge US-BD website

A Next.js 16 rebuild of the TalentBridge single-page design, with separate pages for each section, a light/dark theme toggle (dark by default), sliders, and contact and booking forms that send email through Gmail SMTP.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the Gmail values
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Email setup (Gmail SMTP)

The contact form and the "Book a strategy call" dialog both post to `/api/contact`. That route validates the input, then sends two emails through `smtp.gmail.com:465`:

1. A notification to your team, with Reply-To set to the visitor.
2. A confirmation to the visitor.

To enable it:

1. Use a Gmail or Google Workspace account with **2-Step Verification** turned on.
2. Create an **App Password** at https://myaccount.google.com/apppasswords.
3. Put these values in `.env.local`, or in your hosting provider's environment settings:

| Variable | Purpose |
| --- | --- |
| `GMAIL_USER` | The Gmail address that sends the emails |
| `GMAIL_APP_PASSWORD` | The 16-character App Password, not your normal password |
| `CONTACT_TO_EMAIL` | Inbox that receives new inquiries. Defaults to `GMAIL_USER` |

Without these variables the forms show a friendly "email isn't configured" message, and the server logs the reason.

The route also has a hidden honeypot field for bots and a basic per-IP rate limit of 5 submissions per 10 minutes.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero image slider, stats, logo marquee, capabilities slider, dashboard, live Austin-Dhaka clocks, ROI calculator, testimonials slider |
| `/capabilities` | All five pillars with deep-dive sections |
| `/capabilities/[slug]` | One page per pillar: metrics, features, process, gallery slider, FAQ, related pillars slider |
| `/roi-calculator` | Full calculator with team size, tier and engagement-length sliders |
| `/us-bd-model` | Advantages, 24-hour cycle, talent roles slider, compliance |
| `/case-studies` | Client stories and testimonials slider |
| `/about` | Mission, values, timeline, culture gallery slider, hubs |
| `/contact` | Contact form, office details and maps |

## Where to edit things

- **Text, stats, testimonials, case studies, images:** `src/lib/data.ts`
- **Colors for light and dark themes:** the CSS variables at the top of `src/app/globals.css`
- **Email templates:** `src/lib/email.ts`
- **Form fields and validation:** `src/lib/contact-schema.ts`

Images are loaded from Unsplash through `next/image`. To use your own photos, put them in `public/` and change the paths in `src/lib/data.ts`.

## Before going live

The testimonials, case studies, client names and headline numbers came from the original design mock-up or were written as sample content. Replace them with real, approved client quotes and verified figures before launch.

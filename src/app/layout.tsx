import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { themeInitScript } from "@/components/theme/theme";
import { BookingProvider } from "@/components/booking/booking-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "TalentBridge US-BD | Cross-Border Workforce & Talent Intelligence",
    template: "%s | TalentBridge US-BD",
  },
  description:
    "We connect fast-scaling US companies with top 1% tech talent in Bangladesh, backed by smart onboarding, data-driven optimisation and predictive retention analytics.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050a16" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fb" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The theme class is set before paint by themeInitScript; default is dark.
    <html lang="en" className={`dark ${jakarta.variable} ${grotesk.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen overflow-x-hidden font-sans antialiased">
        <BookingProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-surface-solid focus:px-4 focus:py-2 focus:text-fg"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}

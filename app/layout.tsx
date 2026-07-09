import type { Metadata } from "next";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* Display face: Oswald — condensed, bold, athletic. Reads like the
   numbering on a jersey or a stenciled ground marker. Headings only. */
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

/* Body face: Inter — clean and legible for course details, eligibility,
   and dates. Disappears into the background so content stays scannable. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

/* Utility face: JetBrains Mono — stats, timers, dates. Gives the page
   a stopwatch / scoreboard feel that fits a physical-training academy. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-utility",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lakhisarai Physical Academy | Army, Police & SSC GD Physical Training",
  description:
    "Professional physical training for Army, Bihar Police, Daroga, SSC GD, CISF, CRPF and BSF recruitment. Disciplined coaching, expert guidance, and hostel facility in Lakhisarai, Bihar.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
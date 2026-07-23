// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import LoadingProvider from "./components/LoadingProvider";
import LayoutChrome from "./components/LayoutChrome";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-poppins", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Lakhisarai Physical Academy",
    template: "%s | Lakhisarai Physical Academy",
  },
  description:
    "Disciplined physical training for Army, Bihar Police, Daroga (SI), SSC GD, CISF, CRPF, and BSF recruitment tests in Lakhisarai, Bihar.",
};

export const viewport: Viewport = {
  themeColor: "#f4f6fa",
  width: "device-width",
  initialScale: 1,
};

const themeInitScript = `
  (function() {
    try {
      var pref = localStorage.getItem('theme') || 'system';
      var resolved = pref === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : pref;
      document.documentElement.setAttribute('data-theme', resolved);
      document.documentElement.style.colorScheme = resolved;
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <LoadingProvider>
            <LayoutChrome>{children}</LayoutChrome>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
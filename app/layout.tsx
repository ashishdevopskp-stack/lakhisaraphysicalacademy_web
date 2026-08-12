// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import LoadingProvider from "./components/LoadingProvider";
import LayoutChrome from "./components/LayoutChrome";
import ContentProtection from "./components/ContentProtection";
import { TricolorProgress } from "./components/TricolorProgress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-poppins", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-jetbrains-mono", display: "swap" });

import { LAKHISARAI_SEO_KEYWORDS } from "./lib/seo-keywords";

const SITE_URL = "https://lakhisaraphysicalacademy.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lakhisarai Physical Academy | Best Physical & Defence Academy in Lakhisarai Bihar",
    template: "%s | Lakhisarai Physical Academy",
  },
  description:
    "Lakhisarai Physical Academy (लखीसराय फिजिकल एकेडमी) - No.1 Best Physical Academy in Lakhisarai & Bihar for Indian Army Agniveer, Bihar Police Constable, SI (Daroga), SSC GD & Defence physical test training at K.R.K Field Lakhisarai.",
  keywords: LAKHISARAI_SEO_KEYWORDS,
  authors: [{ name: "Lakhisarai Physical Academy", url: SITE_URL }],
  creator: "Ganesh Sir & Mahesh Sir",
  publisher: "Lakhisarai Physical Academy",
  category: "Sports & Defence Physical Training Education",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "hi-IN": `${SITE_URL}?lang=hi`,
      "en-IN": `${SITE_URL}?lang=en`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    url: SITE_URL,
    title: "Lakhisarai Physical Academy | Best Army & Bihar Police Training Academy",
    description:
      "Join Bihar's #1 best training academy at K.R.K Field Lakhisarai. Specialized Indian Army Agniveer, Bihar Police, SI, SSC GD physical ground preparation under expert military coaches.",
    siteName: "Lakhisarai Physical Academy",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Lakhisarai Physical Academy - Best Army Training Academy Bihar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lakhisarai Physical Academy | Best Training Academy",
    description:
      "Bihar's #1 Army & Police Physical Training Academy at K.R.K Field Lakhisarai. 1200+ Selections in Bihar Police, Agniveer & SSC GD.",
    images: [`${SITE_URL}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: ["5Hi9ejRfkH9BJm-i-RJL7F2v18qsOM9nxnQ1CfmMnqk", "googlec99dd0ccfd3361d6"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FF9933",
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
        {/* Google Search Console Verification Tag */}
        <meta name="google-site-verification" content="5Hi9ejRfkH9BJm-i-RJL7F2v18qsOM9nxnQ1CfmMnqk" />
        {/* Geo-location Meta Tags for Top Local & Area-Wise Search Rankings */}
        <meta name="geo.region" content="IN-BR" />
        <meta name="geo.placename" content="Lakhisarai, Bihar, India" />
        <meta name="geo.position" content="25.1673;86.0945" />
        <meta name="ICBM" content="25.1673, 86.0945" />
      </head>
      <body>
        <TricolorProgress />
        <ThemeProvider>
          <LoadingProvider>
            <ContentProtection />
            <LayoutChrome>{children}</LayoutChrome>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
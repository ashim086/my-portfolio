import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/layout/theme-provider";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://www.ashimmagar.com.np";
const SITE_NAME = "Ashim Thapa Magar — Full-Stack Web Developer";
const SITE_DESCRIPTION =
  "Ashim Thapa Magar (Ashim Magar) — Full-stack MERN developer from Nepal. React, Next.js, Node.js & MongoDB expert.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | Ashim Thapa Magar",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Ashim Thapa Magar",
    "Ashim Magar",
    "Ashim Thapa",
    "ashimmagar",
    "ashim magar portfolio",
    "ashim thapa magar portfolio",
    "ashim thapa portfolio",
    "ashim magar developer",
    "ashim magar web developer",
    "web developer Nepal",
    "full-stack developer Nepal",
    "MERN developer Nepal",
    "React developer Nepal",
    "Next.js developer Nepal",
    "Node.js developer Nepal",
    "frontend developer Nepal",
    "Nepal software engineer",
    "ashimmagar.com.np",
    "hire web developer Nepal",
  ],
  authors: [{ name: "Ashim Thapa Magar", url: SITE_URL }],
  creator: "Ashim Thapa Magar",
  publisher: "Ashim Thapa Magar",
  icons: {
    icon: "/ash.jpg",
    apple: "/ash.jpg",
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Ashim Thapa Magar",
    title: "Ashim Thapa Magar — Web Developer Portfolio",
    description:
      "Full-stack MERN developer from Nepal. React, Next.js, Node.js & MongoDB.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashim Thapa Magar — Web Developer Portfolio",
    description:
      "Full-stack MERN developer from Nepal. React, Next.js, Node.js & MongoDB.",
    creator: "@ashimmagar94524",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  verification: {
    google: "vDxZG4jAoqaL6ItML-p1Xj2Y9Vf72Z2JGColGE7xUow",
    other: { "msvalidate.01": "ADA0E6209815A2A6C8AC3E0370C5E8A5" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EEEFE9" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const themeInitScript = `
(function() {
  try {
    var t = localStorage.getItem('theme') || 'system';
    var d = t === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : t;
    document.documentElement.setAttribute('data-theme', d);
  } catch (e) {}
})();
`.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Ashim Thapa Magar",
        alternateName: ["Ashim Magar", "Ashim Thapa", "ashimmagar"],
        url: SITE_URL,
        image: `${SITE_URL}/ash.jpg`,
        jobTitle: "Full-Stack Web Developer",
        description: SITE_DESCRIPTION,
        sameAs: [
          "https://github.com/ashim086",
          "https://www.linkedin.com/in/ashim-thapamagar-875090360/",
          "https://x.com/ashimmagar94524",
          "https://www.instagram.com/ashim__thapa_/",
          "https://www.facebook.com/ashim.thapa.014",
        ],
        knowsAbout: [
          "React",
          "Next.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "TypeScript",
          "JavaScript",
          "TailwindCSS",
          "Docker",
          "Prisma",
          "Git",
          "Full-Stack Web Development",
          "MERN Stack",
        ],
        nationality: {
          "@type": "Country",
          name: "Nepal",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Baneshwor",
          addressRegion: "Bagmati",
          addressCountry: "NP",
        },
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Patan Multiple Campus",
          },
          {
            "@type": "EducationalOrganization",
            name: "Broadway Infosys",
          },
        ],
        worksFor: {
          "@type": "Organization",
          name: "ICodify Technology",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Ashim Thapa Magar",
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE_NAME,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        description: SITE_DESCRIPTION,
      },
    ],
  };

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${plexSans.variable} ${plexMono.variable} antialiased w-full`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <SpeedInsights />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: "var(--ink)",
              color: "var(--canvas)",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "var(--primary)",
                secondary: "var(--on-primary)",
              },
            },
          }}
        />
      </body>
    </html>
  );
}

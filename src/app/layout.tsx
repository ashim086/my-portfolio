import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.ashimmagar.com.np";
const SITE_NAME = "Ashim Thapa Magar | Ashim Magar — Full-Stack Web Developer Nepal";
const SITE_DESCRIPTION =
  "Ashim Thapa Magar (Ashim Magar / Ashim Thapa) is a full-stack MERN web developer from Nepal. Specializing in React, Next.js, Node.js, TypeScript & MongoDB. Hire Ashim Magar for web development.";

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
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/ash.jpg",
        width: 1200,
        height: 630,
        alt: "Ashim Thapa Magar — Full-Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/ash.jpg"],
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
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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
          addressLocality: "Lalitpur",
          addressRegion: "Bagmati",
          addressCountry: "NP",
        },
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Patan Multiple College",
          },
          {
            "@type": "EducationalOrganization",
            name: "Broadway Infosys",
          },
        ],
        worksFor: {
          "@type": "Organization",
          name: "IOXET Labs Pvt. Ltd.",
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
    <html lang="en" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        {children}
        <SpeedInsights />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
      </body>
    </html>
  );
}

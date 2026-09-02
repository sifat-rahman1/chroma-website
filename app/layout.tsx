import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import LoadingScreen from "@/components/LoadingScreen";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CHROMA® — Digital Design & UI/UX Studio",
  description:
    "Full-service UI/UX design, brand identity, and front-end engineering studio crafting digital experiences that drive growth.",
  keywords: [
    "UI UX design",
    "brand identity",
    "front-end engineering",
    "digital design studio",
    "design systems",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "(function(){try{var m=localStorage.getItem('theme');if(m!=='light'&&m!=='dark'){m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var d=m==='dark';document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=m;}catch(e){}})()",
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <LoadingScreen />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
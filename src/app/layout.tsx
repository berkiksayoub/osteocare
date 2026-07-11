import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Ayoub Berkiks — Marketing & Communication Digitale",
    template: "%s | Ayoub Berkiks",
  },
  description:
    "Freelance marketing digital et communication pour PME/TPE et startups françaises. Stratégie, web, SEO/SEA et contenu — sans sous-traitance.",
  metadataBase: new URL("https://ayoubberkiks.fr"),
  openGraph: {
    siteName: "Ayoub Berkiks",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

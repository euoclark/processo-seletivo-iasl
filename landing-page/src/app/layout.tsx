import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://landing-page-ten-blue-16.vercel.app"),
  title: "Como automatizar sua captação e vendas no WhatsApp com n8n | IA Sem Limites",
  description: "Masterclass ao vivo e gratuita: aprenda a construir uma esteira que captura, qualifica e direciona seus leads automaticamente no WhatsApp.",
  keywords: ["IA Sem Limites", "Automação WhatsApp", "n8n", "Lead Scoring", "Captação de Leads", "Vendas no WhatsApp"],
  authors: [{ name: "IA Sem Limites" }],
  creator: "IA Sem Limites",
  publisher: "IA Sem Limites",
  openGraph: {
    title: "Como automatizar sua captação e vendas no WhatsApp com n8n",
    description: "Masterclass ao vivo e gratuita: aprenda a construir uma esteira que captura, qualifica e direciona seus leads automaticamente no WhatsApp.",
    url: "https://landing-page-ten-blue-16.vercel.app",
    siteName: "IA Sem Limites",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Como automatizar sua captação e vendas no WhatsApp com n8n",
    description: "Masterclass ao vivo e gratuita: aprenda a construir uma esteira que captura, qualifica e direciona seus leads automaticamente.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#08090c] text-gray-100 antialiased selection:bg-emerald-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

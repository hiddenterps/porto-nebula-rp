import type { Metadata, Viewport } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { LoadingScreen, introScript } from "@/components/LoadingScreen";
import { Cursor } from "@/components/Cursor";
import { site } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const mono = JetBrains_Mono({ variable: "--font-mono-jb", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: { default: `${site.name} — Servidor de Roleplay`, template: `%s | ${site.name}` },
  description: site.description,
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#0a0610" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${anton.variable} ${mono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="grain flex min-h-screen flex-col font-sans">
        <Providers>
          <LoadingScreen />
          <Cursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

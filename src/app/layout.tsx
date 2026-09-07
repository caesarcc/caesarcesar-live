import type { Metadata } from "next";
import { Anton, Chivo, JetBrains_Mono, Cinzel_Decorative } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const chivo = Chivo({
  subsets: ["latin"],
  variable: "--font-chivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  weight: ["700", "900"],
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Live — Diário Cronológico de Shows por Caesar",
  description: "Décadas de história a poucos metros dos amplificadores. Vault 1994 - 2026.",
  icons: {
    icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuB43fUt0m75QrVeOoQL0mA8Bh_S1TyM-816u69Iw3CTF03QgzAwXN_GzKsHeenDaLxpHzg6E6TgoEjrOIGEwRDf2Rt_S65wx4bZspZfxP8GA-n_oA3qK-4Mh9z4jsXzIbIlWONTgcv4AEazzL5thJq7BTOq3veQrI7-kNsjIXYHu-eMTjNgpzOMScC-PWgqW-0A--aGV1PEkr6rRTpgMXqHSvxbhR_huMF56otJaP4yEk4dYslpvho",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${anton.variable} ${chivo.variable} ${jetbrainsMono.variable} ${cinzelDecorative.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-screen bg-background font-chivo text-on-surface antialiased selection:bg-primary-container selection:text-white relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

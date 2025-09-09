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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: "& Conti Wedding - Nossa História de Amor",
  description: "Celebre conosco nossa união. Uma jornada de amor que começou há anos e agora se torna eterna.",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  keywords: ['casamento', 'wedding', 'amor', 'conti', 'celebration'],
  authors: [{ name: '& Conti Wedding' }],
  openGraph: {
    title: '& Conti Wedding - Nossa História de Amor',
    description: 'Celebre conosco nossa união. Uma jornada de amor que começou há anos e agora se torna eterna.',
    type: 'website',
    images: ['/casal/casal1.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

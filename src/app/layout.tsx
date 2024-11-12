"use client";

import localFont from "next/font/local";
import { AuthState } from "@/context/auth/auth_state";
import { AppState } from "@/context/app/AppState"; // Importa AppState
import Navbar from "@/components/Navbar"; // Importa la barra de navegación superior
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthState>
          <AppState> {/* Envuelve todo en AppState */}
            <Navbar /> {/* Barra de navegación superior */}
            <main className="p-6 bg-gray-100 min-h-screen">{children}</main> {/* Contenido principal */}
          </AppState>
        </AuthState>
      </body>
    </html>
  );
}

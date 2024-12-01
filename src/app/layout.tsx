"use client";

import localFont from "next/font/local";
import { AuthState } from "@/context/auth/auth_state";
import { AppState } from "@/context/app/AppState"; // Contexto global de la aplicación
import Navbar from "@/components/Navbar"; // Barra de navegación superior
import Alert from "@/components/Alerta"; // Componente Alert
import "./globals.css";
import { useContext } from "react";
import AuthContext from "@/context/auth/auth_context";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}>
        <AuthState> {/* Contexto AuthState envuelve todo */}
          <AppState> {/* Contexto AppState envuelve el resto */}
            <LayoutContent>{children}</LayoutContent>
          </AppState>
        </AuthState>
      </body>
    </html>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useContext(AuthContext); // Ahora dentro de un componente que está envuelto por AuthState

  return (
    <>
      <Alert /> {/* Popup de alerta */}
      {isAuthenticated && <Navbar />} {/* Navbar condicional */}
      <main className="p-6 min-h-screen">
        {children} {/* Contenido principal */}
      </main>
    </>
  );
}

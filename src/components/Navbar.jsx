"use client";

import Image from "next/image";
import { useContext } from "react";
import AuthContext from "@/context/auth/auth_context";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { usuarioAuth, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleConsultar = () => {
    router.push("/chat");
  };

  return (
    <>
      {/* Barra de navegación */}
      <nav className="bg-gradient-to-r from-green-600 to-green-800 text-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
          {/* Logo e Identidad */}
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Verificando UY"
              width={45}
              height={45}
              className="mr-0"
            />
            <h1 className="text-2xl font-bold whitespace-nowrap">Verificando UY</h1>
          </div>

          {/* Navegación */}
          <ul className="flex flex-wrap space-x-4 items-center">
          {usuarioAuth && usuarioAuth.role === "ADMIN" ? (
            <li
              className="hover:bg-green-700 px-4 py-2 rounded-md cursor-pointer transition text-center"
              onClick={() => router.push("/admin")}
            >
              Admin
            </li>
            ) : null}
            {usuarioAuth && usuarioAuth.role === "CITIZEN" || usuarioAuth.role === "ADMIN" ? (
            <li
              className="hover:bg-green-700 px-4 py-2 rounded-md cursor-pointer transition text-center"
              onClick={() => router.push("/usuario")}
            >
              Inicio
            </li>
            ) : null}
            {usuarioAuth && usuarioAuth.role === "SUBMITTER" || usuarioAuth.role === "ADMIN" ? (
            <li
              className="hover:bg-green-700 px-4 py-2 rounded-md cursor-pointer transition text-center"
              onClick={() => router.push("/submitter")}
            >
              Submitter
            </li>
            ) : null}
            {usuarioAuth && usuarioAuth.role === "CHECKER" || usuarioAuth.role === "ADMIN" ? (
                <li
                    className="hover:bg-green-700 px-4 py-2 rounded-md cursor-pointer transition text-center"
                    onClick={() => router.push("/checker")}
                >
                  Checker
                </li>
            ) : null}
            {usuarioAuth && usuarioAuth.role === "CHECKER" || usuarioAuth.role === "ADMIN" ? (
                <li
                    className="hover:bg-green-700 px-4 py-2 rounded-md cursor-pointer transition text-center"
                    onClick={handleConsultar}
                >
                  Consultar
                </li>
            ) : null}
          </ul>

          {/* Información del usuario */}
          <div className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
            {usuarioAuth ? (
              <>
                <div className="text-sm text-gray-100 text-center sm:text-right">
                  <p className="font-medium">{usuarioAuth.email}</p>
                  <p className="text-gray-300">{usuarioAuth.role}</p>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                onClick={() => router.push("/login")}
              >
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Espaciador para evitar que el contenido quede tapado */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
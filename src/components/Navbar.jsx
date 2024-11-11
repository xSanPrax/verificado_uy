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

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Verificado Uy Logo" width={40} height={40} className="mr-2" />
          <h1 className="text-2xl font-bold">Verificado Uy</h1>
        </div>
        <ul className="flex space-x-6">
          <li className="hover:text-gray-300 cursor-pointer" onClick={() => router.push("/usuario")}>
            Inicio
          </li>
          {usuarioAuth ? (
            <>
              <li className="text-sm text-gray-100">
                {usuarioAuth.fullName} ({usuarioAuth.email})
              </li>
              <li className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer" onClick={handleLogout}>
                Cerrar sesión
              </li>
            </>
          ) : (
            <li className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => router.push("/login")}>
              Iniciar sesión
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

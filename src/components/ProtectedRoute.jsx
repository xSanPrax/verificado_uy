"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from '@/context/auth/auth_context'; 
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, cargando } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!cargando && !isAuthenticated) {
      router.push("/login");
    }
  }, [cargando, isAuthenticated, router]);

  if (cargando) return <p>Cargando...</p>;

  if (!isAuthenticated) {
    // Opcional: Puedes mostrar un indicador de carga mientras rediriges
    return <p>Redirigiendo...</p>;
  }

  return children;
};

export default ProtectedRoute;

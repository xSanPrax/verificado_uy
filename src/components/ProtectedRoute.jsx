"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/auth/auth_context";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, cargando } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!cargando && !isAuthenticated) {
      console.log("Redirigiendo a login porque no está autenticado.");
      router.push("/login");
    }
  }, [isAuthenticated, cargando, router]);

  if (cargando) return <p>Loading...</p>;

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;

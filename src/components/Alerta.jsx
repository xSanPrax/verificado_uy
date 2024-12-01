"use client";

import { useContext, useEffect } from "react";
import AppContext from "@/context/app/AppContext";
import AuthContext from "@/context/auth/auth_context";

const Alert = () => {
  const { mensaje: appMensaje, ocultarAlerta: ocultarAppAlerta } = useContext(AppContext);
  const { mensaje: authMensaje, ocultarAlerta: ocultarAuthAlerta } = useContext(AuthContext);

  // Decide qué mensaje mostrar según la prioridad
  const mensaje = appMensaje || authMensaje;

  // Cierra la alerta del contexto correspondiente
  const ocultarAlerta = appMensaje ? ocultarAppAlerta : ocultarAuthAlerta;

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        ocultarAlerta();
      }, 3000); // El popup se cierra automáticamente después de 3 segundos
      return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
    }
  }, [mensaje, ocultarAlerta]);

  if (!mensaje) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Alerta</h2>
        <p className="text-gray-600">{mensaje}</p>
      </div>
    </div>
  );
};

export default Alert;

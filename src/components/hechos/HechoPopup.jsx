"use client";

import React, { useEffect, useState } from "react";

const HechoPopup = ({ hecho, onClose, onAction }) => {
  const [userRole, setUserRole] = useState(null); // Estado para el rol del usuario

  // Obtener el rol del usuario desde localStorage
  useEffect(() => {
    const usuarioAuth = localStorage.getItem("usuarioAuth");
    if (usuarioAuth) {
      const { role } = JSON.parse(usuarioAuth);
      setUserRole(role); // Establece el rol del usuario
    }
  }, []);

  if (!hecho) return null; // No renderiza si no hay hecho seleccionado

  const renderActions = () => {
    switch (userRole) {
      case "CITIZEN":
        return (
          <p className="text-gray-600 italic">
            Los ciudadanos no tienen permisos para realizar acciones.
          </p>
        );

      case "SUBMITTER":
        return (
          <>
            <button
              onClick={() => onAction("solicitarVerificacion")}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
            >
              Solicitar Verificación
            </button>
          </>
        );

      case "CHECKER":
        return (
          <>
            <button
              onClick={() => onAction("verificar")}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500"
            >
              Verificar
            </button>
            <button
              onClick={() => onAction("rechazar")}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
            >
              Rechazar
            </button>
          </>
        );

      case "ADMIN":
        return (
          <>
            <button
              onClick={() => onAction("asignarChecker")}
              className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-500"
            >
              Asignar Checker
            </button>
            <button
              onClick={() => onAction("eliminar")}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
            >
              Eliminar
            </button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">Detalles del Hecho</h2>
        <div className="space-y-4">
          <p>
            <strong>Descripción:</strong> {hecho.description}
          </p>
          <p>
            <strong>Categoría:</strong> {hecho.category}
          </p>
          <p>
            <strong>Estado:</strong> {hecho.status}
          </p>
          <p>
            <strong>Ratings:</strong>{" "}
            {hecho.ratings && hecho.ratings.length > 0
              ? hecho.ratings.join(", ")
              : "N/A"}
          </p>
          <p>
            <strong>Justificaciones:</strong>{" "}
            {hecho.justifications && hecho.justifications.length > 0
              ? hecho.justifications.join(", ")
              : "N/A"}
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          {renderActions()}
          <button
            onClick={onClose}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HechoPopup;

"use client";

import { useState, useContext, useCallback } from "react";
import AppContext from "@/context/app/AppContext";

const GestionarHechosNuevos = ({ setShowGestionarHechos }) => {
  const { obtenerSolicitudesNuevas, cargando } = useContext(AppContext);
  const [hechos, setHechos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleBuscarHechos = useCallback(async () => {
    try {
      setMensaje(""); // Limpiar mensaje
      const hechosData = await obtenerSolicitudesNuevas();
      console.log("Hechos obtenidos:", hechosData);

      if (!hechosData || hechosData.length === 0) {
        setMensaje("No hay hechos nuevos.");
        setHechos([]);
      } else {
        setHechos(hechosData);
      }
    } catch {
      setMensaje("Error al obtener los hechos nuevos.");
    }
  }, [obtenerSolicitudesNuevas]);

  const handleCerrar = useCallback(() => {
    setShowGestionarHechos(false);
  }, [setShowGestionarHechos]);

  const renderHecho = (hecho) => (
    <li
      key={hecho.id}
      className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow"
    >
      <h3 className="font-semibold">{hecho.category || "Sin título"}</h3>
      <p className="text-sm">{hecho.description || "Sin descripción"}</p>
      {hecho.fechaCreacion && (
        <p className="text-xs text-gray-500 mt-2">
          Fecha: {new Date(hecho.fechaCreacion).toLocaleString()}
        </p>
      )}
      <button
        onClick={() => {}}
        className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded mt-2"
      >
        Pasar a Pendiente
      </button>
    </li>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h2 className="text-xl font-bold mb-4">Gestionar Hechos Nuevos</h2>
      {mensaje && <p className="text-red-500 mb-4">{mensaje}</p>}

      <button
        onClick={handleBuscarHechos}
        className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded transition"
        disabled={cargando}
        aria-label="Buscar hechos nuevos"
      >
        {cargando ? "Cargando..." : "Buscar Hechos Nuevos"}
      </button>

      {cargando && <p className="text-gray-500 mt-4">Cargando...</p>}

      <ul className="space-y-4 mt-4">
        {hechos.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">
            No hay hechos nuevos para gestionar.
          </p>
        ) : (
          hechos.map(renderHecho)
        )}
      </ul>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleCerrar}
          className="bg-gray-500 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded"
          aria-label="Cerrar gestión de hechos nuevos"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default GestionarHechosNuevos;

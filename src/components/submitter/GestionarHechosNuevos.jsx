"use client";

import { useState, useContext } from "react";
import AppContext from "@/context/app/AppContext";

const GestionarHechosNuevos = ({ setShowGestionarHechos }) => {
  const { obtenerSolicitudesNuevas, cargando } = useContext(AppContext);
  const [hechos, setHechos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleBuscarHechos = async () => {
    try {
      setMensaje(""); // Limpiar mensaje de error
      const hechosData = await obtenerSolicitudesNuevas();
      console.log(hechosData); // Verificar los datos obtenidos

      if (hechosData.length === 0) {
        setMensaje("No hay hechos nuevos.");
      } else {
        setHechos(hechosData);
      }
    } catch (error) {
      setMensaje("Error al obtener los hechos nuevos.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h2 className="text-xl font-bold mb-4">Gestionar Hechos Nuevos</h2>
      
      {/* Mostrar mensaje de error si ocurre */}
      {mensaje && <p className="text-red-500 mb-4">{mensaje}</p>}

      {/* Botón para buscar los hechos nuevos */}
      <button
        onClick={handleBuscarHechos}
        className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded transition"
      >
        Buscar Hechos Nuevos
      </button>

      {/* Cargando... */}
      {cargando && <p className="text-gray-500 mt-4">Cargando...</p>}

      {/* Mostrar los hechos obtenidos */}
      <ul className="space-y-4 mt-4">
        {hechos.length === 0 ? (
          <p>No hay hechos nuevos para gestionar.</p>
        ) : (
          hechos.map((hecho) => (
            <li key={hecho.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {/* Título con el campo 'category' */}
              <h3 className="font-semibold">{hecho.category || "Sin título"}</h3>
              {/* Descripción con el campo 'description' */}
              <p className="text-sm">{hecho.description || "Sin descripción"}</p>

              {/* Mostrar más información si es necesario */}
              {hecho.fechaCreacion && (
                <p className="text-xs text-gray-500 mt-2">
                  Fecha: {new Date(hecho.fechaCreacion).toLocaleString()}
                </p>
              )}

              {/* Botón de ejemplo */}
              <button
                onClick={() => {}}
                className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded mt-2"
              >
                Pasar a Pendiente
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => setShowGestionarHechos(false)}
          className="bg-gray-500 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default GestionarHechosNuevos;

"use client";

import { useState, useContext, useEffect } from "react";
import AppContext from "@/context/app/AppContext";

const SubscriptionManager = ({ setShowSubscriptionManager }) => {
  const { manejarSuscripcion, obtenerSuscripciones, solicitarVerificacion, cargando, mensaje } =
    useContext(AppContext);

  const [categoria, setCategoria] = useState("");
  const [suscripciones, setSuscripciones] = useState([]);
  const [citizenId] = useState(1); // Ajusta el ID del ciudadano según tu lógica
  const [isVisible, setIsVisible] = useState(false);

  const manejarCargarSuscripciones = async () => {
    const data = await obtenerSuscripciones(citizenId);
    setSuscripciones(data || []);
  };

  // Mostrar animación de entrada al montar el componente
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10); // Pequeño retraso para animación
    return () => clearTimeout(timeout);
  }, []);

  // Manejo del cierre con animación de salida
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShowSubscriptionManager(false), 300); // Tiempo de la animación
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div
        className={`p-8 bg-white rounded-lg shadow-lg transform transition duration-300 w-3/4 max-w-4xl ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
        }`}
      >
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Gestión de Categorías
        </h2>

        {/* Input y botones para suscripción */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Categoría"
            className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-400"
          />
          <button
            onClick={() => manejarSuscripcion("suscribirse", categoria, citizenId)}
            className="bg-gray-800 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-700 transition"
            disabled={cargando}
          >
            Suscribirse
          </button>
          <button
            onClick={() => manejarSuscripcion("cancelar", categoria, citizenId)}
            className="bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-500 transition"
            disabled={cargando}
          >
            Cancelar
          </button>
        </div>

        {/* Botón para cargar suscripciones */}
        <button
          onClick={manejarCargarSuscripciones}
          className="bg-gray-700 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-600 transition mb-4"
          disabled={cargando}
        >
          Cargar Suscripciones
        </button>

        {/* Lista de suscripciones */}
        {Array.isArray(suscripciones) && suscripciones.length > 0 ? (
          <ul className="space-y-4">
            {suscripciones.map((hecho) => (
              hecho.id && hecho.title ? (
                <li
                  key={hecho.id}
                  className="bg-gray-100 rounded-lg shadow-md p-4 hover:shadow-lg transition"
                >
                  <p className="text-lg font-medium text-gray-800">{hecho.title}</p>
                  <button
                    onClick={() => solicitarVerificacion(citizenId, hecho.id)}
                    className="mt-2 bg-yellow-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-yellow-400 transition"
                    disabled={cargando}
                  >
                    Solicitar Verificación
                  </button>
                </li>
              ) : null
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No hay suscripciones disponibles.</p>
        )}


        {/* Mensaje de alerta */}
        {mensaje && (
          <div className="mt-6 text-center text-red-500 font-medium">{mensaje}</div>
        )}

        {/* Botón para cerrar */}
        <div className="text-center mt-6">
          <button
            onClick={handleClose}
            className="bg-gray-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-500 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager;

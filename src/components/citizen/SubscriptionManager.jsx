"use client";

import { useState, useContext, useEffect } from "react";
import AppContext from "@/context/app/AppContext";

const SubscriptionManager = ({ setShowSubscriptionManager }) => {
  const {
    obtenerSuscripciones,
    manejarSuscripcion,
    solicitarVerificacion,
    cargando,
    mensaje,
  } = useContext(AppContext);

  const [categoria, setCategoria] = useState("");
  const [suscripciones, setSuscripciones] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);
  const [citizenId] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  // Manejar la carga de suscripciones
  const manejarCargarSuscripciones = async (pagina = 0) => {
    const data = await obtenerSuscripciones(pagina, pageSize);
    if (data) {
      setSuscripciones(data.content || []);
      setPage(data.number);
      setTotalPages(data.totalPages);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    manejarCargarSuscripciones(0);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShowSubscriptionManager(false), 300);
  };

  const manejarPagina = (incremento) => {
    const nuevaPagina = page + incremento;
    if (nuevaPagina >= 0 && nuevaPagina < totalPages) {
      manejarCargarSuscripciones(nuevaPagina);
    }
  };

  const manejarSolicitarVerificacion = async (hechoId) => {
    try {
      await solicitarVerificacion(hechoId);
    } catch (error) {
      console.error("Error al solicitar la verificación:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div
        className={`p-8 bg-white rounded-lg shadow-lg transform transition duration-300 w-full max-w-4xl ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
        }`}
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Gestión de Categorías
        </h2>


        {/* Mensaje de alerta */}
        {mensaje && (
          <div className="mb-6 text-center text-red-500 font-medium">{mensaje}</div>
        )}

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
            onClick={() => manejarSuscripcion("suscribirse", categoria)}
            className={`bg-gray-800 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-700 transition ${
              !categoria.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={cargando || !categoria.trim()}
          >
            Suscribirse
          </button>
          <button
            onClick={() => manejarSuscripcion("cancelar", categoria)}
            className={`bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-500 transition ${
              !categoria.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={cargando || !categoria.trim()}
          >
            Cancelar
          </button>
        </div>

        {/* Lista de suscripciones */}
        {Array.isArray(suscripciones) && suscripciones.length > 0 ? (
          <ul className="space-y-4">
            {suscripciones.map((hecho) => (
              <li
                key={hecho.id}
                className="bg-gray-100 rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <p className="text-lg font-medium text-gray-800">{`Descripción: ${hecho.description}`}</p>
                <p className="text-sm text-gray-600">{`Categoría: ${hecho.category}`}</p>
                <p className="text-sm text-gray-600">{`Estado: ${hecho.status}`}</p>
                <button
                  onClick={() => manejarSolicitarVerificacion(hecho.id)}
                  className="mt-2 bg-yellow-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-yellow-400 transition"
                  disabled={cargando}
                >
                  Solicitar Verificación
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">
            {cargando ? "Cargando suscripciones..." : "No hay suscripciones disponibles."}
          </p>
        )}

        {/* Paginación */}
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => manejarPagina(-1)}
            className="bg-gray-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-400 transition"
            disabled={page === 0 || cargando}
          >
            Anterior
          </button>
          <p className="text-gray-700">{`Página ${page + 1} de ${totalPages}`}</p>
          <button
            onClick={() => manejarPagina(1)}
            className="bg-gray-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-400 transition"
            disabled={page + 1 === totalPages || cargando}
          >
            Siguiente
          </button>
        </div>


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

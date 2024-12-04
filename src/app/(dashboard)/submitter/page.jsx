"use client";

import { useState, useContext } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import CrearHecho from "@/components/hechos/CrearHecho";
import HechosTable from "@/components/listados/listarHechos";

const Dashboard = () => {
  const [showCrearHecho, setShowCrearHecho] = useState(false);
  const [showListarHechos, setShowListarHechos] = useState(false);

  // Filtros de búsqueda
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [descripcionFiltro, setDescripcionFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  const handleFiltrarHechos = () => ({
    estado: estadoFiltro,
    descripcion: descripcionFiltro,
    categoria: categoriaFiltro,
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-4">Submitter</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Consulta, verifica y gestiona hechos de manera eficiente.
          </p>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <button
              onClick={() => setShowCrearHecho(!showCrearHecho)}
              className={`px-6 py-3 text-lg rounded-lg font-semibold transition-colors ${
                showCrearHecho
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {showCrearHecho ? "Ocultar Crear Hecho" : "Crear Hecho"}
            </button>

            <button
              onClick={() => setShowListarHechos(!showListarHechos)}
              className={`px-6 py-3 text-lg rounded-lg font-semibold transition-colors ${
                showListarHechos
                  ? "bg-red-600 text-white"
                  : "bg-green-600 text-white hover:bg-green-500"
              }`}
            >
              {showListarHechos ? "Ocultar Listado de Hechos" : "Listar Hechos"}
            </button>
          </div>

          {showCrearHecho && <CrearHecho setShowCrearHecho={setShowCrearHecho} />}

          {showListarHechos && (
            <div>
              <HechosTable filtros={handleFiltrarHechos()} />
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

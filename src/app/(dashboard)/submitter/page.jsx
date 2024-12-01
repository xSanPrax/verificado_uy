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
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold">Dashboard del Submitter</h1>
          <p className="text-xl mt-4">
            Administra y visualiza los hechos desde este panel.
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
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                {/* Filtro por Estado */}
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <label htmlFor="estado" className="text-lg font-semibold">
                    Filtrar por Estado:
                  </label>
                  <select
                    id="estado"
                    value={estadoFiltro}
                    onChange={(e) => setEstadoFiltro(e.target.value)}
                    className="py-2 px-4 rounded-lg border border-gray-300"
                  >
                    <option value="">Todos</option>
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="VERIFICADO">Verificado</option>
                    <option value="RECHAZADO">Rechazado</option>
                  </select>
                </div>

                {/* Filtro por Categoría */}
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <label htmlFor="categoria" className="text-lg font-semibold">
                    Filtrar por Categoría:
                  </label>
                  <select
                    id="categoria"
                    value={categoriaFiltro}
                    onChange={(e) => setCategoriaFiltro(e.target.value)}
                    className="py-2 px-4 rounded-lg border border-gray-300"
                  >
                    <option value="">Todas</option>
                    <option value="Salud">Salud</option>
                    <option value="Economía">Economía</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Deportes">Deportes</option>
                    <option value="Política">Política</option>
                  </select>
                </div>

                {/* Filtro por Descripción */}
                <div className="flex items-center space-x-4">
                  <label htmlFor="descripcion" className="text-lg font-semibold">
                    Filtrar por Descripción:
                  </label>
                  <input
                    id="descripcion"
                    type="text"
                    placeholder="Buscar por descripción"
                    value={descripcionFiltro}
                    onChange={(e) => setDescripcionFiltro(e.target.value)}
                    className="py-2 px-4 rounded-lg border border-gray-300"
                  />
                </div>
              </div>

              <HechosTable filtros={handleFiltrarHechos()} />
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import CrearHecho from "@/components/submitter/CrearHecho";
import HechosTable from "@/components/listados/listarHechos";

const Dashboard = () => {
  const [showCrearHecho, setShowCrearHecho] = useState(false); // Estado para mostrar el formulario de creación
  const [showListarHechos, setShowListarHechos] = useState(false); // Estado para mostrar el listado de hechos

  // Filtros de búsqueda
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [descripcionFiltro, setDescripcionFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  const handleFiltrarHechos = () => {
    const filtros = {
      estado: estadoFiltro,
      descripcion: descripcionFiltro,
      categoria: categoriaFiltro,
    };
    return filtros;
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Dashboard del Submitter</h1>
          <p className="text-xl mt-4">
            Administra y visualiza los hechos desde este panel.
          </p>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
          <section className="space-y-6">
            <div className="text-center">
              <button
                onClick={() => setShowCrearHecho(true)}
                className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded transition"
              >
                Crear Nuevo Hecho
              </button>
            </div>

            {showCrearHecho && <CrearHecho setShowCrearHecho={setShowCrearHecho} />}

            <div className="text-center">
              <button
                onClick={() => setShowListarHechos(!showListarHechos)}
                className={`${
                  showListarHechos
                    ? "bg-red-500 hover:bg-red-400"
                    : "bg-green-500 hover:bg-green-400"
                } text-white font-semibold py-2 px-4 rounded transition`}
              >
                {showListarHechos ? "Ocultar Listado de Hechos" : "Listar Hechos"}
              </button>
            </div>

            {showListarHechos && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <label htmlFor="estado" className="text-lg font-semibold">
                      Filtrar por Estado:
                    </label>
                    <select
                      id="estado"
                      value={estadoFiltro}
                      onChange={(e) => setEstadoFiltro(e.target.value)}
                      className="py-2 px-4 rounded border border-gray-300"
                    >
                      <option value="">Todos</option>
                      <option value="NUEVO">Nuevo</option>
                      <option value="PENDIENTE">Pendiente</option>
                      <option value="VERIFICADO">Verificado</option>
                      <option value="RECHAZADO">Rechazado</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <label htmlFor="categoria" className="text-lg font-semibold">
                      Filtrar por Categoría:
                    </label>
                    <select
                      id="categoria"
                      value={categoriaFiltro}
                      onChange={(e) => setCategoriaFiltro(e.target.value)}
                      className="py-2 px-4 rounded border border-gray-300"
                    >
                      <option value="">Todas</option>
                      <option value="Salud">Salud</option>
                      <option value="Economía">Economía</option>
                      <option value="Tecnología">Tecnología</option>
                      <option value="Deportes">Deportes</option>
                      <option value="Política">Política</option>
                    </select>
                  </div>

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
                      className="py-2 px-4 rounded border border-gray-300"
                    />
                  </div>
                </div>

                <HechosTable filtros={handleFiltrarHechos()} />
              </div>
            )}
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

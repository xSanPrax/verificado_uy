"use client";

import { useEffect, useContext, useState } from "react";
import AppContext from "@/context/app/AppContext";
import HechoPopup from "@/components/hechos/HechoPopup";

const BlankPage = () => {
  const {
    hechos,
    listarHechosPaginados,
    cargando,
    totalPages,
    currentPage,
    userRole,
  } = useContext(AppContext);

  const [page, setPage] = useState(0);
  const [selectedHecho, setSelectedHecho] = useState(null);

  // Filtros
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [descripcionFiltro, setDescripcionFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  useEffect(() => {
    listarHechosPaginados(page, 10, {
      estado: estadoFiltro,
      descripcion: descripcionFiltro,
      categoria: categoriaFiltro,
    });
  }, [page, listarHechosPaginados, estadoFiltro, descripcionFiltro, categoriaFiltro]);

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handleSelectHecho = (hecho) => {
    setSelectedHecho(hecho);
  };

  const handlePopupAction = (action) => {
    console.log(`Acción realizada: ${action}`, selectedHecho);
    setSelectedHecho(null);
  };

  const handleClosePopup = () => {
    setSelectedHecho(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Listado de Hechos</h1>

      {/* Filtros */}
      <div className="w-full max-w-7xl mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="estado" className="font-semibold">
              Estado:
            </label>
            <select
              id="estado"
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
              className="py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <option value="">Todos</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="VERIFICADO">Verificado</option>
              <option value="RECHAZADO">Rechazado</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="categoria" className="font-semibold">
              Categoría:
            </label>
            <select
              id="categoria"
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
              className="py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <option value="">Todas</option>
              <option value="Salud">Salud</option>
              <option value="Economía">Economía</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Deportes">Deportes</option>
              <option value="Política">Política</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="descripcion" className="font-semibold">
              Descripción:
            </label>
            <input
              id="descripcion"
              type="text"
              value={descripcionFiltro}
              onChange={(e) => setDescripcionFiltro(e.target.value)}
              placeholder="Buscar descripción"
              className="py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            />
          </div>
        </div>
      </div>

      {cargando ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-600"></div>
        </div>
      ) : (
        <div className="w-full max-w-7xl">
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <thead className="bg-gradient-to-r from-green-600 to-green-800 text-white">
                <tr>
                  <th className="text-left py-3 px-6">Descripción</th>
                  <th className="text-left py-3 px-6">Categoría</th>
                  <th className="text-left py-3 px-6">Estado</th>
                  <th className="text-left py-3 px-6">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {hechos.length > 0 ? (
                  hechos.map((hecho) => (
                    <tr
                      key={hecho.id}
                      className="border-t hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <td className="py-3 px-6">{hecho.description}</td>
                      <td className="py-3 px-6">{hecho.category}</td>
                      <td className="py-3 px-6">{hecho.status}</td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() => handleSelectHecho(hecho)}
                          className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-500 transition"
                        >
                          Ver Detalles
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-3 px-6 text-gray-500 italic"
                    >
                      No hay hechos disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrevPage}
              disabled={page === 0}
              className={`py-2 px-4 rounded-lg ${
                page === 0
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-500"
              }`}
            >
              Anterior
            </button>
            <span className="text-gray-700">
              Página {currentPage + 1} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages - 1}
              className={`py-2 px-4 rounded-lg ${
                page === totalPages - 1
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-500"
              }`}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Popup */}
      <HechoPopup
        hecho={selectedHecho}
        onClose={handleClosePopup}
        onAction={handlePopupAction}
        userRole={userRole}
      />
    </div>
  );
};

export default BlankPage;

"use client";

import { useEffect, useContext, useState } from "react";
import AppContext from "@/context/app/AppContext";

const HechosTable = () => {
  const { hechos, listarHechosPaginados, cargando, totalPages, currentPage } =
    useContext(AppContext);

  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(""); // Estado para el filtro
  const [filteredHechos, setFilteredHechos] = useState([]); // Lista filtrada

  useEffect(() => {
    listarHechosPaginados(page, 10);
  }, [page, listarHechosPaginados]);

  useEffect(() => {
    // Filtrar hechos cuando cambia el filtro o los datos
    if (filter) {
      setFilteredHechos(
        hechos.filter(
          (hecho) =>
            hecho.description.toLowerCase().includes(filter.toLowerCase()) ||
            hecho.category.toLowerCase().includes(filter.toLowerCase()) ||
            hecho.status.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setFilteredHechos(hechos);
    }
  }, [filter, hechos]);

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Listado de Hechos</h1>

      {/* Campo de Filtro */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrar por descripción, categoría o estado"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {cargando ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-600"></div>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="text-left py-3 px-6">Descripción</th>
                  <th className="text-left py-3 px-6">Categoría</th>
                  <th className="text-left py-3 px-6">Estado</th>
                  <th className="text-left py-3 px-6">Ratings</th>
                  <th className="text-left py-3 px-6">Justificaciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredHechos.length > 0 ? (
                  filteredHechos.map((hecho, index) => (
                    <tr
                      key={index}
                      className={`border-t ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <td className="py-3 px-6">{hecho.description}</td>
                      <td className="py-3 px-6">{hecho.category}</td>
                      <td className="py-3 px-6">{hecho.status}</td>
                      <td className="py-3 px-6">
                        {hecho.ratings && hecho.ratings.length > 0
                          ? hecho.ratings.join(", ")
                          : "N/A"}
                      </td>
                      <td className="py-3 px-6">
                        {hecho.justifications && hecho.justifications.length > 0
                          ? hecho.justifications.join(", ")
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
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
    </div>
  );
};

export default HechosTable;

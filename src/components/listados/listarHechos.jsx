"use client";

import { useEffect, useContext, useState } from "react";
import AppContext from "@/context/app/AppContext";
import HechoPopup from "@/components/hechos/HechoPopup";

const HechosTable = () => {
  const { hechos, listarHechosPaginados, cargando, totalPages, currentPage, solicitarVerificacionCitizen } =
    useContext(AppContext);

  const [page, setPage] = useState(0);
  const [selectedHecho, setSelectedHecho] = useState(null);
  const [filterText, setFilterText] = useState(""); 
  const [filterCategory, setFilterCategory] = useState(""); 
  const [filteredHechos, setFilteredHechos] = useState([]);

  useEffect(() => {
    listarHechosPaginados(page, 10);
  }, [page, listarHechosPaginados]);

  useEffect(() => {
    // Filtrado de hechos
    const filtered = hechos.filter(
      (hecho) =>
        hecho.description.toLowerCase().includes(filterText.toLowerCase()) &&
        (filterCategory === "" ||
          hecho.category.toLowerCase() === filterCategory.toLowerCase())
    );
    setFilteredHechos(filtered);
  }, [hechos, filterText, filterCategory]);

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handleSelectHecho = (hecho) => {
    setSelectedHecho(hecho);
  };


  // Logica de botones
  const handlePopupAction = async (action, hechoId) => {
    switch (action) {
      case "solicitarVerificacionCitizen":
        if (solicitarVerificacionCitizen) {
          await solicitarVerificacionCitizen(action, hechoId);
          console.log(`Solicitud de verificación enviada para el hecho con ID: ${hechoId}`);
        }
        break;
  
      case "verificar":
        console.log(`Hecho con ID ${hechoId} verificado`);
        break;
  
      case "rechazar":
        console.log(`Hecho con ID ${hechoId} rechazado`);
        break;
  
      case "asignarChecker":
        console.log(`Checker asignado para el hecho con ID: ${hechoId}`);
        break;
  
      case "eliminar":
        console.log(`Hecho con ID ${hechoId} eliminado`);
        break;
  
      default:
        console.warn(`Acción no reconocida: ${action}`);
    }
    setSelectedHecho(null); 
  };

  const handleClosePopup = () => {
    setSelectedHecho(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Listado de Hechos</h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Filtrar por descripción"
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          <option value="Salud">Salud</option>
          <option value="Economía">Economía</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Deportes">Deportes</option>
          <option value="Política">Política</option>
        </select>
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
                  <th className="text-left py-3 px-6">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredHechos.length > 0 ? (
                  filteredHechos.map((hecho) => (
                    <tr
                      key={hecho.id}
                      className="border-t hover:bg-gray-100 cursor-pointer"
                    >
                      <td className="py-3 px-6">{hecho.description}</td>
                      <td className="py-3 px-6">{hecho.category}</td>
                      <td className="py-3 px-6">{hecho.status}</td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() => handleSelectHecho(hecho)}
                          className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-500"
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
      {selectedHecho && (
        <HechoPopup
          hecho={selectedHecho}
          onClose={handleClosePopup}
          onAction={handlePopupAction}
        />
      )}
    </div>
  );
};

export default HechosTable;

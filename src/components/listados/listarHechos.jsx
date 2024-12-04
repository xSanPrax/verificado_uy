"use client";

import { useEffect, useContext, useState } from "react";
import AppContext from "@/context/app/AppContext";
import HechoPopup from "@/components/hechos/HechoPopup";

const HechosTable = () => {
  const {
    hechos,
    listarHechosPaginados,
    cargando,
    totalPages,
    currentPage,
    solicitarVerificacionCitizen,
  } = useContext(AppContext);

  const [selectedHecho, setSelectedHecho] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredHechos, setFilteredHechos] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const ITEMS_PER_PAGE = 200; // Límite aumentado a 200

  useEffect(() => {
    if (!isFiltered) {
      listarHechosPaginados(currentPage, ITEMS_PER_PAGE);
    }
  }, [currentPage, listarHechosPaginados, isFiltered]);

  useEffect(() => {
    const filtered = hechos.filter(
      (hecho) =>
        hecho.description.toLowerCase().includes(filterText.toLowerCase()) &&
        (filterCategory === "" || hecho.category.toLowerCase() === filterCategory.toLowerCase()) &&
        (filterStatus === "" || hecho.status.toLowerCase() === filterStatus.toLowerCase())
    );

    setFilteredHechos(filtered);
    setIsFiltered(filterText !== "" || filterCategory !== "" || filterStatus !== "");

    if (filterText !== "" || filterCategory !== "" || filterStatus !== "") {
      setFilteredHechos(filtered); // Mostrar todos los resultados filtrados en una sola vista
    }
  }, [hechos, filterText, filterCategory, filterStatus]);

  const handleSelectHecho = (hecho) => {
    setSelectedHecho(hecho);
  };

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

  const handlePrevPage = () => {
    if (!isFiltered && currentPage > 0) {
      listarHechosPaginados(currentPage - 1, ITEMS_PER_PAGE);
    }
  };

  const handleNextPage = () => {
    if (!isFiltered && currentPage < totalPages - 1) {
      listarHechosPaginados(currentPage + 1, ITEMS_PER_PAGE);
    }
  };

  const handleGoToPage = (e) => {
    const pageNumber = parseInt(e.target.value, 10) - 1;
    if (!isFiltered && pageNumber >= 0 && pageNumber < totalPages) {
      listarHechosPaginados(pageNumber, ITEMS_PER_PAGE);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Listado de Hechos</h1>
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
        <select
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Verificado">Verificado</option>
          <option value="Aprobado">Aprobado</option>
          <option value="Rechazado">Rechazado</option>
        </select>
      </div>

      {cargando ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-600"></div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredHechos.length > 0 ? (
              filteredHechos.map((hecho) => (
                <div
                  key={hecho.id}
                  className="border rounded-lg shadow-md p-4 hover:shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-2">{hecho.description}</h3>
                  <p className="text-gray-700">Categoría: {hecho.category}</p>
                  <p className="text-gray-700">Estado: {hecho.status}</p>
                  <button
                    onClick={() => handleSelectHecho(hecho)}
                    className="bg-green-600 text-white py-1 px-3 rounded mt-4 hover:bg-green-500"
                  >
                    Ver Detalles
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic text-center col-span-full">
                No hay hechos disponibles.
              </p>
            )}
          </div>
          {!isFiltered && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`py-2 px-4 rounded-lg ${
                  currentPage === 0
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-500"
                }`}
              >
                Anterior
              </button>
              <div className="flex items-center">
                <span className="mr-2 text-gray-700">Ir a página:</span>
                <input
                  type="number"
                  value={currentPage + 1}
                  onChange={handleGoToPage}
                  min={1}
                  max={totalPages}
                  className="border border-gray-300 rounded px-2 py-1 w-16 text-center"
                />
                <span className="ml-2 text-gray-700">de {totalPages}</span>
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className={`py-2 px-4 rounded-lg ${
                  currentPage === totalPages - 1
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-500"
                }`}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      )}

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

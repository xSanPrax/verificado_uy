"use client";

import { useContext, useState } from "react";
import AppContext from "@/context/app/AppContext";

const ReportViewer = () => {
  const { fetchHechosVerificadosEntreFechas, fetchTopCategoriasDeHechos, data, mensaje, cargando } =
    useContext(AppContext);

  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const handleFetchHechos = async () => {
    if (!fechaDesde || !fechaHasta) {
      alert("Por favor, completa ambas fechas.");
      return;
    }
    await fetchHechosVerificadosEntreFechas(fechaDesde, fechaHasta);
  };

  const handleFetchTopCategorias = async () => {
    if (!fechaDesde || !fechaHasta) {
      alert("Por favor, completa ambas fechas.");
      return;
    }
    await fetchTopCategoriasDeHechos(fechaDesde, fechaHasta);
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Visor de Reportes</h2>
      {mensaje && <p className="text-red-500">{mensaje}</p>}
      <form className="mb-4 flex justify-between items-center space-x-4 w-full">
        <div className="relative flex-grow">
          <input
              type="date"
              id="fechaDesde"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="peer w-full border-gray-300 px-2 py-1 dark:border-gray-600 text-gray-900 dark:text-black bg-white dark:bg-gray-700 rounded-md placeholder-transparent focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="Desde"
          />
        </div>
        <div className="relative flex-grow">
          <input
              type="date"
              id="fechaHasta"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="peer w-full border-gray-300 px-2 py-1 dark:border-gray-600 text-gray-900 dark:text-black bg-white dark:bg-gray-700 rounded-md placeholder-transparent focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="Hasta"
          />
        </div>
        <button
            type="button"
            onClick={handleFetchHechos}
            className="btn btn-secondary mr-2 px-2 py-1 bg-blue-500 rounded text-white hover:bg-blue-700"
        >
          Obtener Hechos Verificados
        </button>
        <button
            type="button"
            onClick={handleFetchTopCategorias}
            className="btn btn-secondary mr-2 px-2 py-1 bg-blue-500 rounded text-white hover:bg-blue-700"
        >
          Obtener Top Categorías
        </button>
      </form>

      {cargando && <p className="text-gray-600 dark:text-gray-400">Cargando...</p>}

      {!cargando && data && (
          <div>
            <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white">Resultados:</h3>
            {data?.categorias?.map((category, idx) => (
                <section key={idx} className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-white">{category.nombreCategoria}</h3>
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {category.hechos?.map((hecho, hechoIdx) => (
                        <div
                            key={hechoIdx}
                            className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                        >
                          <div className="p-6">
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                              {hecho.titulo}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              Este es un resumen del hecho verificado. Aquí puedes ver si es verdadero, falso o
                              engañoso.
                            </p>
                            <a
                                href="#"
                                className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                            >
                              Leer verificación completa →
                            </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReportViewer;

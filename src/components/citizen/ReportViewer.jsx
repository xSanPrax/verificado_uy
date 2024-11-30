"use client";

import { useContext, useEffect, useState } from "react";
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
      <form className="mb-4">
        <input
          type="date"
          value={fechaDesde}
          onChange={(e) => setFechaDesde(e.target.value)}
          className="mr-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-black bg-white dark:bg-gray-700 rounded-md"
        />
        <input
          type="date"
          value={fechaHasta}
          onChange={(e) => setFechaHasta(e.target.value)}
          className="mr-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-black bg-white dark:bg-gray-700 rounded-md"
        />
        <button
          type="button"
          onClick={handleFetchHechos}
          className="btn btn-secondary mr-2 bg-gray-800 text-white hover:bg-gray-700"
        >
          Obtener Hechos Verificados
        </button>
        <button
          type="button"
          onClick={handleFetchTopCategorias}
          className="btn btn-secondary mr-2 bg-gray-800 text-white hover:bg-gray-700"
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
                        Este es un resumen del hecho verificado. Aquí puedes ver si es verdadero, falso o engañoso.
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

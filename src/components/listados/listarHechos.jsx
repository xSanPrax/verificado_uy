"use client";

import { useEffect, useContext } from "react";
import AppContext from "@/context/app/AppContext";

const HechosTable = () => {
  const { hechos, listarHechosDT, cargando } = useContext(AppContext);

  useEffect(() => {
    listarHechosDT(); 
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Listado de Hechos</h1>
      {cargando ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-600"></div>
        </div>
      ) : (
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
              {hechos.length > 0 ? (
                hechos.map((hecho, index) => (
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
      )}
    </div>
  );
};

export default HechosTable;

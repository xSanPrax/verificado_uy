"use client";

import { useState } from "react";
import HechosTable from "@/components/listados/listarHechos";

const BlankPage = () => {
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [descripcionFiltro, setDescripcionFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  const handleFiltrarHechos = () => ({
    estado: estadoFiltro,
    descripcion: descripcionFiltro,
    categoria: categoriaFiltro,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-8">

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Checker</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Consulta, verifica y gestiona hechos de manera eficiente.
        </p>
      </div>


      {/* Tabla de hechos */}
      <div className="w-full max-w-7xl">
        <HechosTable filtros={handleFiltrarHechos()} />
      </div>
    </div>
  );
};

export default BlankPage;

"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import CrearHecho from "@/components/submitter/CrearHecho";
import HechosTable from "@/components/listados/listarHechos";

const Dashboard = () => {
  const [showCrearHecho, setShowCrearHecho] = useState(false); // Estado para mostrar el formulario de creación
  const [showListarHechos, setShowListarHechos] = useState(false); // Estado para mostrar el listado de hechos

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

            {showListarHechos && <HechosTable />}
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

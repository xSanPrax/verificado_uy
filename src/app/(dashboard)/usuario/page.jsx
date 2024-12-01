"use client";

import { useContext, useState } from "react";
import AuthContext from "@/context/auth/auth_context";
import ProtectedRoute from "@/components/ProtectedRoute";
import Donation from "@/components/citizen/Donation";
import ReportViewer from "@/components/citizen/ReportViewer";
import SubscriptionManager from "@/components/citizen/SubscriptionManager";
import HechosTable from "@/components/listados/listarHechos";

const Dashboard = () => {
  const { userRole } = useContext(AuthContext);
  const [showDonation, setShowDonation] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showSubscriptionManager, setShowSubscriptionManager] = useState(false);
  const [showHechosTable, setShowHechosTable] = useState(false);

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

  if (userRole !== "CITIZEN" && userRole !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <h1 className="text-3xl font-bold text-red-600">Acceso denegado</h1>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 text-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              Bienvenido al Dashboard
            </h1>
          </div>

          <main className="space-y-12">
            <div className="text-center space-y-6">
              <button
                onClick={() => setShowSubscriptionManager(true)}
                className="inline-block bg-gray-800 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 transition"
              >
                Gestionar Categorías
              </button>

              <button
                onClick={() => setShowDonation(true)}
                className="inline-block bg-gray-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-500 transition"
              >
                Hacer Donación
              </button>

              <button
                onClick={() => setShowHechosTable(!showHechosTable)}
                className={`inline-block ${
                  showHechosTable
                    ? "bg-red-600 hover:bg-red-500"
                    : "bg-green-600 hover:bg-green-500"
                } text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition`}
              >
                {showHechosTable ? "Ocultar Hechos" : "Ver Hechos"}
              </button>

              <button
                onClick={() => setShowReport(true)}
                className="inline-block bg-blue-500 hover:bg-blue-400 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition"
              >
                Ver Reporte
              </button>
            </div>

            {/* Mostrar el componente de Gestión de Categorías */}
            {showSubscriptionManager && (
              <SubscriptionManager
                setShowSubscriptionManager={setShowSubscriptionManager}
              />
            )}

            {/* Mostrar el componente de Donación */}
            {showDonation && <Donation setShowDonation={setShowDonation} />}

            {/* Mostrar la tabla de Hechos */}
            {showHechosTable && (
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

            {/* Mostrar el componente de ReportViewer */}
            {showReport && <ReportViewer setShowReport={setShowReport} />}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

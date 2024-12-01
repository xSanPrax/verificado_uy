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

  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [descripcionFiltro, setDescripcionFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  const handleFiltrarHechos = () => ({
    estado: estadoFiltro,
    descripcion: descripcionFiltro,
    categoria: categoriaFiltro,
  });

  if (userRole !== "CITIZEN" && userRole !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <h1 className="text-3xl font-bold text-red-600">Acceso denegado</h1>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            Bienvenido al Dashboard
          </h1>
        </div>

        <main className="space-y-12">
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <button
              onClick={() => setShowSubscriptionManager(!showSubscriptionManager)}
              className={`px-6 py-3 text-lg rounded-lg font-semibold transition-colors ${
                showSubscriptionManager
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {showSubscriptionManager ? "Ocultar Categorías" : "Gestionar Categorías"}
            </button>

            <button
              onClick={() => setShowDonation(!showDonation)}
              className={`px-6 py-3 text-lg rounded-lg font-semibold transition-colors ${
                showDonation
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {showDonation ? "Ocultar Donación" : "Hacer Donación"}
            </button>

            <button
              onClick={() => setShowHechosTable(!showHechosTable)}
              className={`px-6 py-3 text-lg rounded-lg font-semibold transition-colors ${
                showHechosTable
                  ? "bg-red-600 text-white"
                  : "bg-green-600 text-white hover:bg-green-500"
              }`}
            >
              {showHechosTable ? "Ocultar Hechos" : "Ver Hechos"}
            </button>

            <button
              onClick={() => setShowReport(!showReport)}
              className={`px-6 py-3 text-lg rounded-lg font-semibold transition-colors ${
                showReport
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {showReport ? "Ocultar Reporte" : "Ver Reporte"}
            </button>
          </div>

          {showSubscriptionManager && (
            <SubscriptionManager setShowSubscriptionManager={setShowSubscriptionManager} />
          )}

          {showDonation && <Donation setShowDonation={setShowDonation} />}

          {showHechosTable && (
              <HechosTable filtros={handleFiltrarHechos()} />
          )}

          {showReport && <ReportViewer setShowReport={setShowReport} />}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

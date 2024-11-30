"use client";

import { useContext, useState } from "react";

import AuthContext from "@/context/auth/auth_context";
import ProtectedRoute from "@/components/ProtectedRoute";
import Donation from "@/components/citizen/Donation";
import ReportViewer from "@/components/citizen/ReportViewer"; // Importa el componente ReportViewer
import SubscriptionManager from "@/components/citizen/SubscriptionManager";
import HechosTable from "@/components/listados/listarHechos"; 

const Dashboard = () => {
  
  const { usuarioAuth } = useContext(AuthContext);
  const [showDonation, setShowDonation] = useState(false); // Estado para mostrar el componente de donación
  const [showReport, setShowReport] = useState(false); // Estado para mostrar el componente de ReportViewer
  const { userRole } = useContext(AuthContext);

  const [showSubscriptionManager, setShowSubscriptionManager] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [showHechosTable, setShowHechosTable] = useState(false); 
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
                  showHechosTable ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-500"
                } text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition`}
              >
                {showHechosTable ? "Ocultar Hechos" : "Ver Hechos"}
              </button>
            </div>

          {/* Botón para abrir el componente de donación */}
          <div className="text-center">
            <button
              onClick={() => setShowDonation(true)} // Cambiar el estado para mostrar el componente de donación
              className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded transition"
            >
              Hacer Donación
            </button>
          </div>

          {/* Mostrar el componente de donación */}
          {showDonation && (
            <Donation
              setShowDonation={setShowDonation} // Pasamos la función para cerrar el componente de donación
            />
          )}

          {/* Botón para abrir el componente de ReportViewer */}
          <div className="text-center">
            <button
              onClick={() => setShowReport(true)} // Cambiar el estado para mostrar el componente de ReportViewer
              className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded transition"
            >
              Ver Reporte
            </button>
          </div>

          {/* Mostrar el componente de ReportViewer */}
          {showReport && (
            <ReportViewer
              setShowReport={setShowReport} // Pasamos la función para cerrar el componente de ReportViewer
            />
          )}
        </main>
            {showSubscriptionManager && (
              <SubscriptionManager setShowSubscriptionManager={setShowSubscriptionManager} />
            )}

            {showDonation && <Donation setShowDonation={setShowDonation} />}

            {showHechosTable && <HechosTable />}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

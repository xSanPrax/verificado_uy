"use client";

import { useContext, useState } from "react";
import AuthContext from "@/context/auth/auth_context";
import ProtectedRoute from "@/components/ProtectedRoute";
import SubscriptionManager from "@/components/citizen/SubscriptionManager";
import Donation from "@/components/citizen/Donation";

const Dashboard = () => {
  const { usuarioAuth, userRole } = useContext(AuthContext);


  const [showSubscriptionManager, setShowSubscriptionManager] = useState(false);
  const [showDonation, setShowDonation] = useState(false);

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
            
            <div className="text-center space-y-12">
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
            </div>


            {showSubscriptionManager && (
              <SubscriptionManager setShowSubscriptionManager={setShowSubscriptionManager} />
            )}

            {showDonation && <Donation setShowDonation={setShowDonation} />}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

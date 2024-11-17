"use client";

import { useContext, useState } from "react";
import AuthContext from "@/context/auth/auth_context";
import ProtectedRoute from "@/components/ProtectedRoute";
import SubscriptionManager from "@/components/citizen/SubscriptionManager";
import Donation from "@/components/citizen/Donation";

const Dashboard = () => {
  const { usuarioAuth } = useContext(AuthContext);
  const [showSubscriptionManager, setShowSubscriptionManager] = useState(false);
  const [showDonation, setShowDonation] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 text-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              Bienvenido al Dashboard
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Administra tus preferencias y consulta tu información personal en un entorno seguro y fácil de usar.
            </p>
          </div>

          <main className="space-y-12">
            {usuarioAuth && (
              <section className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Información de Usuario
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-lg text-gray-700">
                      <span className="font-medium">Nombre:</span> {usuarioAuth.fullName}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-700">
                      <span className="font-medium">Email:</span> {usuarioAuth.email}
                    </p>
                  </div>
                </div>
              </section>
            )}

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

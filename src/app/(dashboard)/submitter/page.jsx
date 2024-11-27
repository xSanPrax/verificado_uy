"use client";

import { useContext, useState } from "react";
import AuthContext from "@/context/auth/auth_context";
import ProtectedRoute from "@/components/ProtectedRoute";
import CrearHecho from "@/components/submitter/CrearHecho";
import GestionarHechosNuevos from "@/components/submitter/GestionarHechosNuevos";

const Dashboard = () => {
  const { usuarioAuth } = useContext(AuthContext); // Se mantiene la información del usuario
  const [showCrearHecho, setShowCrearHecho] = useState(false);
  const [showGestionarHechos, setShowGestionarHechos] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Dashboard del Submitter</h1>
          <p className="text-xl mt-4">
            Administra los hechos y verifica solicitudes desde este panel.
          </p>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
          {usuarioAuth && (
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Información de Usuario</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-lg">
                    <span className="font-semibold">Nombre:</span> {usuarioAuth.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-lg">
                    <span className="font-semibold">Email:</span> {usuarioAuth.email}
                  </p>
                </div>
              </div>
            </section>
          )}

          <section className="space-y-6">
            <div className="text-center">
              <button
                onClick={() => setShowCrearHecho(true)}
                className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded transition"
              >
                Crear Nuevo Hecho
              </button>
            </div>

            {showCrearHecho && (
              <CrearHecho setShowCrearHecho={setShowCrearHecho} />
            )}

            <div className="text-center">
              <button
                onClick={() => setShowGestionarHechos(true)}
                className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded transition"
              >
                Gestionar Hechos Nuevos
              </button>
            </div>

            {showGestionarHechos && (
              <GestionarHechosNuevos setShowGestionarHechos={setShowGestionarHechos} />
            )}
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

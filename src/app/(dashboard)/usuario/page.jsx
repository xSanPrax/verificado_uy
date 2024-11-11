"use client";

import { useContext } from "react";
import AuthContext from "@/context/auth/auth_context";
import ProtectedRoute from "@/components/ProtectedRoute";

const Dashboard = () => {
  const { usuarioAuth } = useContext(AuthContext);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold">Bienvenido al Dashboard</h1>
            <p className="text-xl mt-4">
              Aquí puedes ver tu información y gestionar tus preferencias
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

          <section>
            <h2 className="text-3xl font-semibold mb-6 text-center">Hechos Recientes</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((id) => (
                <div
                  key={id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                      Hecho {id}
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
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

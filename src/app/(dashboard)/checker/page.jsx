"use client";

import { useContext, useState } from "react";
import AuthContext from "@/context/auth/auth_context";
import ProtectedRoute from "@/components/ProtectedRoute";
import HechosTable from "@/components/listados/listarHechos";

const Dashboard = () => {
    const { usuarioAuth } = useContext(AuthContext); // Se mantiene la información del usuario
    const [showHechosTable, setShowHechosTable] = useState(false);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold">Dashboard del Checker</h1>
                    <p className="text-xl mt-4">
                        Verifica y Califica los hechos desde este panel.
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

                    {/* Mostrar la tabla de Hechos */}
                    {showHechosTable && <HechosTable />}

                </main>
            </div>
        </ProtectedRoute>
    );
};

export default Dashboard;

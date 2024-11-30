"use client";

import { useContext, useState, useEffect } from "react";
import AppContext from "@/context/app/AppContext";

const Donation = ({ setShowDonation }) => {
  const { donationConfig, cargando } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar animación de entrada al montar el componente
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10); // Pequeño retraso para animación
    return () => clearTimeout(timeout);
  }, []);

  // Manejo del cierre con animación de salida
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShowDonation(false), 300); // Tiempo de la animación
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div
        className={`p-8 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg transform transition duration-300 max-w-md w-full ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
        }`}
      >
        {cargando ? (
          <h2 className="text-2xl font-bold mb-6 text-center">Cargando...</h2>
        ) : donationConfig && Object.keys(donationConfig).length ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Hacer una Donación</h2>
            <p className="text-lg mb-4">{donationConfig.message}</p>
            <div className="mb-4">
              <p className="font-semibold">Email para consultas:</p>
              <p className="text-blue-600 dark:text-blue-400">{donationConfig.email}</p>
            </div>
            <div className="mb-6">
              <p className="font-semibold">Cuenta bancaria:</p>
              <p>{donationConfig.bankAccount}</p>
            </div>
          </>
        ) : (
          <h2 className="text-2xl font-bold mb-6 text-center">
            No hay datos de configuración disponibles
          </h2>
        )}
        <div className="text-center">
          <button
            onClick={handleClose}
            className="bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donation;

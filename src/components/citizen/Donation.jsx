"use client";

import { useContext } from "react";
import AppContext from "@/context/app/AppContext";

const Donation = ({ setShowDonation }) => {
  const { donationConfig } = useContext(AppContext); 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-8 rounded-lg shadow-lg max-w-md w-full">
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
        <div className="text-center">
          <button
            onClick={() => setShowDonation(false)}
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

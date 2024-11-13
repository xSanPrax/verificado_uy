"use client";

import { useContext, useState, useEffect } from "react";
import AppContext from "@/context/app/AppContext";

const DonationConfig = ({ setShowDonationConfig }) => {
  const { donationConfig, updateDonationConfig } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Cargar los valores desde el contexto cuando el componente se monta
    setEmail(donationConfig.email || "");
    setBankAccount(donationConfig.bankAccount || "");
    setMessage(donationConfig.message || "");
  }, [donationConfig]);

  const handleSave = async () => {
    const updatedConfig = { email, bankAccount, message };
    await updateDonationConfig(updatedConfig); // Guardar los cambios
    setShowDonationConfig(false); // Cerrar el modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Configurar Donación</h2>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Email para consultas:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Cuenta bancaria:</label>
          <input
            type="text"
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
            className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">Mensaje:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowDonationConfig(false)}
            className="bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded transition"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationConfig;

"use client";

import { useState, useContext } from "react";
import AppContext from "@/context/app/AppContext";

const VerificarHechoForm = ({ hechoId, onClose }) => {
  const { verificarHecho } = useContext(AppContext);
  const [esVerdadero, setEsVerdadero] = useState(false);
  const [justificacion, setJustificacion] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!justificacion.trim()) {
      alert("Por favor, proporciona una justificación.");
      return;
    }

    setCargando(true);
    try {
        const verificacion = {
          esVerdadero,
          justificacion,
        };
      
        const message = await verificarHecho(hechoId, verificacion); // Captura el mensaje desde la función
        alert(message); // Muestra el mensaje directamente
        onClose();
      } catch (error) {
        alert("Error inesperado. Por favor, intente nuevamente."); // Mensaje genérico si algo falla
      } finally {
        setCargando(false);
      }
      
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
          Verificar Hecho
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              htmlFor="esVerdadero"
            >
              ¿Es verdadero?
            </label>
            <select
              id="esVerdadero"
              className="w-full rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-gray-100 focus:ring focus:ring-blue-300 focus:outline-none"
              value={esVerdadero}
              onChange={(e) => setEsVerdadero(e.target.value === "true")}
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              htmlFor="justificacion"
            >
              Justificación
            </label>
            <textarea
              id="justificacion"
              className="w-full rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-gray-100 focus:ring focus:ring-blue-300 focus:outline-none"
              rows="4"
              value={justificacion}
              onChange={(e) => setJustificacion(e.target.value)}
              placeholder="Proporciona una justificación para la verificación"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg transition focus:ring focus:ring-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`py-2 px-6 rounded-lg font-semibold transition ${
                cargando
                  ? "bg-blue-300 text-white cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-400 text-white"
              }`}
              disabled={cargando}
            >
              {cargando ? "Verificando..." : "Verificar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificarHechoForm;

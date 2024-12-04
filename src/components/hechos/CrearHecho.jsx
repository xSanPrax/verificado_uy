"use client";

import { useState, useContext, useCallback } from "react";
import AppContext from "@/context/app/AppContext";
import DOMPurify from "dompurify";

const CrearHecho = ({ setShowCrearHecho }) => {
  const { crearHecho, cargando, mostrarAlerta } = useContext(AppContext);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleCancelar = useCallback(() => {
    setShowCrearHecho(false);
  }, [setShowCrearHecho]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedDescription = DOMPurify.sanitize(description);

    if (!sanitizedDescription.trim() || !category.trim()) {
      mostrarAlerta("Por favor, completa todos los campos.");
      return;
    }

    try {
      const hechoCreado = await crearHecho(
        sanitizedDescription.trim(),
        category.trim()
      );
      if (hechoCreado) {
        mostrarAlerta("Hecho creado correctamente.");
        setResponseMessage("Hecho creado exitosamente.");
        setDescription("");
        setCategory("");
        setShowCrearHecho(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al crear el hecho.";
      console.error("Error al crear el hecho:", errorMessage);
      setResponseMessage(errorMessage);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-gray-100 focus:ring focus:ring-blue-300 focus:outline-none";

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
          Crear Nuevo Hecho
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              htmlFor="description"
            >
              Descripción
            </label>
            <textarea
              id="description"
              className={inputClass}
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={cargando}
              placeholder="Ingresa una descripción del hecho"
              aria-invalid={!description.trim()}
            ></textarea>
          </div>

          <div>
            <label
              className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              htmlFor="category"
            >
              Categoría
            </label>
            <select
              id="category"
              className={inputClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={cargando}
              aria-invalid={!category.trim()}
            >
              <option value="">Seleccionar una categoría</option>
              <option value="Salud">Salud</option>
              <option value="Economía">Economía</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Deportes">Deportes</option>
              <option value="Política">Política</option>
            </select>
          </div>

          {responseMessage && (
            <div className="text-sm text-center text-gray-700 dark:text-gray-300 mt-4">
              {responseMessage}
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancelar}
              className="bg-gray-500 hover:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg transition focus:ring focus:ring-gray-300"
              aria-label="Cancelar creación de hecho"
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
              aria-label={cargando ? "Creando hecho" : "Crear hecho"}
            >
              {cargando ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearHecho;

"use client";

import { useState, useContext, useCallback } from "react";
import AppContext from "@/context/app/AppContext";

const CrearHecho = ({ setShowCrearHecho }) => {
  const { crearHecho, cargando, mostrarAlerta } = useContext(AppContext);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleCancelar = useCallback(() => {
    setShowCrearHecho(false);
  }, [setShowCrearHecho]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim() || !category.trim()) {
      mostrarAlerta("Por favor, completa todos los campos.");
      return;
    }

    try {
      const hechoCreado = await crearHecho(description.trim(), category.trim());
      if (hechoCreado) {
        mostrarAlerta("Hecho creado correctamente.");
        setDescription("");
        setCategory("");
        setShowCrearHecho(false);
      }
    } catch (error) {
      console.error("Error al crear el hecho:", error);
    }
  };

  const inputClass =
    "w-full rounded-lg border-gray-300 dark:bg-gray-900 dark:text-gray-100 focus:ring focus:ring-blue-200";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Crear Nuevo Hecho</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium mb-1"
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
            aria-invalid={!description.trim()}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            Categoría
          </label>
          <input
            id="category"
            type="text"
            className={inputClass}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={cargando}
            aria-invalid={!category.trim()}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancelar}
            className="bg-gray-500 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded transition"
            aria-label="Cancelar creación de hecho"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded transition"
            disabled={cargando}
            aria-label={cargando ? "Creando hecho" : "Crear hecho"}
          >
            {cargando ? "Creando..." : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearHecho;

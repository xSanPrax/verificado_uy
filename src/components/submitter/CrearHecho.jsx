"use client";

import { useState, useContext } from "react";
import AppContext from "@/context/app/AppContext";

const CrearHecho = ({ setShowCrearHecho }) => {
  const { crearHecho, cargando, mostrarAlerta } = useContext(AppContext);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleCancelar = () => {
    setShowCrearHecho(false); // Oculta el componente
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !category) {
      mostrarAlerta("Por favor, completa todos los campos.");
      return;
    }

    try {
      await crearHecho(description, category, "NUEVO");
      mostrarAlerta("Hecho creado correctamente.");
      setDescription("");
      setCategory("");
      setShowCrearHecho(false);
    } catch (error) {
      console.error("Error al crear el hecho:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Crear Nuevo Hecho</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Descripción
          </label>
          <textarea
            id="description"
            className="w-full rounded-lg border-gray-300 dark:bg-gray-900 dark:text-gray-100"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={cargando}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            Categoría
          </label>
          <input
            id="category"
            type="text"
            className="w-full rounded-lg border-gray-300 dark:bg-gray-900 dark:text-gray-100"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={cargando}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancelar}
            className="bg-gray-500 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded transition"
            disabled={cargando}
          >
            {cargando ? "Creando..." : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearHecho;

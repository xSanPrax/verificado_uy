"use client";

import { useContext, useState } from "react";
import AppContext from "@/context/app/AppContext";

const CreateUserForm = () => {
  const { crearUsuario, mensaje, mostrarAlerta } = useContext(AppContext);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("CITIZEN");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !email) {
      mostrarAlerta("Por favor, completa todos los campos");
      return;
    }
    const result = await crearUsuario(nombre, email, role);

    if (result.success) {
      mostrarAlerta("Usuario creado exitosamente");
      setNombre("");
      setEmail("");
      setRole("CITIZEN");
    } else {
      mostrarAlerta(result.message);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Crear Usuario
      </h2>
      {mensaje && <p className="text-red-500 mb-4">{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg text-sm dark:bg-gray-700 dark:text-gray-100"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg text-sm dark:bg-gray-700 dark:text-gray-100"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg text-sm dark:bg-gray-700 dark:text-gray-100"
        >
          <option value="CITIZEN">CITIZEN</option>
          <option value="ADMIN">ADMIN</option>
          <option value="CHECKER">CHECKER</option>
          <option value="SUBMITTER">SUBMITTER</option>
        </select>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;

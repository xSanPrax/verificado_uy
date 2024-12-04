"use client";

import { useContext, useState } from "react";
import AppContext from "@/context/app/AppContext";

const UpdateUserRoleForm = () => {
  const { modificarUsuarioRole, mensaje, mostrarAlerta } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [nuevoRol, setNuevoRol] = useState("CITIZEN");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      mostrarAlerta("Por favor, ingresa el email del usuario");
      return;
    }
    const result = await modificarUsuarioRole(email, nuevoRol);

    if (result.success) {
      mostrarAlerta("Rol modificado exitosamente");
      setEmail("");
      setNuevoRol("CITIZEN");
    } else {
      mostrarAlerta(result.message);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Modificar Rol de Usuario
      </h2>
      {mensaje && <p className="text-red-500 mb-4">{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email del Usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg text-sm dark:bg-gray-700 dark:text-gray-100"
        />
        <select
          value={nuevoRol}
          onChange={(e) => setNuevoRol(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg text-sm dark:bg-gray-700 dark:text-gray-100"
        >
          <option value="CITIZEN">CITIZEN</option>
          <option value="ADMIN">ADMIN</option>
          <option value="CHECKER">CHECKER</option>
          <option value="SUBMITTER">SUBMITTER</option>
        </select>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Modificar Rol
        </button>
      </form>
    </div>
  );
};

export default UpdateUserRoleForm;

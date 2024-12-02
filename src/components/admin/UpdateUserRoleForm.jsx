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
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Modificar Rol de Usuario</h2>
      {mensaje && <p className="text-red-500">{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email del Usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field mb-2"
        />
        <select
          value={nuevoRol}
          onChange={(e) => setNuevoRol(e.target.value)}
          className="input-field mb-2"
        >
          <option value="CITIZEN">CITIZEN</option>
          <option value="ADMIN">ADMIN</option>
          <option value="CHECKER">CHECKER</option>
          <option value="SUBMITTER">SUBMITTER</option>
        </select>
        <button type="submit" className="btn btn-primary mt-4">
          Modificar Rol
        </button>
      </form>
    </div>
  );
};

export default UpdateUserRoleForm;

"use client";

import { useContext, useState } from "react";
import AppContext from "@/context/app/AppContext";

const CreateUserForm = () => {
  const { createUsuario, mensaje, mostrarAlerta } = useContext(AppContext);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("CITIZEN");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !email) {
      mostrarAlerta("Por favor, completa todos los campos");
      return;
    }
    await createUsuario(nombre, email, role);
    setNombre("");
    setEmail("");
    setRole("CITIZEN");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Crear Usuario</h2>
      {mensaje && <p className="text-red-500">{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="input-field mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field mb-2"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="input-field mb-2"
        >
          <option value="CITIZEN">CITIZEN</option>
          <option value="ADMIN">ADMIN</option>
          <option value="CHECKER">CHECKER</option>
          <option value="SUBMITTER">SUBMITTER</option>
        </select>
        <button type="submit" className="btn btn-primary mt-4">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CreateUserForm;

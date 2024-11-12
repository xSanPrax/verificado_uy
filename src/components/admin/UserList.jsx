"use client";

import { useContext, useEffect } from "react";
import AppContext from "@/context/app/AppContext";

const UserList = () => {
  const { data: usuarios, listUsuarios, mensaje } = useContext(AppContext);

  useEffect(() => {
    listUsuarios();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Lista de Usuarios</h2>
      
      {mensaje && (
        <p className="text-sm text-red-500 mb-4">
          {mensaje}
        </p>
      )}
      
      {usuarios && usuarios.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 text-left text-sm uppercase font-medium">
                  Nombre
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 text-left text-sm uppercase font-medium">
                  Email
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 text-left text-sm uppercase font-medium">
                  Rol
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {usuario.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {usuario.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {usuario.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">No hay usuarios disponibles</p>
      )}
    </div>
  );
};

export default UserList;

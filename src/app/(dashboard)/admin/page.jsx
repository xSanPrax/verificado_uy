"use client";

import { useContext, useState } from "react";
import AuthContext from "@/context/auth/auth_context";
import ProtectedRoute from "@/components/ProtectedRoute";
import CreateUserForm from "@/components/admin/CreateUserForm";
import UpdateUserRoleForm from "@/components/admin/UpdateUserRoleForm";
import UserList from "@/components/admin/UserList";
import NodoManager from "@/components/nodos/NodoManager";
import DonationConfig from "@/components/admin/DonationConfig"; 
const Dashboard = () => {
  const { usuarioAuth } = useContext(AuthContext);

  // Estados para controlar la visibilidad de cada componente
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showUpdateUserRole, setShowUpdateUserRole] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [showNodoManager, setShowNodoManager] = useState(false);
  const [showDonationConfig, setShowDonationConfig] = useState(false); 

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">Bienvenido al Dashboard de ADMINISTRADOR</h1>
          <p className="text-2xl mb-8">Gestiona usuarios, nodos y configuraciones</p>
        </div>

        {/* Botones con estilo moderno para mostrar cada componente */}
        <div className="flex justify-center gap-6 mb-12">
          <button
            onClick={() => setShowCreateUser(!showCreateUser)}
            className={`px-6 py-3 text-lg rounded-lg font-semibold transition-colors ${
              showCreateUser ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {showCreateUser ? "Ocultar Crear Usuario" : "Crear Usuario"}
          </button>
          <button
            onClick={() => setShowUpdateUserRole(!showUpdateUserRole)}
            className={`px-6 py-3 text-lg rounded-lg font-semibold transition-colors ${
              showUpdateUserRole ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {showUpdateUserRole ? "Ocultar Modificar Rol" : "Modificar Rol"}
          </button>
          <button
            onClick={() => setShowUserList(!showUserList)}
            className={`px-6 py-3 text-lg rounded-lg font-semibold transition-colors ${
              showUserList ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {showUserList ? "Ocultar Lista de Usuarios" : "Lista de Usuarios"}
          </button>
          <button
            onClick={() => setShowNodoManager(!showNodoManager)}
            className={`px-6 py-3 text-lg rounded-lg font-semibold transition-colors ${
              showNodoManager ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {showNodoManager ? "Ocultar Nodo Manager" : "Nodo Manager"}
          </button>
          <button
            onClick={() => setShowDonationConfig(true)}
            className="px-6 py-3 text-lg rounded-lg font-semibold bg-green-500 text-white hover:bg-green-400 transition"
          >
            Configurar Donación
          </button>
        </div>

        {/* Renderizado condicional de los componentes seleccionados */}
        <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {showCreateUser && (
            <div className="col-span-1 lg:col-span-2 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <CreateUserForm />
            </div>
          )}
          {showUpdateUserRole && (
            <div className="col-span-1 lg:col-span-2 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <UpdateUserRoleForm />
            </div>
          )}
          {showUserList && (
            <div className="col-span-1 lg:col-span-2 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <UserList />
            </div>
          )}
          {showNodoManager && (
            <div className="col-span-1 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg h-1/2">
              {showNodoManager && <NodoManager setShowNodoManager={setShowNodoManager} />}
            </div>
          )}
        </div>

        {/* Modal de configuración de donación */}
        {showDonationConfig && (
          <DonationConfig setShowDonationConfig={setShowDonationConfig} />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

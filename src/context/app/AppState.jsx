"use client";

import { useReducer } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import appReducer from "./AppReducer";
import { SET_DATA, CLEAR_DATA, MOSTRAR_ALERTA, OCULTAR_ALERTA, CARGANDO } from "@/app/types/app";

// Configura la URL base para axios
axios.defaults.baseURL = "http://localhost:8080";

export const AppState = ({ children }) => {
  const initialState = {
    data: null,
    cargando: false,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const createUsuario = async (nombre, email, role) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      const params = new URLSearchParams({ nombre, email, role });
      await axios.post(`/admin/crear-usuario?${params.toString()}`);
      mostrarAlerta("Usuario creado exitosamente");
      listUsuarios(); // Actualiza la lista después de crear
    } catch (error) {
      console.error("Error al crear usuario:", error);
      mostrarAlerta("Error al crear el usuario");
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };
  

  const updateUsuarioRole = async (email, nuevoRol) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      const params = new URLSearchParams({ email, nuevoRol });
      await axios.put(`/admin/modificar-rol?${params.toString()}`);
      mostrarAlerta("Rol del usuario modificado exitosamente");
      listUsuarios(); // Actualiza la lista después de modificar
    } catch (error) {
      console.error("Error al modificar el rol del usuario:", error);
      mostrarAlerta("Error al modificar el rol del usuario");
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

  // Función para listar usuarios
  const listUsuarios = async () => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      const response = await axios.get("/usuarios/listar-usuarios");
      dispatch({ type: SET_DATA, payload: response.data });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      mostrarAlerta("Error al obtener la lista de usuarios");
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

  // Función para limpiar datos
  const clearData = () => {
    dispatch({ type: CLEAR_DATA });
  };

  // Función para mostrar alerta
  const mostrarAlerta = (mensaje) => {
    dispatch({ type: MOSTRAR_ALERTA, payload: { mensaje } });
  };

  // Función para ocultar alerta
  const ocultarAlerta = () => {
    dispatch({ type: OCULTAR_ALERTA });
  };

  return (
    <AppContext.Provider
      value={{
        data: state.data,
        cargando: state.cargando,
        mensaje: state.mensaje,
        createUsuario,
        updateUsuarioRole,
        listUsuarios,
        clearData,
        mostrarAlerta,
        ocultarAlerta,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

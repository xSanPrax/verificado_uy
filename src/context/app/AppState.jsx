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

  const crearNodoPeriferico = async (name, url, verificationType) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      await axios.post("/nodo-periferico/crear", {
        name,
        url,
        verificationType,
      });
      mostrarAlerta("Nodo periférico creado exitosamente.");
    } catch (error) {
      console.error("Error al crear el nodo periférico:", error);
      mostrarAlerta(
        error.response?.data?.message || "Error al crear el nodo periférico."
      );
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

  const obtenerNodoPerifericoPorId = async (id) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      const response = await axios.get(`/nodo-periferico/${id}`);
      dispatch({ type: SET_DATA, payload: response.data });
      return response.data;
    } catch (error) {
      console.error("Error al obtener el nodo periférico:", error);
      mostrarAlerta(
        error.response?.data?.message || "Error al obtener el nodo periférico."
      );
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

  const validarConectividadNodo = async (url) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      const response = await axios.get(`/nodo-periferico/validar?url=${encodeURIComponent(url)}`);
      return response.data.success;
    } catch (error) {
      console.error("Error al validar la conectividad del nodo periférico:", error);
      mostrarAlerta(
        error.response?.data?.message ||
          "Error al validar la conectividad del nodo periférico."
      );
      return false;
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

  const clearData = () => {
    dispatch({ type: CLEAR_DATA });
  };

  const mostrarAlerta = (mensaje) => {
    dispatch({ type: MOSTRAR_ALERTA, payload: { mensaje } });
  };

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
        crearNodoPeriferico,
        obtenerNodoPerifericoPorId,
        validarConectividadNodo,
        clearData,
        mostrarAlerta,
        ocultarAlerta,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

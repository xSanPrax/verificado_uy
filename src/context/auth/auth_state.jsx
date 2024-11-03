"use client";

import { useReducer } from "react";
import axios from "axios"; 
import AuthContext from "./auth_context";
import authReducer from "./auth_reducer";
import { MOSTRAR_ALERTA, CARGANDO} from "@/app/types/app";

export const AuthState = ({ children }) => {
  const initialState = {
    usuarioAuth: null,
    isAuthenticated: false,
    cargando: false,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Función para manejar el flujo de login externo
  const externalLogin = async () => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      window.location.href = "http://localhost:8080/login";
    } catch (error) {
      console.error("Error iniciando el flujo de autenticación:", error);
      throw error;
    }
  };

  const internalRegister = async (nombre, email, password) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });

      await axios.post("http://localhost:8080/usuarios/crear-usuario", {
        nombre,
        email,
        password,
      });

      dispatch({
        type: MOSTRAR_ALERTA,
        payload: { mensaje: "Usuario registrado exitosamente." },
      });
    } catch (error) {
      console.error("Error en el registro interno:", error);
      dispatch({
        type: MOSTRAR_ALERTA,
        payload: { mensaje: "Error al registrar. Por favor, revisa los datos." },
      });
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuarioAuth: state.usuarioAuth,
        isAuthenticated: state.isAuthenticated,
        cargando: state.cargando,
        mensaje: state.mensaje,
        externalLogin,
        internalRegister, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

"use client";

import { useReducer, useEffect } from "react";
import axios from "axios";
import AuthContext from "./auth_context";
import authReducer from "./auth_reducer";
import { MOSTRAR_ALERTA, CARGANDO, LOGIN, LOGOUT, IS_AUTH, OCULTAR_ALERTA } from "@/app/types/app";

const BASE_URL = "http://localhost:8080";

axios.defaults.withCredentials = true;

export const AuthState = ({ children }) => {
  const initialState = {
    usuarioAuth: null,
    isAuthenticated: false,
    cargando: true,
    mensaje: null,
    userRole: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);


  const mostrarAlerta = (mensaje) => {
    dispatch({ type: MOSTRAR_ALERTA, payload: { mensaje } });
  };

  const ocultarAlerta = () => {
    dispatch({ type: OCULTAR_ALERTA });
  };


  const externalLogin = async () => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      window.location.href = `${BASE_URL}/login`;
    } catch (error) {
      dispatch({
        type: MOSTRAR_ALERTA,
        payload: { mensaje: "Error iniciando el flujo de autenticación." },
      });
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

  const internalRegister = async (nombre, email, password) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });

      await axios.post(
        `${BASE_URL}/usuarios/registro`,
        { nombre, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      dispatch({
        type: MOSTRAR_ALERTA,
        payload: { mensaje: "Usuario registrado exitosamente." },
      });
    } catch (error) {
      dispatch({
        type: MOSTRAR_ALERTA,
        payload: { mensaje: error.response?.data || "Error al registrar. Por favor, revisa los datos." },
      });
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

  const internalLogin = async (email, password) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });

      const response = await axios.post(
        `${BASE_URL}/usuarios/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { message, usuario } = response.data;

      localStorage.setItem("usuarioAuth", JSON.stringify(usuario));

      dispatch({
        type: LOGIN,
        payload: { usuarioAuth: usuario, isAuthenticated: true, userRole: usuario.role },
      });

      dispatch({
        type: MOSTRAR_ALERTA,
        payload: { mensaje: message },
      });

      const redirectMap = {
        ADMIN: "/admin",
        CITIZEN: "/usuario",
        SUBMITTER: "/submitter",
      };

      window.location.href = redirectMap[usuario.role] || "/checker";
    } catch (error) {
      dispatch({
        type: MOSTRAR_ALERTA,
        payload: { mensaje: error.response?.data || "Error al iniciar sesión. Por favor, revisa tus credenciales." },
      });
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

  const checkAuth = () => {
    dispatch({ type: CARGANDO, payload: { cargando: true } });

    const usuarioAuth = JSON.parse(localStorage.getItem("usuarioAuth"));
    if (usuarioAuth) {
      dispatch({
        type: IS_AUTH,
        payload: { usuarioAuth, isAuthenticated: true, userRole: usuarioAuth.role },
      });
    } else {
      dispatch({ type: LOGOUT });
    }

    dispatch({ type: CARGANDO, payload: { cargando: false } });
  };

  const logout = () => {
    localStorage.removeItem("usuarioAuth");
    dispatch({ type: LOGOUT });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuarioAuth: state.usuarioAuth,
        isAuthenticated: state.isAuthenticated,
        cargando: state.cargando,
        mensaje: state.mensaje,
        userRole: state.userRole,
        externalLogin,
        internalRegister,
        internalLogin,
        logout,
        mostrarAlerta,
        ocultarAlerta,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

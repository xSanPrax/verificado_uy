"use client";

import { useReducer, useEffect } from "react";
import axios from "axios"; 
import AuthContext from "./auth_context";
import authReducer from "./auth_reducer";
import { MOSTRAR_ALERTA, CARGANDO, LOGIN, LOGOUT, IS_AUTH } from "@/app/types/app";

const BASE_URL = "http://docker4363-verificando-back.web.elasticloud.uy";

export const AuthState = ({ children }) => {
  const initialState = {
    usuarioAuth: null,
    isAuthenticated: false,
    cargando: true,
    mensaje: null,
    userRole: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const externalLogin = async () => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      window.location.href = `${BASE_URL}/login`;
    } catch (error) {
      console.error("Error iniciando el flujo de autenticación:", error);
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

      const response = await axios.post(`${BASE_URL}/usuarios/registro`, {
        nombre,
        email,
        password,
      });

      console.log(response.message)

      dispatch({
        type: MOSTRAR_ALERTA,
        payload: { mensaje: "Usuario registrado exitosamente." },
      });
    } catch (error) {
      console.error("Error en el registro interno:", error);
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

      const response = await axios.post(`${BASE_URL}/usuarios/login`, {
        email,
        password,
      });

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

      switch (usuario.role) {
        case "ADMIN":
          window.location.href = "/admin";
          break;
        case "CITIZEN":
          window.location.href = "/usuario";
          break;
        case "SUBMITTER":
          window.location.href = "/submitter";
          break;
        default:
          window.location.href = "/checker";
          break;
      }

    } catch (error) {
      console.error("Error en el login interno:", error);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

"use client";

import { useReducer, useEffect } from "react";
import axios from "axios"; 
import AuthContext from "./auth_context";
import authReducer from "./auth_reducer";
import { MOSTRAR_ALERTA, CARGANDO, LOGIN, LOGOUT, IS_AUTH, OCULTAR_ALERTA } from "@/app/types/app";

export const AuthState = ({ children }) => {
  const initialState = {
    usuarioAuth: null,
    isAuthenticated: false,
    cargando: true,
    mensaje: null,
    userRole: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Función para manejar el flujo de login externo
  const externalLogin = async () => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      window.location.href = "http://localhost:8080/login";
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

  // Función para registro interno
  const internalRegister = async (nombre, email, password) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });

      const response = await axios.post("http://localhost:8080/usuarios/registro", {
        nombre,
        email,
        password,
      });

      dispatch({
        type: MOSTRAR_ALERTA,
        payload: { mensaje: "Usuario registrado exitosamente." },
      });

      // Opcional: Puedes iniciar sesión automáticamente después del registro
      // internalLogin(email, password);
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

  // Función para login interno
  const internalLogin = async (email, password) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });

      const response = await axios.post("http://localhost:8080/usuarios/login", {
        email,
        password,
      });

      const { message, usuario } = response.data;

      // Opcional: Si tu backend devuelve tokens, puedes almacenarlos aquí
      // const { id_token, refresh_token } = response.data;

      // Almacenar información del usuario en localStorage para persistencia
      localStorage.setItem("usuarioAuth", JSON.stringify(usuario));
      // localStorage.setItem("id_token", id_token);
      // localStorage.setItem("refresh_token", refresh_token);

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
        payload: { usuarioAuth, isAuthenticated: true,userRole: usuarioAuth.role },
      });
    } else {
      dispatch({ type: LOGOUT });
    }
    
    dispatch({ type: CARGANDO, payload: { cargando: false } });
  };

  // Función para logout
  const logout = () => {
    localStorage.removeItem("usuarioAuth");
    // localStorage.removeItem("id_token");
    // localStorage.removeItem("refresh_token");
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
        internalLogin, // Agregado
        logout, // Agregado
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

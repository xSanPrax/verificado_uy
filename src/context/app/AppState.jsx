"use client";

import { useReducer, useEffect } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import appReducer from "./AppReducer";
import { SET_DATA, CLEAR_DATA, MOSTRAR_ALERTA, OCULTAR_ALERTA, CARGANDO, SET_DONATION_CONFIG } from "@/app/types/app";

// Configura la URL base para axios
axios.defaults.baseURL = "http://127.0.0.1:8080";

export const AppState = ({ children }) => {
  const initialState = {
    data: null,
    cargando: false,
    mensaje: null,
    donationConfig: {
      email: "",
      bankAccount: "",
      message: "",
    },
    citizenId: null,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);



  const obtenerCitizenId = async () => {
    var usuarioAuth = JSON.parse(localStorage.getItem("usuarioAuth"));
    var email = usuarioAuth["email"];
    
    if (!email) {
      mostrarAlerta("No se encontró un email en el localStorage.");
      return;
    }

    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      const response = await axios.get("/usuarios/obtener-id-por-email", {
        params: { email },
      });
      dispatch({
        type: SET_DATA,
        payload: { citizenId: response.data },
      });
    } catch (error) {
      console.error("Error al obtener el ID del usuario:", error);
      mostrarAlerta("Error al obtener el ID del usuario.");
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

  // Función para obtener un nodo periférico por ID
  const obtenerNodoPerifericoPorId = async (id) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      const response = await axios.get(`/peripheral-nodes/${id}`);
      dispatch({ type: SET_DATA, payload: response.data });
    } catch (error) {
      console.error("Error al obtener el nodo periférico por ID:", error);
      mostrarAlerta("Error al obtener el nodo periférico por ID");
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

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
      dispatch({
        type: SET_DATA, // Actualiza solo data
        payload: { data: response.data },
      });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      dispatch({
        type: MOSTRAR_ALERTA,
        payload: { mensaje: "Error al obtener la lista de usuarios." },
      });
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

  const crearNodoPeriferico = async (name, url, verificationType) => {
    try {
      if (!name || !url || !verificationType) {
        mostrarAlerta("Todos los campos son obligatorios.");
        return;
      }
  
      console.log({ name, url, verificationType });
      dispatch({ type: CARGANDO, payload: { cargando: true } });
  
      const response = await axios.post(
        "/peripheral-nodes/crear",
        { name, url, verificationType },
        { headers: { "Content-Type": "application/json" } }
      );
      
      console.log(response);
      mostrarAlerta("Nodo periférico creado exitosamente.");
    } catch (error) {
      console.error(error.response?.data?.message || "Error al crear el nodo periférico.");
      mostrarAlerta(error.response?.data?.message || "Error al crear el nodo periférico.");
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
      mostrarAlerta(error.response?.data?.message || "Error al validar la conectividad del nodo periférico.");
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

  const fetchDonationConfig = async () => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      const response = await axios.get("/donaciones");
      dispatch({
        type: SET_DONATION_CONFIG, // Asegúrate de usar la acción correctamente
        payload: { donationConfig: response.data },
      });
    } catch (error) {
      console.error("Error al cargar configuración de donación:", error);
      dispatch({
        type: MOSTRAR_ALERTA,
        payload: { mensaje: "No se pudo cargar la configuración de donación." },
      });
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

  const updateDonationConfig = async (donationConfig) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      const response = await axios.post("/donaciones", donationConfig);
      dispatch({
        type: SET_DONATION_CONFIG, // Asegúrate de que esta acción esté definida en tu reducer
        payload: { donationConfig },
      });
      dispatch({
        type: MOSTRAR_ALERTA,
        payload: { mensaje: response.data || "Configuración actualizada exitosamente." },
      });
    } catch (error) {
      console.error("Error al actualizar configuración de donación:", error);
      dispatch({
        type: MOSTRAR_ALERTA,
        payload: { mensaje: "Error al guardar configuración de donación." },
      });
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };
  

  const manejarSuscripcion = async (accion, categoria, citizenId) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
  
      const endpoint =
        accion === "suscribirse"
          ? `/citizen/${citizenId}/suscribirse/${categoria}`
          : `/citizen/${citizenId}/cancelar-suscripcion/${categoria}`;
  
      const response = await axios.post(endpoint);
  
      mostrarAlerta(response.data || "Operación realizada exitosamente.");
    } catch (error) {
      console.error("Error al manejar la suscripción:", error);
      mostrarAlerta(error.response?.data || "Error al manejar la suscripción.");
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };
  
  const obtenerSuscripciones = async (citizenId) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
  
      const response = await axios.get(`/citizen/${citizenId}/suscripciones`);
      dispatch({
        type: SET_DATA,
        payload: { data: response.data },
      });
    } catch (error) {
      console.error("Error al obtener suscripciones:", error);
      mostrarAlerta("Error al obtener las suscripciones.");
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };
  
  const solicitarVerificacion = async (citizenId, hechoId) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
  
      const response = await axios.post(
        `/citizen/${citizenId}/solicitar-verificacion/${hechoId}`
      );
  
      mostrarAlerta(response.data || "Solicitud de verificación enviada exitosamente.");
    } catch (error) {
      console.error("Error al solicitar verificación:", error);
      mostrarAlerta(
        error.response?.data || "Error al solicitar la verificación del hecho."
      );
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };



  useEffect(() => {
    fetchDonationConfig(); // Para las donaciones
    obtenerCitizenId(); 
  }, []);


  return (
    <AppContext.Provider
      value={{
        data: state.data,
        cargando: state.cargando,
        mensaje: state.mensaje,
        donationConfig: state.donationConfig,
        citizenId: state.citizenId,
        createUsuario,
        updateUsuarioRole,
        listUsuarios,
        crearNodoPeriferico,
        obtenerNodoPerifericoPorId,
        validarConectividadNodo,
        clearData,
        mostrarAlerta,
        ocultarAlerta,
        fetchDonationConfig, 
        updateDonationConfig,
        manejarSuscripcion,
        obtenerSuscripciones,
        solicitarVerificacion,
        obtenerCitizenId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

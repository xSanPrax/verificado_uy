"use client";

import { useReducer, useEffect, useCallback } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import appReducer from "./AppReducer";
import { 
  SET_DATA, 
  MOSTRAR_ALERTA, 
  OCULTAR_ALERTA, 
  CARGANDO, 
  SET_DONATION_CONFIG, 
  CARGAR_HECHOS, 
  HECHOS_CARGADOS, 
  ERROR_CARGAR_HECHOS, 
  SET_REPORTES_DATA,
  SET_USUARIOS
} from "@/app/types/app";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

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
    hechos: [],
    totalPages: 0, 
    currentPage: 0, 
    suscripciones: [],
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

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
        type: SET_DONATION_CONFIG,
        payload: { donationConfig: response.data },
      });
    } catch (error) {
      console.error("Error al cargar configuración de donación:", error);
      mostrarAlerta("No se pudo cargar la configuración de donación.");
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

  const updateDonationConfig = async (donationConfig) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      const response = await axios.post(
        "/donaciones",
        donationConfig,
        { headers: { "Content-Type": "application/json" } }
      );
      dispatch({
        type: SET_DONATION_CONFIG,
        payload: { donationConfig },
      });
      mostrarAlerta(response.data || "Configuración actualizada exitosamente.");
    } catch (error) {
      console.error("Error al actualizar configuración de donación:", error);
      mostrarAlerta("Error al guardar configuración de donación.");
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };

  const obtenerCitizenId = async () => {
    try {
      const usuarioAuth = localStorage.getItem("usuarioAuth");
      if (!usuarioAuth) return;

      const email = JSON.parse(usuarioAuth)?.email;
      if (!email) return;

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

  const crearHecho = useCallback(async (description, category) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      const response = await axios.post(
        "/hechos/crear",
        { description, category },
        { headers: { "Content-Type": "application/json" } }
      );
      mostrarAlerta("Hecho creado exitosamente.");
      console.log(response)
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al crear el hecho.";
      console.error("Error al crear el hecho:", errorMessage);
      mostrarAlerta(errorMessage);
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  }, []);

  const listarHechosPaginados = useCallback(async (page = 0, size = 10) => {
    try {
      dispatch({ type: CARGAR_HECHOS });
      const response = await axios.get("/hechos/listarHechos", {
        params: { page, size },
      });

      dispatch({
        type: HECHOS_CARGADOS,
        payload: {
          hechos: response.data.content, // Datos de los hechos
          totalPages: response.data.totalPages, // Total de páginas
          currentPage: response.data.number, // Página actual
        },
      });
    } catch (error) {
      console.error("Error al listar los hechos:", error);
      mostrarAlerta(
        error.response?.data?.message || "Error al listar los hechos."
      );
      dispatch({
        type: ERROR_CARGAR_HECHOS,
        payload: "Error al listar los hechos.",
      });
    }
  }, []);

  const fetchTopCategoriasDeHechos = async (desde, hasta) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      const response = await axios.get(
        `/reportes/getTopCategoriasDeHechos?desde=${desde}&hasta=${hasta}`
      );
      dispatch({ type: SET_REPORTES_DATA, payload: { data: response.data } });
    } catch (error) {
      console.error("Error al obtener top de categorías:", error);
      mostrarAlerta("Error al cargar el top de categorías.");
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };


  const solicitarVerificacionCitizen = async (actionType, hechoId) => {
    const { citizenId } = state; 
    if (actionType === "solicitarVerificacionCitizen") {  
      if (!citizenId) {
        console.warn("Citizen ID no está definido");
        return;
      }
  
      try {
        const response = await axios.post(`/citizen/${citizenId}/solicitar-verificacion/${hechoId}`);
        alert("Solicitud realizada con exito");
      } catch (error) {
        alert("Error al enviar la solicitud: " + (error.response?.data || "Error desconocido."));
      }
    }
  };

    // Función para manejar la suscripción y cancelación
  const manejarSuscripcion = useCallback(async (accion, categoria) => {
    const { citizenId } = state;

    try {
      dispatch({ type: "CARGANDO", payload: { cargando: true } });

      const endpoint =
        accion === "suscribirse"
          ? `/citizen/${citizenId}/suscribirse/${categoria}`
          : `/citizen/${citizenId}/cancelar-suscripcion/${categoria}`;

      const { data } = await axios.post(endpoint);

      mostrarAlerta(data);
    } catch (error) {
      const errorMessage =
        error.response?.data || "Error al manejar la suscripción.";
      mostrarAlerta(errorMessage);
    } finally {
      dispatch({ type: "CARGANDO", payload: { cargando: false } });
    }
  }, [state.citizenId]);

  const obtenerSuscripciones = useCallback(async (pagina = 0, tamano = 10) => {
    const { citizenId } = state;
  
    try {
      dispatch({ type: "CARGANDO", payload: { cargando: true } });
  
      const { data } = await axios.get(`/citizen/${citizenId}/suscripciones`, {
        params: { page: pagina, size: tamano },
      });
  
      dispatch({ type: "SET_SUSCRIPCIONES", payload: data });
  
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data || "Error al obtener las suscripciones.";
      mostrarAlerta(errorMessage);
      return null; // Retorna null en caso de error para diferenciar de un arreglo vacío
    } finally {
      dispatch({ type: "CARGANDO", payload: { cargando: false } });
    }
  }, [state.citizenId]);
  

  // Función para solicitar verificación
  const solicitarVerificacion = useCallback(async (hechoId) => {
    const { citizenId } = state;

    try {
      dispatch({ type: "CARGANDO", payload: { cargando: true } });

      const { data } = await axios.post(
        `/citizen/${citizenId}/solicitar-verificacion/${hechoId}`
      );

      mostrarAlerta(data);
    } catch (error) {
      const errorMessage =
        error.response?.data || "Error al solicitar la verificación.";
      mostrarAlerta(errorMessage);
    } finally {
      dispatch({ type: "CARGANDO", payload: { cargando: false } });
    }
  }, [state.citizenId]);


  const crearUsuario = async (nombre, email) => {
    try {
      const params = new URLSearchParams();
      params.append("nombre", nombre);
      params.append("email", email);
  
      const response = await axios.post(`/admin/crear-usuario?${params.toString()}`);
  
      const message = typeof response.data === "string"
        ? response.data
        : response.data.message || JSON.stringify(response.data);
  
      return { success: true, message };
    } catch (error) {
      const message = error.response?.data?.error ||
                      error.response?.data?.message ||
                      error.message;
      return { success: false, message };
    }
  };

  const modificarUsuarioRole = async (email, nuevoRol) => {
    try {
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("nuevoRol", nuevoRol);
  
      const response = await axios.put(`/admin/modificar-rol?${params.toString()}`);
  
      const message = typeof response.data === "string"
        ? response.data
        : response.data.message || JSON.stringify(response.data);
  
      return { success: true, message };
    } catch (error) {
      const message = error.response?.data?.error ||
                      error.response?.data?.message ||
                      error.message;
      return { success: false, message };
    }
  };

  const listUsuarios = async () => {
    try {
      const response = await axios.get("/usuarios/listar-usuarios");

      const usuarios = typeof response.data === "string" 
        ? JSON.parse(response.data) 
        : response.data;

      dispatch({
        type: SET_USUARIOS,
        payload: usuarios,
      });
    } catch (error) {
      const mensaje = error.response?.data?.error || 
                      error.response?.data?.message || 
                      "Error al cargar los usuarios.";

      dispatch({
        type: "MOSTRAR_ALERTA",
        payload: { mensaje },
      });
    }
  };

  useEffect(() => {
    fetchDonationConfig();
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
        hechos: state.hechos,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        suscripciones: state.suscripciones,
        mostrarAlerta,
        ocultarAlerta,
        fetchDonationConfig,
        updateDonationConfig,
        obtenerCitizenId,
        listarHechosPaginados,
        crearHecho,
        fetchTopCategoriasDeHechos,
        solicitarVerificacionCitizen,
        manejarSuscripcion,
        obtenerSuscripciones,
        solicitarVerificacion,
        crearUsuario,
        modificarUsuarioRole,
        listUsuarios,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

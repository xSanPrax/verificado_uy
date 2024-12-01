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
  SET_REPORTES_DATA 
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
    totalPages: 0, // Total de páginas para la paginación
    currentPage: 0, // Página actual
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
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al crear el hecho.";
      console.error("Error al crear el hecho:", errorMessage);
      mostrarAlerta(errorMessage);
      return null;
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
        alert(response.message);
      } catch (error) {
        alert("Error al enviar la solicitud: " + (error.response?.data || "Error desconocido."));
      }
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
        mostrarAlerta,
        ocultarAlerta,
        fetchDonationConfig,
        updateDonationConfig,
        obtenerCitizenId,
        listarHechosPaginados,
        crearHecho,
        fetchTopCategoriasDeHechos,
        solicitarVerificacionCitizen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

"use client";

import { useReducer, useEffect } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import appReducer from "./AppReducer";
import { SET_DATA, CLEAR_DATA, MOSTRAR_ALERTA, OCULTAR_ALERTA, CARGANDO, SET_DONATION_CONFIG, SET_REPORTES_DATA } from "@/app/types/app";

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
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

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

  const listUsuarios = async (rol = null) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
      
      const response = rol 
        ? await axios.get("/usuarios/listar-usuarios", { params: { rol } }) 
        : await axios.get("/usuarios/listar-usuarios");
      
      dispatch({
        type: SET_DATA,
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

  // Agregar funciones para manejar reportes
  const fetchHechosVerificadosEntreFechas = async (desde, hasta) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
  
      const response = await axios.get(
        `/reportes/getHechosVerificadosEntreFechas?desde=${desde}&hasta=${hasta}`
      );
  
      dispatch({ type: SET_REPORTES_DATA, payload: { data: response.data } });
    } catch (error) {
      console.error("Error al obtener hechos verificados:", error);
      mostrarAlerta("Error al cargar hechos verificados.");
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };
  
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

  // Nueva función: Crear un hecho
  const crearHecho = async (description, category) => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } });
  
        
      // Realiza la solicitud para crear el hecho
      const response = await axios.post(
        "/hechos/crear",
        { description, category },
        { headers: { "Content-Type": "application/json" } }
      );
  
      mostrarAlerta("Hecho creado exitosamente");
      return response.data;
    } catch (error) {
      console.error("Error al crear el hecho:", error);
      mostrarAlerta("Error al crear el hecho");
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } });
    }
  };  

  // Nueva función: Obtener hechos en estado 'nuevo'
  const obtenerSolicitudesNuevas = async () => {
    try {
      dispatch({ type: CARGANDO, payload: { cargando: true } }); // Establecer estado cargando en true
      const response = await axios.get("/submitter/solicitudes-nuevas");
      console.log("Respuesta de la API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error en la solicitud de hechos nuevos:", error);
      mostrarAlerta("Error al obtener los hechos nuevos.");
      return []; // Devuelve un array vacío si la solicitud falla
    } finally {
      dispatch({ type: CARGANDO, payload: { cargando: false } }); // Establecer estado cargando en false
    }
  };
  
  
  useEffect(() => {
    fetchDonationConfig(); // Cargar la configuración al iniciar
  }, []);


  return (
    <AppContext.Provider
      value={{
        data: state.data,
        cargando: state.cargando,
        mensaje: state.mensaje,
        donationConfig: state.donationConfig,
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
        fetchTopCategoriasDeHechos,
        fetchHechosVerificadosEntreFechas,
        crearHecho,
        obtenerSolicitudesNuevas,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

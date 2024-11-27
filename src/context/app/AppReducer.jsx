import { SET_DATA, SET_DONATION_CONFIG, CLEAR_DATA, MOSTRAR_ALERTA, OCULTAR_ALERTA, CARGANDO, SET_REPORTES_DATA, CARGAR_HECHOS_NUEVOS } from "@/app/types/app";

export default (state, action) => {
  switch (action.type) {
    case SET_DONATION_CONFIG: // Manejar solo donationConfig
      return {
        ...state,
        donationConfig: action.payload.donationConfig || state.donationConfig,
      };
    case SET_DATA: // Manejar los hechos
      return {
        ...state,
        hechos: action.payload.data || state.hechos,
      };
    case CLEAR_DATA:
      return {
        ...state,
        data: null,
      };
    case MOSTRAR_ALERTA:
      return {
        ...state,
        mensaje: action.payload.mensaje,
      };
    case OCULTAR_ALERTA:
      return {
        ...state,
        mensaje: null,
      };
    case CARGANDO:
      return {
        ...state,
        cargando: action.payload.cargando,
      };
    case CARGAR_HECHOS_NUEVOS: // Maneja el estado de carga para los hechos nuevos
      return {
        ...state,
        cargando: true, // Activamos el estado de carga cuando se está buscando hechos nuevos
      };
    case SET_REPORTES_DATA:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

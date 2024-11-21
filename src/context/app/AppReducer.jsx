import { SET_DATA, SET_DONATION_CONFIG, CLEAR_DATA, MOSTRAR_ALERTA, OCULTAR_ALERTA, CARGANDO, CARGAR_HECHOS, HECHOS_CARGADOS, ERROR_CARGAR_HECHOS } from "@/app/types/app";

export default (state, action) => {
  switch (action.type) {
    case SET_DONATION_CONFIG: 
      return {
        ...state,
        donationConfig: action.payload.donationConfig || state.donationConfig,
      };
    case SET_DATA: 
      return {
        ...state,
        data: action.payload.data || state.data,
      };
    case CLEAR_DATA:
      return {
        ...state,
        data: null,
        citizenId: null, 
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
      case CARGAR_HECHOS:
      return {
        ...state,
        cargando: true,
        mensaje: null,
      };
    case HECHOS_CARGADOS:
      return {
        ...state,
        cargando: false,
        hechos: action.payload, 
      };
    case ERROR_CARGAR_HECHOS:
      return {
        ...state,
        cargando: false,
        mensaje: action.payload, 
      };
    default:
      return state;
  }
};

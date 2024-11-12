import { SET_DATA, CLEAR_DATA, MOSTRAR_ALERTA, OCULTAR_ALERTA, CARGANDO } from "@/app/types/app";

export default (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
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
    default:
      return state;
  }
};

import { 
    IS_AUTH, 
    LOGIN, 
    MOSTRAR_ALERTA, 
    OCULTAR_ALERTA, 
    LOGOUT, 
    CARGANDO 
  } from "@/app/types/app";
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state, action) => {
      switch (action.type) {
          case LOGIN:
              return {
                 ...state,
                  usuarioAuth: action.payload.usuarioAuth,
                  isAuthenticated: action.payload.isAuthenticated,
                  userRole: action.payload.usuarioAuth.role
              }
          case IS_AUTH:
              return {
                 ...state,
                  usuarioAuth: action.payload.usuarioAuth,
                  isAuthenticated: action.payload.isAuthenticated,
                  userRole: action.payload.usuarioAuth.role
              }
          case LOGOUT:
              return {
                  ...state,
                  usuarioAuth: null,
                  isAuthenticated: false,
                  mensaje: null,
                  userRole : null
              };
          case MOSTRAR_ALERTA:
              return{
                  ...state,
                  mensaje: action.payload.mensaje
              }
          case OCULTAR_ALERTA:
              return{
                 ...state,
                  mensaje: null
              }
          case CARGANDO: 
              return{
                  ...state,
                  cargando: action.payload.cargando
              }         
          default:
              return state;
      }
  }
  
import { IS_AUTH, LOGIN, MOSTRAR_ALERTA, OCULTAR_ALERTA, REGISTRO, LOGOUT, CARGANDO, ACTUALIZAR_INFO } from "@/types";


// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) =>{
    switch (action.type) {
        case LOGIN:
            return {
               ...state,
                usuarioAuth: action.payload.usuarioAuth,
                isAuthenticated: action.payload.isAuthenticated
            }
        case ACTUALIZAR_INFO:
            return{
               ...state,
                usuarioAuth: action.payload.usuarioAuth
            }
        case IS_AUTH:
            return {
               ...state,
                usuarioAuth: action.payload.usuarioAuth,
                isAuthenticated: action.payload.isAuthenticated
            }
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
        case LOGOUT:
            return {
                ...state,
                usuarioAuth: {
                    email: "",
                    password: ""
                },
                isAuthenticated: false
            };
        case CARGANDO: 
            return{
                ...state,
                cargando: action.payload.cargando
            }         
        default:
            return state;
    }
}
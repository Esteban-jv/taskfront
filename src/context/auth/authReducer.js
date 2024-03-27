import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

// eslint-disable-next-line
export default (state, action) => {
    switch(action.type)
    {
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                loading: false
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                loading: false,
                mensaje: action.payload?action.payload:null
            }
        case OBTENER_USUARIO:
            console.log(action.payload, action.payload.user)
            localStorage.setItem('user',JSON.stringify(action.payload.user));
            return {
                ...state,
                usuario: action.payload.user,
                loading: false
            }
        default:
            return state;
    }
}
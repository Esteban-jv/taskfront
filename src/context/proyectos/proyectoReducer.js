import { AGREGAR_PROYECTOS, FORMULARIO_PROYECTO, OBTENER_PROYECTOS, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ALERTA } from '../../types';

 // eslint-disable-next-line
export default (state, action) => {
    switch(action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTOS:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorformulario: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: action.payload? state.proyectos.filter(proyecto => proyecto.id === action.payload) : null
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto.id !== action.payload),
                proyecto: null
            }
        case PROYECTO_ALERTA:
            return {
                ...state,
                mensaje: action.payload
            }
        default: return state;
    }
}
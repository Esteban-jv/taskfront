import React, { useReducer, useContext } from 'react';

import proyectoContext from './ProyectoContext';
import proyectoReducer from './proyectoReducer';
import {
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ALERTA
} from '../../types';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import AuthContext from '../auth/authContext';

const ProyectoState = props => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;
    // const usuario = null;
    // console.log(authContext);

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    // Dispatch para ejecturar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // Serie de funcuiines para el crud
    const setMostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // Obtener los proyectos
    const setObtenerProyectos = async () => {
        try {
            const token = localStorage.getItem('token');
            // console.warn(token);
            tokenAuth(token);
            const resultado = await clienteAxios.get(`/api/projects/user/${usuario.id}`);
            // console.log(resultado);
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data
            });
        } catch (error) {
            // console.error(error);
            const alerta = {
                msg: error.response.data.detail || 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ALERTA,
                payload: alerta
            })
        }
    }

    // Agregar poryecto nuevo
    const agregarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token');
            // console.warn(token);
            tokenAuth(token);
            const resultado = await clienteAxios.post('/api/projects/create/', proyecto);
            // console.log(resultado);
            const alerta = {
                msg: resultado.data.detail || 'Acción exitosa',
                categoria: 'alerta-ok'
            }
            dispatch({
                type: PROYECTO_ALERTA,
                payload: alerta
            })

            // Agregar proyecto
            dispatch({
                type: AGREGAR_PROYECTOS,
                payload: resultado.data
            })
        }
        catch (error)
        {
            // console.log(error.response);
            const alerta = {
                msg: error.response.data.detail || 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ALERTA,
                payload: alerta
            })
        }
    }

    // Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Activa el proyecto seleccionado
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    // Elimina un poryecto
    const eliminarProyecto = async proyectoId => {
        try {
            const token = localStorage.getItem('token');
            // console.warn(token);
            tokenAuth(token);
            const resultado = await clienteAxios.delete(`/api/projects/delete/${proyectoId}`);
            // console.log(resultado);
            const alerta = {
                msg: resultado.data.detail || 'Acción exitosa',
                categoria: 'alerta-ok'
            }
            dispatch({
                type: PROYECTO_ALERTA,
                payload: alerta
            })

            // Agregar proyecto
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        }
        catch (error)
        {
            // console.log(error.response);
            //PROYECTO_ALERTA
            const alerta = {
                msg: error.response.data.detail || 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ALERTA,
                payload: alerta
            })
        }
    }

    return (
        <proyectoContext.Provider
            value={{
                // states
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,

                //funciones
                setMostrarFormulario,
                setObtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;
import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    // ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA,
    TAREA_ALERTA
} from '../../types';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const TareaState = props => {
    // state inicial
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null,
        mensaje: null
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    // Crear las funciones

    // Obtener las tareas
    const obtenerTareas = async proyecto => {
        try {
            const token = localStorage.getItem('token');
            tokenAuth(token);
            const resultado = await clienteAxios.get(`/api/tasks/project/${proyecto}`);
            // console.log(resultado.data);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data
            });
        } catch (error) {
            // console.error(error);
            const alerta = {
                msg: error.response.data.detail || 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: TAREA_ALERTA,
                payload: alerta
            })
        }
    }

    // Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try {
            const token = localStorage.getItem('token');
            // console.warn(token);
            tokenAuth(token);
            const resultado = await clienteAxios.post('/api/tasks/create/',tarea);
            // console.log(resultado);

            // Agregar tarea
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data
            })

            const alerta = {
                msg: resultado.data.detail || 'Acción realizada',
                categoria: 'alerta-ok'
            }
            dispatch({
                type: TAREA_ALERTA,
                payload: alerta
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
                type: TAREA_ALERTA,
                payload: alerta
            })
        }
    }

    // Valida y muestra un error en caso que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Eliminar tarea por id
    const eliminarTarea = async id => {
        try {
            const token = localStorage.getItem('token');
            tokenAuth(token);
            const resultado = await clienteAxios.delete(`/api/tasks/delete/${id}`);
            // console.log(resultado);

            // Agregar tarea
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })

            const alerta = {
                msg: resultado.data.detail || 'Acción exitosa',
                categoria: 'alerta-ok'
            }
            dispatch({
                type: TAREA_ALERTA,
                payload: alerta
            })
        }
        catch (error)
        {
            const alerta = {
                msg: error.response.data.detail || 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: TAREA_ALERTA,
                payload: alerta
            })
        }
    }

    // Cambia el estado de cada tarea
    /*const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }*/

    //  Extrae una tarea para editar
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //  Edita una tarea
    const actualizarTarea = async tarea => {
        try {
            const token = localStorage.getItem('token');
            tokenAuth(token);
            const resultado = await clienteAxios.post(`/api/tasks/update/${tarea.id}`,tarea);
            // console.log(resultado.data);

            // Actualizar tarea
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data
            })

            const alerta = {
                msg: resultado.data.detail || 'Acción exitosa',
                categoria: 'alerta-ok'
            }
            dispatch({
                type: TAREA_ALERTA,
                payload: alerta
            })
        }
        catch (error)
        {
            const alerta = {
                msg: error.response.data.detail || 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: TAREA_ALERTA,
                payload: alerta
            })
        }
    }

    //  Limpiar tarea
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return (
        <TareaContext.Provider
            value={{
                //states
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                mensaje: state.mensaje,
                //dispatchs
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;
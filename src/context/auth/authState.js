import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        loading: true, // para mejorar experiencia de usuario
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Funciones del crud

    const registrarUsuario = async datos => {
        // console.log(datos);
        try {
            const respuesta = await clienteAxios.post('/api/createaccounnt/',datos);
            // console.log(respuesta);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            // Obtener el usuario
            get_user(respuesta);
        }
        catch (error) {
            // console.error(error.response);

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    //custom get_user
    const get_user = response => {
        dispatch({
            type: OBTENER_USUARIO,
            payload: response.data
        });
    }
    //custom get_storage
    const get_user_storage = () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        const fake_reponse = {
            token: token,
            data: {user:user?JSON.parse(user):null}
        }

        // console.log(fake_reponse);

        if(user && token) {
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: fake_reponse
            });

            get_user(fake_reponse)
        }
    }
    // Retorna el usuario autenticado
    /*const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');

        if(token) {
            // TODO función para enviar el token por headers
            tokenAuth(token)
        }

        try {
            const respuesta = await clienteAxios.get('/api/users/get');
            get_user(respuesta)
        }
        catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }*/

    // Cuando el usuario inicia sesion
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/login',datos);
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            // Obtener el usuario
            get_user(respuesta);
        }
        catch (error) {
            // console.error(error.response);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // Cierra la sesión del usuario
    const cerrarSesion = () => {
        // console.log("vete a la verga jimbo")
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                loading: state.loading,

                registrarUsuario,
                iniciarSesion,
                get_user_storage,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;
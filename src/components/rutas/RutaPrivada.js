import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet  } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

/* Higher Order Component Generico */
const RutaPrivada = () => {

    const authContext = useContext(AuthContext);
    // const { autenticado, get_user_storage } = authContext;
    const { autenticado, loaging, get_user_storage } = authContext;
    // check Solucionar un problema con la protección de componentes

    useEffect(() => {
        get_user_storage()
        // eslint-disable-next-line
    }, [])

    return autenticado && !loaging ? <Outlet /> : <Navigate to="/" />
}

export default RutaPrivada;
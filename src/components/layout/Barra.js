import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';

const Barra = () => {
    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario, get_user_storage, cerrarSesion } = authContext;

    useEffect(() => {
        get_user_storage()
        // eslint-disable-next-line
    }, [])

    return ( 
        <header className="app-header">
            { usuario ? <p className="nombre-usuario">Hola <span>{usuario.first_name}</span></p> : null }

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion()}
                >Cerrar Sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;
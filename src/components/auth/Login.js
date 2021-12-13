import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/auth/authContext';



const Login = () => {

    /* para iniciar sesion */
    const history = useNavigate();
    // extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    // En caso que el usuario se haya autenticado o registrado
    useEffect(() => {
        if(autenticado) {
            history('/proyectos')
        }
        if(mensaje) {
            mostrarAlerta(mensaje.msg,mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, history])

    const [usuario, setUsuario] = useState({
        username: '',
        password: ''
    });

    //extraer
    const { username, password } = usuario;

    const onChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault();
        //validar campos
        if(username.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios','alerta-error')
            return;
        }
        //action
        iniciarSesion({username, password});
    }
    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesión</h1>
                <form onSubmit={onSubmit} >
                    <div className="campo-form">
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Ingresar Usuario"
                            value={username}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingresar Contraseña"
                            password={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión"/>
                    </div>
                </form>

                <Link to={'/nueva-cuenta'} className="enlace-cuenta">Crear cuenta</Link>
            </div>
        </div>
     );
}
 
export default Login;
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate   } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/auth/authContext';

const NuevaCuenta = () => {

    const history = useNavigate();
    // extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

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

    // State para iniciar sesion
    const [usuario, setUsuario] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        username: '',
        password: '',
        confirmar: ''
    });

    //extraer
    const { nombre, apellidos, email, username, password, confirmar } = usuario;

    const onChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault();
        //validar campos
        if(nombre.trim() === '' || email.trim() === '' || username.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            // console.warn(alerta);
            return;
        }

        if(password.length < 6) {
            mostrarAlerta('El password debe tener al menos 6 caracteres', 'alerta-error');
            return;
        }

        if(password !== confirmar) {
            mostrarAlerta('Las contraseñas no coinciden', 'alerta-error');
            return;
        }
        //action
        registrarUsuario({
            nombre, apellidos, email, username, password
        })
    }
    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Crear cuenta</h1>
                <form onSubmit={onSubmit} >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Ingresar nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input
                            type="text"
                            id="apellidos"
                            name="apellidos"
                            placeholder="Ingresar nombre"
                            value={apellidos}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresar email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Ingresar username"
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
                        <label htmlFor="confirmar">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Confirmar contraseña"
                            password={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme"/>
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">Iniciar Sesion</Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;
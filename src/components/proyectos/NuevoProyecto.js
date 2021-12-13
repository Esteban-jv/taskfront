import React, { Fragment, useContext, useState } from 'react';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import AuthContext from '../../context/auth/authContext';

const NuevoProyecto = () => {

    // state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorformulario, setMostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;

    /*useEffect(() => {
        get_user_storage()
    }, [])*/

    const [proyecto, setProyecto] = useState({
        nombre: '',
        user: 0
    });

    const { nombre } = proyecto;

    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const onSumbitProyecto = e => {
        e.preventDefault();
        // console.log(usuario);
        //validar
        if(nombre.trim()==='') {
            mostrarError();
            return;
        }

        if(!usuario) {
            mostrarError();
            return;
        }
        else
            proyecto.user = usuario.id;

        //agregar al state
        agregarProyecto(proyecto)

        //reiniciaar form
        setProyecto({
            nombre: '',
            user: usuario.id
        })
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => setMostrarFormulario()}
            >
                Nuevo Proyecto
            </button>

            {
                formulario ?
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSumbitProyecto}
                    >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre del proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />

                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar proyecto"
                        />

                    </form>
                )
            : null }

            { errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null }
        </Fragment>
     );
}
 
export default NuevoProyecto;
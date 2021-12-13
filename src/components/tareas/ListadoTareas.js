import React, { Fragment, useContext, useEffect } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoTareas = () => {

    // state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    // state de tareas
    const tareasContext = useContext(tareaContext);
    const { tareasproyecto, mensaje } = tareasContext;
    
    // Obtener proyectos cuando carga el componente
    useEffect(() => {

        if(mensaje)
            mostrarAlerta(mensaje.msg, mensaje.categoria)

        // eslint-disable-next-line
    },[mensaje]);

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    // Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    // Array descrutcuring para extrer proyecto actual
    const [proyectoActual] = proyecto;

    // Funcion eliminar proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual.id)
    }
    return ( 
        <Fragment>
            <h2>{proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                { alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null }
                {tareasproyecto.length?
                    <TransitionGroup>
                        {tareasproyecto.map( tarea => (
                            <CSSTransition
                                key={tarea.id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea
                                    
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ) )}
                    </TransitionGroup>
                : (<li className="tarea"><p>No hay tareas</p></li>)
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;
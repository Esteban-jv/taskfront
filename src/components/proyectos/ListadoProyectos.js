import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = () => {

    // Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, mensaje, setObtenerProyectos, proyectoActual } = proyectosContext;

    // Obtener proyectos cuando carga el componente
    useEffect(() => {

        if(mensaje)
            mostrarAlerta(mensaje.msg, mensaje.categoria)

        setObtenerProyectos();
        proyectoActual(null);
        // eslint-disable-next-line
    },[mensaje]);

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    // Revisar si proyectos tiene contenido
    if (!proyectos.length) return <p>No hay proyectos, comienza creando uno</p>;

    return ( 
        <ul className="listado-proyectos">
            { alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null }
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition 
                        key={proyecto.id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto proyecto={proyecto} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;
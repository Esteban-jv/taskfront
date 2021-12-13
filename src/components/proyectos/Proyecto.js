import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {
    // Obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    // Obtener el state de tareas
    const tareasContext = useContext(TareaContext);
    const { obtenerTareas } = tareasContext;

    // Funciona para seleccionar proyecto
    const seleccionarProyecto = id => {
        proyectoActual(id); //get Project by Id
        obtenerTareas(id); //get Tareas By Id
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto.id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;
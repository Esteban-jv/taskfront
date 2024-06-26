import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTatea = () => {

     // state del formulario
     const proyectosContext = useContext(proyectoContext);
     const { proyecto } = proyectosContext;

     // state de tareas
     const tareasContext = useContext(tareaContext);
     const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

     // Effect que detecta si hay tarea seleccionada
     useEffect(() => {
         setTarea(tareaseleccionada?tareaseleccionada:{
             nombre:''
         });
     }, [tareaseleccionada])

     // State del formulario
     const [tarea, setTarea] = useState({
         nombre: ''
     });

     // Extraer el nombre del proyecto
     const { nombre } = tarea;

    // Si no hay proyecto seleccionado
    if(!proyecto) return null;

    // Array descrutcuring para extrer proyecto actual
    const [proyectoActual] = proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        });
    }
    const onSubmit = e => {
        e.preventDefault();

        //validar
        if(nombre.trim() === '')
        {
            validarTarea();
            return;
        }

        // Revisar si es edicion
        if(tareaseleccionada)
        {
            actualizarTarea(tarea);
            limpiarTarea();
        }
        else {
            //agregar una tarea al state de tareas
            tarea.proyecto = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        }

        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        //reiniciar el form
        setTarea({
            nombre: ''
        });
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre de tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-submit btn-primario btn-block"
                        value={tareaseleccionada? 'Editar tarea' : 'Agregar tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">Debe tener nombre</p> : null}
        </div>
     );
}
 
export default FormTatea;
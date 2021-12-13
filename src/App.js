import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/auth/authState';

import RutaPrivada from './components/rutas/RutaPrivada';

function App() {
  return (
    <AuthState>
      <ProyectoState>
        <TareaState>
          <AlertaState>
            <Router>
              <Routes>
                <Route  path="/" element={< Login />} />
                <Route  path="/nueva-cuenta" element={< NuevaCuenta />} />
                <Route  path="/proyectos" element={< RutaPrivada />} >
                  <Route exact path="/proyectos" element={<Proyectos/>} />
                </Route>
              </Routes>
            </Router>
          </AlertaState>
        </TareaState>
      </ProyectoState>
    </AuthState>
  )
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import CadastroProfessores from './pages/CadastroProfessores/CadastroProfessores.js'
import CadastroDesafio from './pages/cadastroDesafio/CadastroDesafio.js'
import CadastroPeriodo from './pages/CadastroPeriodo/CadastroPeriodo.js'
import CadastroSala from './pages/CadastroSalas/CadastroSala.js'
import CadastroCurso from './pages/cadastroCurso/cadastroCurso.js'
import CalendarioHorario from './pages/CalendarioHorario/CalendarioHorario.js'

const router = createBrowserRouter([
  {path:"/CadastroProfessores", element:<CadastroProfessores />},
  {path:"/CadastroDesafio", element:<CadastroDesafio />},
  {path:"/CadastroPeriodo", element:<CadastroPeriodo />},
  {path:"/CadastroSala", element:<CadastroSala />},
  {path:"/CadastroCurso", element:<CadastroCurso />},
  {path:"/", element:<CalendarioHorario />},
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();

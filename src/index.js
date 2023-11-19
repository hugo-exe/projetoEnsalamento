import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Inicial from './pages/InicialPage/inicialPage.js'
import CadastroProfessores from './pages/cadastroProfessores/cadastroProfessores.js'
import CadastroDesafio from './pages/cadastroDesafio/cadastroDesafio.js'
import CadastroPeriodo from './pages/cadastroPeriodo/cadastroPeriodo.js'
import CadastroSalas from './pages/CadastroSalas/CadastroSala.js'
import CadastroCurso from './pages/cadastroCurso/cadastroCurso.js'
import CalendarioHorario from './pages/CalendarioHorario/calendarioHorario.js'

const router = createBrowserRouter([
  {path:"/", element:<Inicial />},
  {path:"/CadastroProfessores", element:<CadastroProfessores />},
  {path:"/CadastroDesafio", element:<CadastroDesafio />},
  {path:"/CadastroPeriodo", element:<CadastroPeriodo />},
  {path:"/CadastroSalas", element:<CadastroSalas />},
  {path:"/CadastroCurso", element:<CadastroCurso />},
  {path:"/CalendarioHorario", element:<CalendarioHorario />},
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();

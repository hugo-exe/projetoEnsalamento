import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Header from '../../component/header/Header';

const Calendario = () => {
  const [salas, setSalas] = useState([]);
  const [dadosDoDia, setDadosDoDia] = useState([]);
  const [desafiosCadastrados, setDesafiosCadastrados] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    const salasCadastradas = JSON.parse(localStorage.getItem('salasData')) || [];
    setSalas(salasCadastradas);

    const desafiosCadastrados = JSON.parse(localStorage.getItem('desafiosData')) || [];
    setDesafiosCadastrados(desafiosCadastrados);

    const storedPeriodos = JSON.parse(localStorage.getItem('periodosData')) || [];
    setPeriodos(storedPeriodos);

    const storedProfessores = JSON.parse(localStorage.getItem('professoresData')) || [];
    setProfessores(storedProfessores);
  }, []);

  const handleDayClick = (dia) => {
    const anoMesAtual = '2023-11'; 
    const dataSelecionada = `${anoMesAtual}-${dia < 10 ? '0' + dia : dia}`; 
  
    const dadosDia = desafiosCadastrados.filter(
      (desafio) => desafio.dataAula === dataSelecionada
    );
    setDadosDoDia(dadosDia);
  };

  
  const getPeriodoInfo = (periodoId) => {
    const periodo = periodos.find((p) => p.id === parseInt(periodoId));
    return periodo ? `${periodo.numeroPeriodo} - ${periodo.semestreAno}` : 'Não encontrado';
  };

  const getProfessorNome = (professorId) => {
    const professor = professores.find((p) => p.id === parseInt(professorId));
    return professor ? professor.nome : 'Não encontrado';
  };

  const getSalaInfo = (salaId) => {
    const sala = salas.find((s) => s.id === parseInt(salaId));
    return sala ? `${sala.predio} - ${sala.numero}` : 'Não encontrada';
};

  const renderCalendario = () => {
    const diasDaSemana = ['Qua', 'Qui', 'Sex', 'Sáb', 'Dom', 'Seg', 'Ter'];
    const diasDoMes = [];
    let contadorDias = 1;

    for (let i = 1; i <= 30; i++) {
      const diaSemana = diasDaSemana[(i + 2) % 7]; 

      diasDoMes.push({ dia: contadorDias, diaSemana });
      contadorDias++;
    }

    const linhas = [];
    const quantidadeLinhas = Math.ceil(diasDoMes.length / 7);

    for (let i = 0; i < quantidadeLinhas; i++) {
      linhas.push(diasDoMes.slice(i * 7, i * 7 + 7));
    }

    return (
      <Table responsive bordered>
        <thead>
          <tr>
            <th></th>
            {diasDaSemana.map((dia) => (
              <th key={dia}>{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, index) => (
            <tr key={index}>
              <td></td>
              {linha.map(({ dia, diaSemana }) => (
                <td key={dia} onClick={() => handleDayClick(dia)}>
                  {dia}
                  <br />
                  {diaSemana}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };  

  

  const renderDadosDoDia = () => {
    return (
      <div>
        <h2>Dados do dia selecionado:</h2>
        {dadosDoDia.length > 0 ? (
          <ul>
            {dadosDoDia.map((desafio, index) => (
              <li key={index}>
                <p>Nome do Desafio: {desafio.nomeDesafio}</p>
                <p>Período: {getPeriodoInfo(desafio.periodo)}</p>
                <p>Professor: {getProfessorNome(desafio.professor)}</p>
                <p>Data de Início: {desafio.dataInicio}</p>
                <p>Data de Fim: {desafio.dataFim}</p>
                <p>Sala: {getSalaInfo(desafio.sala)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum desafio cadastrado para este dia.</p>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="navBar">
        <Header />
      </div>
      <div>
        <h1>Calendário com Dados das Salas</h1>
        {renderCalendario()}
        {renderDadosDoDia()}
      </div>
    </>
  );
};

export default Calendario;
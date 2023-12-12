import React, { useState, useEffect } from "react";
import Header from "../../component/header/Header";
import "../../assets/css/cadastroCurso.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../assets/css/cadastroPeriodo.css";

function CadastroPeriodo() {
  const [periodo, setPeriodo] = useState({
    numeroPeriodo: "",
    semestreAno: "",
    dataInicio: "",
    dataFim: "",
    turno: {
      matutino: false,
      vespertino: false,
      noturno: false,
    },
    cursoRelacionado: "",
    nomeCoordenador: "",
  });

  const [cursosCadastrados, setCursosCadastrados] = useState([]);
  const [periodosSalvos, setPeriodosSalvos] = useState([]);

  useEffect(() => {
    const storedCursos = localStorage.getItem("cursosData");
    if (storedCursos) {
      setCursosCadastrados(JSON.parse(storedCursos));
    }

    const storedPeriodos = localStorage.getItem("periodosData");
    if (storedPeriodos) {
      setPeriodosSalvos(JSON.parse(storedPeriodos));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPeriodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPeriodo((prevState) => ({
      ...prevState,
      turno: {
        ...prevState.turno,
        [name]: checked,
      },
    }));
  };

  const botaoIncluir = (e) => {
    e.preventDefault();
    const periodoExists = periodosSalvos.some((item) => item.id === periodo.id);

    const periodoData = {
      numeroPeriodo: periodo.numeroPeriodo,
      semestreAno: periodo.semestreAno,
      dataInicio: periodo.dataInicio,
      dataFim: periodo.dataFim,
      turno: { ...periodo.turno },
      cursoRelacionado: periodo.cursoRelacionado,
      nomeCoordenador: periodo.nomeCoordenador,
    };

    if (periodoExists) {
      const updatedPeriodos = periodosSalvos.map((item) => {
        if (item.id === periodo.id) {
          return { ...periodoData, id: item.id };
        }
        return item;
      });
      localStorage.setItem("periodosData", JSON.stringify(updatedPeriodos));
      setPeriodosSalvos(updatedPeriodos);
    } else {
      const newPeriodos = [
        ...periodosSalvos,
        { ...periodoData, id: Date.now() },
      ];
      localStorage.setItem("periodosData", JSON.stringify(newPeriodos));
      setPeriodosSalvos(newPeriodos);
    }

    setPeriodo({
      numeroPeriodo: "",
      semestreAno: "",
      dataInicio: "",
      dataFim: "",
      turno: {
        matutino: false,
        vespertino: false,
        noturno: false,
      },
      cursoRelacionado: "",
      nomeCoordenador: "",
    });
  };

  const handleEdit = (index) => {
    const periodoSelecionado = periodosSalvos[index];
    setPeriodo({ ...periodoSelecionado });
  };

  const handleDelete = (index) => {
    const updatedPeriodos = [...periodosSalvos];
    updatedPeriodos.splice(index, 1);
    localStorage.setItem("periodosData", JSON.stringify(updatedPeriodos));
    setPeriodosSalvos(updatedPeriodos);
  };

  return (
    <>
      <div className="navBar">
        <Header />
      </div>
      <div className="containerForma">
        <h1>Cadastro de Período</h1>
        <Form onSubmit={botaoIncluir}>
          <Form.Group className="mb-3" controlId="formNumeroPeriodo">
            <Form.Label>Número do Período</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o número do período"
              name="numeroPeriodo"
              value={periodo.numeroPeriodo}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSemestreAno">
            <Form.Label>Semestre/Ano do Período</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o semestre/ano do período"
              name="semestreAno"
              value={periodo.semestreAno}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDataInicio">
            <Form.Label>Data de Início</Form.Label>
            <Form.Control
              type="date"
              name="dataInicio"
              value={periodo.dataInicio}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDataFim">
            <Form.Label>Data de Fim</Form.Label>
            <Form.Control
              type="date"
              name="dataFim"
              value={periodo.dataFim}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTurno">
            <Form.Label>Turno</Form.Label>
            <div>
              <Form.Check
                inline
                label="Matutino"
                type="checkbox"
                name="matutino"
                checked={periodo.turno.matutino}
                onChange={handleCheckboxChange}
              />
              <Form.Check
                inline
                label="Vespertino"
                type="checkbox"
                name="vespertino"
                checked={periodo.turno.vespertino}
                onChange={handleCheckboxChange}
              />
              <Form.Check
                inline
                label="Noturno"
                type="checkbox"
                name="noturno"
                checked={periodo.turno.noturno}
                onChange={handleCheckboxChange}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCursoRelacionado">
            <Form.Label>Curso Relacionado</Form.Label>
            <Form.Control
              as="select"
              name="cursoRelacionado"
              value={periodo.cursoRelacionado}
              onChange={handleChange}
            >
              <option value="">Selecione o curso relacionado</option>
              {cursosCadastrados.map((curso, index) => (
                <option key={index} value={index}>
                  {curso.nome}
                  {curso.nomeCoordenador}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Form>

        <h1>Lista de Períodos</h1>
        <ul className="crudForm">
          {periodosSalvos.map((periodoItem, index) => (
            <li className="listaForm" key={index}>
              {periodoItem.cursoRelacionado !== "" &&
              periodoItem.cursoRelacionado < cursosCadastrados.length ? (
                <>
                  <p>
                    Nome do Curso:{" "}
                    {cursosCadastrados[periodoItem.cursoRelacionado].nome}
                  </p>
                  <p>
                    Nome do Coordenador:{" "}
                    {
                      cursosCadastrados[periodoItem.cursoRelacionado]
                        .nomeCoordenador
                    }
                  </p>
                </>
              ) : (
                <>
                  <p>Curso não encontrado</p>
                  <p>Coordenador não encontrado</p>
                </>
              )}
              <p>Número do Período: {periodoItem.numeroPeriodo}</p>
              <p>Semestre/Ano: {periodoItem.semestreAno}</p>
              <p>Data ínicio: {periodoItem.dataInicio}</p>
              <p>Data fim: {periodoItem.dataFim}</p>
              <p>
                Turno: {periodoItem.turno.matutino ? "Matutino " : ""}
                {periodoItem.turno.vespertino ? "Vespertino " : ""}
                {periodoItem.turno.noturno ? "Noturno" : ""}
              </p>

              <div className="botoesListaForm">
                <Button variant="info" onClick={() => handleEdit(index)}>
                  Editar
                </Button>
                <Button
                  id="botaoExcluir"
                  variant="danger"
                  onClick={() => handleDelete(index)}
                >
                  Excluir
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CadastroPeriodo;

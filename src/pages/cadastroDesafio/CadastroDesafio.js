import React, { useState, useEffect } from "react";
import Header from "../../component/header/Header";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CadastroDesafio() {
    const [desafio, setDesafio] = useState({
        nomeDesafio: '',
        periodo: '',
        professor: '',
        dataInicio: '',
        dataFim: '',
        diaSemana: '',
        horario: '',
        sala: ''
    });


    const [desafiosCadastrados, setDesafiosCadastrados] = useState([]);
    const [periodos, setPeriodos] = useState([]);
       const [professores, setProfessores] = useState([]);
    const [salas, setSalas] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedProfessores = JSON.parse(localStorage.getItem('professoresData')) || [];
  

        const storedDesafios = JSON.parse(localStorage.getItem('desafiosData')) || [];
        setDesafiosCadastrados(storedDesafios);

        const storedPeriodos = JSON.parse(localStorage.getItem('periodosData')) || [];
        const storedSalas = JSON.parse(localStorage.getItem('salasData')) || [];

        setPeriodos(storedPeriodos);
        setProfessores(storedProfessores);
        setSalas(storedSalas);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDesafio(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editIndex !== null) {
            const updatedDesafios = [...desafiosCadastrados];
            updatedDesafios[editIndex] = desafio;
            localStorage.setItem('desafiosData', JSON.stringify(updatedDesafios));
            setDesafiosCadastrados(updatedDesafios);
            setEditIndex(null);
        } else {
            const novosDesafios = [...desafiosCadastrados, desafio];
            localStorage.setItem('desafiosData', JSON.stringify(novosDesafios));
            setDesafiosCadastrados(novosDesafios);
            localStorage.setItem('desafiosData', JSON.stringify(novosDesafios));
            setDesafiosCadastrados(novosDesafios);
        
        }

        setDesafio({
            nomeDesafio: '',
            periodo: '',
            professor: '',
            dataInicio: '',
            dataFim: '',
            diaSemana: '',
            dataAula: '',
            horario: '',
            sala: ''
        });
    };

    const handleEdit = (index) => {
        const desafioSelecionado = desafiosCadastrados[index];
        setDesafio(desafioSelecionado);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedDesafios = desafiosCadastrados.filter((_, i) => i !== index);
        localStorage.setItem('desafiosData', JSON.stringify(updatedDesafios));
        setDesafiosCadastrados(updatedDesafios);
        setEditIndex(null);
    };



    const getPeriodoInfo = (periodoId) => {
        const periodo = periodos.find((p) => p.id === parseInt(periodoId));
        return periodo ? `${periodo.numeroPeriodo} - ${periodo.semestreAno}` : 'Não encontrado';
    };




    const getSalaInfo = (salaId) => {
        const sala = salas.find((s) => s.id === parseInt(salaId));
        return sala ? `${sala.predio} - ${sala.numero}` : 'Não encontrada';
    };

    const getProfessorNome = (professorId) => {
        const professor = professores.find((p) => p.id === parseInt(professorId));
        return professor ? professor.nome : 'Não encontrado';
    };


    return (
        <>
            <Header />
            <div className="containerForma">
                <h1>Cadastro de Desafio</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNomeDesafio">
                        <Form.Label>Nome do Desafio</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome do desafio"
                            name="nomeDesafio"
                            value={desafio.nomeDesafio}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPeriodo">
                        <Form.Label>Período</Form.Label>
                        <Form.Control
                            as="select"
                            name="periodo"
                            value={desafio.periodo}
                            onChange={handleChange}
                        >
                            <option value="">Selecione o período</option>
                            {periodos.map((periodo, index) => (
                                <option key={index} value={periodo.id}>
                                    {periodo.numeroPeriodo} - {periodo.semestreAno}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formProfessor">
                    <Form.Label>Professor</Form.Label>
                    <Form.Control
                        as="select"
                        name="professor"
                        value={desafio.professor}
                        onChange={handleChange}
                    >
                        <option value="">Selecione o professor</option>
                        {professores.map((professor) => (
                            <option key={professor.id} value={professor.id}>
                                {professor.nome}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                    <Form.Group controlId="formDataInicio">
                        <Form.Label>Data de Início</Form.Label>
                        <Form.Control
                            type="date"
                            name="dataInicio"
                            value={desafio.dataInicio}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDataFim">
                        <Form.Label>Data de Fim</Form.Label>
                        <Form.Control
                            type="date"
                            name="dataFim"
                            value={desafio.dataFim}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDiaSemana">
                        <Form.Label>Dia da Semana</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o dia da semana"
                            name="diaSemana"
                            value={desafio.diaSemana}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formHorario">
                        <Form.Label>Horário</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o horário"
                            name="horario"
                            value={desafio.horario}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formSala">
                        <Form.Label>Sala</Form.Label>
                        <Form.Control
                            as="select"
                            name="sala"
                            value={desafio.sala}
                            onChange={handleChange}
                        >
                            <option value="">Selecione a sala</option>
                            {salas.map((sala, index) => (
                                <option key={index} value={sala.id}>
                                    {/* Exiba as informações da sala no dropdown */}
                                    {sala.predio} - {sala.numero}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formDataAula">
            <Form.Label>Data da Aula</Form.Label>
            <Form.Control
              type="date"
              name="dataAula"
              value={desafio.dataAula}
              onChange={handleChange}
            />
          </Form.Group>

                    <h1>Lista de Desafios Cadastrados</h1>


                    <ul>
                        {desafiosCadastrados.map((desafioItem, index) => (
                            <li key={index}>
                                <p>Nome do Desafio: {desafioItem.nomeDesafio}</p>
                                <p>Período: {getPeriodoInfo(desafioItem.periodo)}</p>
                                <p>Professor: {getProfessorNome(desafioItem.professor)}</p>
                                <p>Data de Início: {desafioItem.dataInicio}</p>
                                <p>Data de Fim: {desafioItem.dataFim}</p>
                                <p>Dia da Semana: {desafioItem.diaSemana}</p>
                                <p>Data da Aula: {desafioItem.dataAula}</p>
                                <p>Horário: {desafioItem.horario}</p>
                                <p>Sala: {getSalaInfo(desafioItem.sala)}</p>
                                <Button variant="info" onClick={() => handleEdit(index)}>
                                    Editar
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(index)}>
                                    Excluir
                                </Button>
                            </li>
                        ))}
                    </ul>

                    <Button variant="primary" type="submit">
                        {editIndex !== null ? 'Atualizar' : 'Salvar'}
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default CadastroDesafio;

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
        const storedDesafios = JSON.parse(localStorage.getItem('desafiosData')) || [];
        setDesafiosCadastrados(storedDesafios);

        const storedPeriodos = JSON.parse(localStorage.getItem('periodosData')) || [];
        const storedProfessores = JSON.parse(localStorage.getItem('professoresData')) || [];
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
        }

        setDesafio({
            nomeDesafio: '',
            periodo: '',
            professor: '',
            dataInicio: '',
            dataFim: '',
            diaSemana: '',
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
                                    {/* Exiba as informações do período no dropdown */}
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
                            {professores.map((professor, index) => (
                                <option key={index} value={professor.id}>
                                    {/* Exiba as informações do professor no dropdown */}
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

                    <h1>Lista de Desafios Cadastrados</h1>

                    <Button variant="primary" type="submit">
                        {editIndex !== null ? 'Atualizar' : 'Salvar'}
                    </Button>
                </Form>

                {/* Lista de desafios cadastrados */}
                <ul>
                    {desafiosCadastrados.map((desafioItem, index) => (
                        <li key={index}>
                            {desafioItem.nomeDesafio}
                            <Button variant="info" onClick={() => handleSubmit(index)}>
                                Salvar
                            </Button>
                            <Button variant="info" onClick={() => handleEdit(index)}>
                                Editar
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(index)}>
                                Excluir
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default CadastroDesafio;

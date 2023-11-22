import React, { useState, useEffect } from "react";
import Header from "../../component/header/Header";
import '../../assets/css/cadastroCurso.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CadastroDesafio() {
    const [desafio, setDesafio] = useState({
        nome: '',
        periodos: [],
        professor: '',
        dataInicio: '',
        dataFim: '',
        diaSemana: '',
        horario: '',
        sala: ''
    });

    const [desafiosCadastrados, setDesafiosCadastrados] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [salas, setSalas] = useState([]);
    const [periodos, setPeriodos] = useState([]);

    useEffect(() => {
        const storedDesafios = localStorage.getItem('desafiosData');
        if (storedDesafios) {
            setDesafiosCadastrados(JSON.parse(storedDesafios));
        }

        // Simulação de dados de professores, salas e períodos vindo de alguma fonte de dados
        const storedProfessores = localStorage.getItem('professoresData');
        if (storedProfessores) {
            setProfessores(JSON.parse(storedProfessores));
        }

        const storedSalas = localStorage.getItem('salasData');
        if (storedSalas) {
            setSalas(JSON.parse(storedSalas));
        }

        const storedPeriodos = localStorage.getItem('periodosData');
        if (storedPeriodos) {
            setPeriodos(JSON.parse(storedPeriodos));
        }
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
        const novosDesafios = [...desafiosCadastrados, desafio];
        localStorage.setItem('desafiosData', JSON.stringify(novosDesafios));
        setDesafiosCadastrados(novosDesafios);
        setDesafio({
            nome: '',
            periodos: [],
            professor: '',
            dataInicio: '',
            dataFim: '',
            diaSemana: '',
            horario: '',
            sala: ''
        });
    };

    return (
        <>
            <div className="navBar">
                <Header />
            </div>
            <div className="containerForma">
                <h1>Cadastro de Desafio</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formNomeDesafio">
                        <Form.Label>Nome do Desafio</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Digite o nome do desafio" 
                            name="nome"
                            value={desafio.nome}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Aqui você pode adicionar seletores para os outros campos como períodos, professor, datas, sala, etc. */}

                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </Form>

                <h1>Lista de Desafios</h1>
                <ul>
                    {desafiosCadastrados.map((desafioItem, index) => (
                        <li className="botoesListaForm" key={index}>
                            <p>{desafioItem.nome}</p>
                            <Button variant="info">
                                Editar
                            </Button>
                            <Button id="botaoexcluir" variant="danger">
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

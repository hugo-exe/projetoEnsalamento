import React, { useState, useEffect } from "react";
import Header from "../../component/header/Header";
import '../../assets/css/cadastroCurso.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CadastroSalas() {
    const [sala, setSala] = useState({
        id: null,
        predio: '',
        numero: '',
        numeroCadeiras: '',
        professor: ''
    });

    const [salasCadastradas, setSalasCadastradas] = useState([]);
    const [professoresCadastrados, setProfessoresCadastrados] = useState([]);


    useEffect(() => {
        const storedSalas = localStorage.getItem('salasData');
        const storedProfessores = localStorage.getItem('professoresData');

        if (storedSalas) {
            setSalasCadastradas(JSON.parse(storedSalas));
        }

        if (storedProfessores) {
            setProfessoresCadastrados(JSON.parse(storedProfessores));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { professor, horario } = sala;

        const salaExistente = salasCadastradas.find(
            item => item.horario === horario
        );

        if (salaExistente && salaExistente.professor !== professor) {
            console.log('Já existe uma sala cadastrada para este horário.');
            console.log('Outro professor já cadastrou uma sala neste horário.');
            return;
        }

        const novaSala = { ...sala };

        let salasAtualizadas = [];

        if (sala.id !== null) {
            salasAtualizadas = salasCadastradas.map((item) =>
                item.id === sala.id ? novaSala : item
            );
        } else {
            novaSala.id = new Date().getTime();
            salasAtualizadas = [...salasCadastradas, novaSala];
        }

        localStorage.setItem('salasData', JSON.stringify(salasAtualizadas));
        setSalasCadastradas(salasAtualizadas);

        setSala({
            id: null,
            predio: '',
            numero: '',
            numeroCadeiras: '',
            professor: ''
        });
    };

    const handleEdit = (id) => {
        const salaSelecionada = salasCadastradas.find((sala) => sala.id === id);
        setSala(salaSelecionada);
    };

    const handleDelete = (id) => {
        const novasSalas = salasCadastradas.filter((sala) => sala.id !== id);
        localStorage.setItem('salasData', JSON.stringify(novasSalas));
        setSalasCadastradas(novasSalas);
    };

    const renderSalaInfo = (sala) => {
        return (
            <div key={sala.id}>
                <p>Prédio: {sala.predio}</p>
                <p>Número: {sala.numero}</p>
                <p>Número de Cadeiras: {sala.numeroCadeiras}</p>
                <p>Professor: {sala.professor}</p>
                <Button variant="info" onClick={() => handleEdit(sala.id)}>
                    Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(sala.id)}>
                    Excluir
                </Button>
            </div>
        );
    };

    return (
        <>
            <div className="navBar">
                <Header />
            </div>
            <div className="containerForma">
                <h1>Cadastro de Sala</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formPredio">
                        <Form.Label>Prédio</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o prédio"
                            value={sala.predio}
                            onChange={(e) => setSala({ ...sala, predio: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNumeroSala">
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o número da sala"
                            value={sala.numero}
                            onChange={(e) => setSala({ ...sala, numero: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNumeroCadeiras">
                        <Form.Label>Número de Cadeiras</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o número de cadeiras"
                            value={sala.numeroCadeiras}
                            onChange={(e) => setSala({ ...sala, numeroCadeiras: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formProfessor">
                        <Form.Label>Professor</Form.Label>
                        <Form.Control
                            as="select"
                            value={sala.professor}
                            onChange={(e) => setSala({ ...sala, professor: e.target.value })}
                        >
                            <option value="">Selecione um professor</option>
                            {professoresCadastrados.map((professor, index) => (
                                <option key={index} value={professor.nome}>
                                    {professor.nome}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </Form>

                <div className="sala-lista">
                    <h2>Lista de Salas</h2>
                    <ul>
                        {salasCadastradas.map((sala) => renderSalaInfo(sala))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default CadastroSalas;

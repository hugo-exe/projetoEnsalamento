import React, { useState, useEffect } from "react";
import Header from "../../component/header/Header";
import '../../assets/css/cadastroCurso.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CadastroSalas() {
    const [sala, setSala] = useState({
        andar: '',
        numero: '',
        predio: '',
        numeroCadeiras: ''
    });

    const [salasCadastradas, setSalasCadastradas] = useState([]);

    useEffect(() => {
        const storedSalas = localStorage.getItem('salasData');
        if (storedSalas) {
            setSalasCadastradas(JSON.parse(storedSalas));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSala(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const novasSalas = [...salasCadastradas, sala];
        localStorage.setItem('salasData', JSON.stringify(novasSalas));
        setSalasCadastradas(novasSalas);
        setSala({
            andar: '',
            numero: '',
            predio: '',
            numeroCadeiras: ''
        });
    };

    const handleEdit = (index) => {
        const salaSelecionada = salasCadastradas[index];
        setSala(salaSelecionada);
    };

    const handleDelete = (index) => {
        const novasSalas = salasCadastradas.filter((_, i) => i !== index);
        localStorage.setItem('salasData', JSON.stringify(novasSalas));
        setSalasCadastradas(novasSalas);
    };

    return (
        <>
            <div className="navBar">
                <Header />
            </div>
            <div className="containerForma">
                <h1>Cadastro de Sala</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formAndar">
                        <Form.Label>Andar</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Digite o andar" 
                            name="andar"
                            value={sala.andar}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNumeroSala">
                        <Form.Label>Número</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Digite o número da sala" 
                            name="numero"
                            value={sala.numero}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPredio">
                        <Form.Label>Prédio</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Digite o prédio" 
                            name="predio"
                            value={sala.predio}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNumeroCadeiras">
                        <Form.Label>Número de Cadeiras</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Digite o número de cadeiras" 
                            name="numeroCadeiras"
                            value={sala.numeroCadeiras}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </Form>

                <h1>Lista de Salas</h1>
                <ul>
                    {salasCadastradas.map((salaItem, index) => (
                        <li className="botoesListaForm" key={index}>
                            <p>{salaItem.predio} - {salaItem.numero}</p>
                            <Button variant="info" onClick={() => handleEdit(index)}>
                                Editar
                            </Button>
                            <Button id="botaoexcluir" variant="danger" onClick={() => handleDelete(index)}>
                                Excluir
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default CadastroSalas;

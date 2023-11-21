import React, { useState, useEffect } from "react";
import Header from "../../component/header/Header";
import '../../assets/css/cadastroCurso.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CadastroCurso() {
    const [curso, setCurso] = useState({
        nome: '',
        nomeCoordenador: '',
        descricao: '',
        duracao: ''
    });

    const [cursosCadastrados, setCursosCadastrados] = useState([]);

    useEffect(() => {
        const storedCursos = localStorage.getItem('cursosData');
        if (storedCursos) {
            setCursosCadastrados(JSON.parse(storedCursos));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurso(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const novosCursos = [...cursosCadastrados, curso];
        localStorage.setItem('cursosData', JSON.stringify(novosCursos));
        setCursosCadastrados(novosCursos);
        setCurso({
            nome: '',
            nomeCoordenador: '',
            descricao: '',
            duracao: ''
        });
    };

    const handleEdit = (index) => {
        const cursoSelecionado = cursosCadastrados[index];
        setCurso(cursoSelecionado);
    };

    const handleDelete = (index) => {
        const novosCursos = cursosCadastrados.filter((_, i) => i !== index);
        localStorage.setItem('cursosData', JSON.stringify(novosCursos));
        setCursosCadastrados(novosCursos);
    };

    return (
        <>
            <div className="navBar">
                <Header />
            </div>
            <div className="containerForma">
                <h1>Cadastro de Curso</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formNome">
                        <Form.Label>Nome do Curso</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Digite o nome do curso" 
                            name="nome"
                            value={curso.nome}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCoordenador">
                        <Form.Label>Nome do Coordenador</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Digite o nome do coordernador" 
                            name="nomeCoordenador"
                            value={curso.nomeCoordenador}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescricao">
                        <Form.Label>Descrição do Curso</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Digite a descrição do curso" 
                            name="descricao"
                            value={curso.descricao}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDuracao">
                        <Form.Label>Duração do Curso</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Digite a duração do curso" 
                            name="duracao"
                            value={curso.duracao}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </Form>

                <h1>Lista de Cursos</h1>
                <ul>
                    {cursosCadastrados.map((cursoItem, index) => (
                        <li className="botoesListaForm" key={index}>
                            <p>{cursoItem.nome}</p>
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

export default CadastroCurso;

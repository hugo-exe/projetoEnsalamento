import React, { useState, useEffect } from "react";
import Header from "../../component/header/Header";
import '../../assets/css/cadastroCurso.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CadastroProfessor() {
    const [professor, setProfessor] = useState({
        nome: '',
        matricula: '',
        telefone: ''
    });

    const [professoresCadastrados, setProfessoresCadastrados] = useState([]);

    useEffect(() => {
        const storedProfessores = localStorage.getItem('professoresData');
        if (storedProfessores) {
            setProfessoresCadastrados(JSON.parse(storedProfessores));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfessor(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const novoProfessor = { ...professor }; // Crie uma cópia do objeto professor
    
        // Adicione um ID único ao novo professor (por exemplo, usando a data atual como ID)
        novoProfessor.id = Date.now();
    
        const novosProfessores = [...professoresCadastrados, novoProfessor]; // Adicione o novo professor ao array existente
        localStorage.setItem('professoresData', JSON.stringify(novosProfessores)); // Atualize os dados no localStorage
        setProfessoresCadastrados(novosProfessores); // Atualize o estado com os novos dados
        setProfessor({ // Limpe o estado do formulário após a submissão
            nome: '',
            matricula: '',
            telefone: ''
        });
    };

    const handleEdit = (index) => {
        const professorSelecionado = professoresCadastrados[index];
        setProfessor(professorSelecionado);
    };

    const handleDelete = (index) => {
        const novosProfessores = professoresCadastrados.filter((_, i) => i !== index);
        localStorage.setItem('professoresData', JSON.stringify(novosProfessores));
        setProfessoresCadastrados(novosProfessores);
    };

    return (
        <>
            <div className="navBar">
                <Header />
            </div>
            <div className="containerForma">
                <h1>Cadastro de Professor</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formNomeProfessor">
                        <Form.Label>Nome do Professor</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Digite o nome do professor" 
                            name="nome"
                            value={professor.nome}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMatricula">
                        <Form.Label>Matrícula</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Digite a matrícula" 
                            name="matricula"
                            value={professor.matricula}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTelefone">
                        <Form.Label>Telefone Celular</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Digite o telefone celular" 
                            name="telefone"
                            value={professor.telefone}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </Form>

                <h1>Lista de Professores</h1>
                <ul>
                    {professoresCadastrados.map((professorItem, index) => (
                        <li className="botoesListaForm" key={index}>
                            <p>{professorItem.nome}</p>
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

export default CadastroProfessor;

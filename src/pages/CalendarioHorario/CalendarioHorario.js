import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ConsultaDesafio() {
  const [desafiosCadastrados, setDesafiosCadastrados] = useState([]);
  const [selectedDesafio, setSelectedDesafio] = useState('');
  const [professor, setProfessor] = useState('');
  const [sala, setSala] = useState('');
  const [horario, setHorario] = useState('');

  useEffect(() => {
    // Recupere os dados de desafios cadastrados anteriormente do armazenamento local (localStorage, banco de dados, etc.)
    const storedDesafios = JSON.parse(localStorage.getItem('desafiosData')) || [];
    setDesafiosCadastrados(storedDesafios);
  }, []);

  const handleDesafioChange = (e) => {
    const selectedDesafioId = e.target.value;
    setSelectedDesafio(selectedDesafioId);

    // Encontrar o desafio selecionado na lista de desafios cadastrados
    const desafioSelecionado = desafiosCadastrados.find(desafio => desafio.id === selectedDesafioId);

    if (desafioSelecionado) {
      setProfessor(desafioSelecionado.professor);
      setSala(desafioSelecionado.nome); // Adapte de acordo com a estrutura dos seus dados
      setHorario(desafioSelecionado.horario);
    } else {
      setProfessor('');
      setSala('');
      setHorario('');
    }
  };

  return (
    <Container>
      <h1>Consulta de Desafio</h1>
      <Form>
        <Form.Group as={Row} controlId="formDesafio">
          <Form.Label column sm="2">Selecionar Desafio:</Form.Label>
          <Col sm="4">
            <Form.Control as="select" value={selectedDesafio} onChange={handleDesafioChange}>
              <option value="">Selecione o Desafio</option>
              {desafiosCadastrados.map((desafio, index) => (
                <option key={index} value={desafio.id}>
                  {desafio.nomeDesafio}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>

      <h3>Dados do Desafio Selecionado:</h3>
      <Row>
        <Col sm="3">
          <strong>Professor:</strong>
        </Col>
        <Col sm="9">
          {professor}
        </Col>
      </Row>
      <Row>
        <Col sm="3">
          <strong>Sala:</strong>
        </Col>
        <Col sm="9">
          {sala}
        </Col>
      </Row>
      <Row>
        <Col sm="3">
          <strong>Horário:</strong>
        </Col>
        <Col sm="9">
          {horario}
        </Col>
      </Row>
    </Container>
  );
}

export default ConsultaDesafio;

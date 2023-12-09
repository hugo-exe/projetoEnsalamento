import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Ensalamento</Navbar.Brand>
          <Nav className="me-auto">
            <Link to='/CadastroCurso'>
            <Nav.Link href="#CadastroCurso">Cadastro de Curso</Nav.Link>
            </Link>
            <Link to='/CadastroDesafio'>
            <Nav.Link href="#CadastroDesafio">Cadastro de Desafio</Nav.Link>
            </Link>
            <Link to='/CadastroPeriodo'>
            <Nav.Link href="#CadastroPeriodo">Cadastro de Período</Nav.Link>
            </Link>
            <Link to='/CadastroProfessores'>
            <Nav.Link href="#CadastroProfessores">Cadastro de Professores</Nav.Link>
            </Link>
            <Link to='/CadastroSala'>
            <Nav.Link href="#CadastroSalas">Cadastro de Salas</Nav.Link>
            </Link>
            <Link to='/'>
            <Nav.Link href="#CadastroHorario">Cadastro de Horário</Nav.Link>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
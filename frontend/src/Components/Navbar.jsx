import React from 'react';
//import { Navbar, Container } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavbarContainer = () => {
    return (
      <>   
      <Navbar expand="sm" bg="light" className="bg-body-tertiary" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#">Slack Chat</Navbar.Brand>
        </Container>
      </Navbar>
      </>
    );
  }
  
  export default NavbarContainer;
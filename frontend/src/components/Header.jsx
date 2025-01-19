import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import './Header.css';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
            <Container>
                <Navbar.Brand href="/">My Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/categories">Categories</Nav.Link>
                        <Nav.Link href="/checkout">
                            Cart <Badge bg="secondary">0</Badge>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;

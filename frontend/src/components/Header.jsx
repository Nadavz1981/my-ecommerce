import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './Header.css';
import { Link } from 'react-router-dom';


const Header = () => {
    // שליפת מספר הפריטים מסל הקניות
    const cartItemsCount = useSelector((state) =>
        state.cart.items.reduce((total, item) => total + 1, 0)
    );

    return (
        <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
            <Container>
                <Navbar.Brand href="/">My Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/categories">Categories</Nav.Link>
                        <Nav.Link as={Link} to="/checkout">
                            Cart <Badge bg="secondary">{cartItemsCount}</Badge>
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;

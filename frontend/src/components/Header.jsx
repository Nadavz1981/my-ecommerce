import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {
    const wishlistCount = useSelector((state) => state.wishlist.items.length);
    const cartCount = useSelector((state) =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">My Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* Wishlist */}
                        <Nav.Link as={Link} to="/wishlist" className="position-relative">
                            Wishlist ❤️
                            {wishlistCount > 0 && (
                                <Badge
                                    bg="danger"
                                    pill
                                    className="position-absolute top-0 start-100 translate-middle"
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    {wishlistCount}
                                </Badge>
                            )}
                        </Nav.Link>

                        {/* Cart */}
                        <Nav.Link as={Link} to="/checkout" className="position-relative">
                            Cart 🛒
                            {cartCount > 0 && (
                                <Badge
                                    bg="warning"
                                    pill
                                    className="position-absolute top-0 start-100 translate-middle"
                                    style={{ fontSize: '0.8rem', color: 'black' }}
                                >
                                    {cartCount}
                                </Badge>
                            )}
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;

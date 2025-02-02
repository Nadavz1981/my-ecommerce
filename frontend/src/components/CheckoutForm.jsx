import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CheckoutForm = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        phone: '',
        notes: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Order Submitted:', formData, cartItems);
        alert('Your order has been placed successfully!');
        setFormData({ fullName: '', email: '', address: '', phone: '', notes: '' });
    };

    return (
        <Container>
            <h1 className="my-4 text-center">Checkout</h1>
            <Row>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Additional Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="notes"
                                rows={3}
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="success" type="submit" className="w-100">
                            Place Order
                        </Button>
                    </Form>
                </Col>

                {/* סיכום הסל */}
                <Col md={6}>
                    <h4>Order Summary</h4>
                    <ListGroup>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{item.title}</strong> x{item.quantity}
                                </div>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <h4 className="mt-3">Total: ${totalPrice.toFixed(2)}</h4>
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutForm;

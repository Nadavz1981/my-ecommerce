import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../redux/cartSlice';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const removeItemFromCart = (id) => {
        dispatch(removeItem({ id }));
    };

    return (
        <Container>
            <h1 className="my-4 text-center">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <>
                    <ListGroup>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{item.title}</h5>
                                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <Button
                                    variant="danger"
                                    onClick={() => removeItemFromCart(item.id)}
                                >
                                    Remove
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    {/* סה"כ מחיר */}
                    <div className="text-center mt-4">
                        <h4>Total: ${totalPrice.toFixed(2)}</h4>
                        <Button as={Link} to="/checkout-form" variant="success" size="lg" className="mt-3">
                            Proceed to Checkout
                        </Button>

                    </div>
                </>
            )}
        </Container>
    );
};

export default Checkout;

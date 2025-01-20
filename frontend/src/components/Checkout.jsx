import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';
import { Container, Button, ListGroup, Image } from 'react-bootstrap';

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const removeItemFromCart = (id) => {
        dispatch(removeItem({ id }));
    };

    const increaseItemQuantity = (id) => {
        dispatch(increaseQuantity({ id }));
    };

    const decreaseItemQuantity = (id) => {
        dispatch(decreaseQuantity({ id }));
    };

    return (
        <Container>
            <h1 className="my-4 text-center">Checkout</h1>
            {cartItems.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <>
                    <ListGroup>
                        {cartItems.map((item) => (
                            <ListGroup.Item
                                key={item.id}
                                className="d-flex justify-content-between align-items-center"
                            >
                                <div className="d-flex align-items-center">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        rounded
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            marginRight: '15px',
                                        }}
                                    />
                                    <div>
                                        <h5 className="mb-0">{item.title}</h5>
                                        <p className="mb-0 text-muted">
                                            ${item.price} x {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => increaseItemQuantity(item.id)}
                                    >
                                        +
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => decreaseItemQuantity(item.id)}
                                        className="mx-2"
                                    >
                                        -
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeItemFromCart(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <div className="text-center mt-4">
                        <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
                    </div>
                </>
            )}
        </Container>
    );
};

export default Checkout;

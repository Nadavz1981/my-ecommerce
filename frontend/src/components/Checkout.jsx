import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../redux/cartSlice';
import { Container, Button, ListGroup, Image } from 'react-bootstrap';

const Checkout = () => {
    // שליפת הפריטים מהסל באמצעות Redux
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    // חישוב המחיר הכולל של המוצרים בסל
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    // פונקציה להסרת פריט מהסל
    const removeItemFromCart = (id) => {
        dispatch(removeItem({ id }));
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
                                        src={item.image || 'https://via.placeholder.com/50'}
                                        alt={item.title}
                                        rounded
                                        style={{ width: '50px', height: '50px', marginRight: '15px' }}
                                    />
                                    <div>
                                        <h5 className="mb-0">{item.title}</h5>
                                        <p className="mb-0 text-muted">${item.price}</p>
                                    </div>
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
                    <div className="text-center mt-4">
                        <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
                    </div>
                </>
            )}
        </Container>
    );
};

export default Checkout;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistSlice';
import { addItem } from '../redux/cartSlice';
import { Container, ListGroup, Button, Image } from 'react-bootstrap';

const Wishlist = () => {
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();

    const moveToCart = (item) => {
        dispatch(addItem(item)); // הוסף לסל
        dispatch(removeFromWishlist({ id: item.id })); // הסר מ-Wishlist
    };

    return (
        <Container>
            <h1 className="my-4 text-center">Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <p className="text-center">Your wishlist is empty.</p>
            ) : (
                <ListGroup>
                    {wishlistItems.map((item) => (
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
                                    <p className="mb-0 text-muted">${item.price}</p>
                                </div>
                            </div>
                            <div>
                                <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => moveToCart(item)}
                                >
                                    Move to Cart
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() =>
                                        dispatch(removeFromWishlist({ id: item.id }))
                                    }
                                    className="ms-2"
                                >
                                    Remove
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
};

export default Wishlist;

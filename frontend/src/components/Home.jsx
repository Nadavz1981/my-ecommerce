import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchProducts } from '../api';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };

        getProducts();
    }, []);

    const addItemToCart = (product) => {
        dispatch(
            addItem({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image, // הוסף את שדה התמונה
            })
        );
    };



    return (
        <Container>
            <h1 className="my-4 text-center">Welcome to Our Store</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} md={4} className="mb-4">
                        <Card className="h-100">
                            <Card.Img
                                variant="top"
                                src={product.image}
                                alt={product.title}
                                className="product-image"
                            />
                            <Card.Body>
                                <Card.Title
                                    className="text-truncate"
                                    title={product.title}
                                >
                                    {product.title}
                                </Card.Title>
                                <Card.Text>${product.price}</Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={() => addItemToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;

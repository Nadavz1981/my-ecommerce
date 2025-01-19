import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchProducts } from '../api';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };

        getProducts();
    }, []);

    return (
        <Container>
            <h1 className="my-4 text-center stylish-title">Welcome to Our Store</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} md={4} className="mb-4">
                        <Card className="h-100 stylish-card shadow-lg">
                            <Card.Img
                                variant="top"
                                src={product.image}
                                alt={product.title}
                                className="product-image"
                            />

                            <Card.Body>
                                <Card.Title className="text-truncate stylish-title" title={product.title}>
                                    {product.title}
                                </Card.Title>
                                <Card.Text className="text-muted">${product.price}</Card.Text>
                                <Button variant="success" className="w-100">
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

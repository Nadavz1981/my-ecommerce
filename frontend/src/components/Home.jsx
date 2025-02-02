import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchProducts } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';
import { motion } from 'framer-motion';
import CategoryFilter from './CategoryFilter';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);

            // יצירת רשימת קטגוריות ייחודיות
            const uniqueCategories = [...new Set(data.map((product) => product.category))];
            setCategories(uniqueCategories);
        };

        getProducts();
    }, []);

    const toggleWishlist = (product) => {
        const isInWishlist = wishlistItems.some((item) => item.id === product.id);
        if (isInWishlist) {
            dispatch(removeFromWishlist({ id: product.id }));
        } else {
            dispatch(
                addToWishlist({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    category: product.category, // שמירה של הקטגוריה
                })
            );
        }
    };

    // סינון מוצרים לפי הקטגוריה שנבחרה
    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products;

    return (
        <Container>
            <h1 className="my-4 text-center">Welcome to Our Store</h1>

            {/* קומפוננטת הסינון */}
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <Row>
                {filteredProducts.map((product) => {
                    const isInWishlist = wishlistItems.some((item) => item.id === product.id);
                    return (
                        <Col key={product.id} md={4} className="mb-4">
                            <Card className="h-100">
                                <Card.Img
                                    variant="top"
                                    src={product.image}
                                    alt={product.title}
                                    className="product-image"
                                />
                                <Card.Body>
                                    <Card.Title className="text-truncate" title={product.title}>
                                        {product.title}
                                    </Card.Title>
                                    <Card.Text>${product.price}</Card.Text>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Button
                                            variant="primary"
                                            onClick={() => dispatch(addItem(product))}
                                        >
                                            Add to Cart
                                        </Button>

                                        {/* כפתור Wishlist עם אנימציה */}
                                        <motion.button
                                            onClick={() => toggleWishlist(product)}
                                            initial={{ scale: 1 }}
                                            animate={{ scale: isInWishlist ? [1, 1.4, 1] : 1 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                fontSize: '1.8rem',
                                                border: 'none',
                                                background: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {isInWishlist ? '❤️' : '🤍'}
                                        </motion.button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default Home;

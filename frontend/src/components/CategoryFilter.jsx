import React from 'react';
import { Form } from 'react-bootstrap';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <Form.Select
            aria-label="Filter by category"
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value)}
            className="mb-4"
        >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
                <option key={index} value={category}>
                    {category}
                </option>
            ))}
        </Form.Select>
    );
};

export default CategoryFilter;

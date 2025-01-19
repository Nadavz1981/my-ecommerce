import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from './redux/cartSlice';

const App = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);

    const addItemToCart = () => {
        dispatch(addItem({ id: 1, name: 'Test Product' }));
    };

    const removeItemFromCart = () => {
        dispatch(removeItem({ id: 1 }));
    };

    return (
        <div className="container">
            <h1>Redux Test</h1>
            <button onClick={addItemToCart} className="btn btn-primary">
                Add Item
            </button>
            <button onClick={removeItemFromCart} className="btn btn-danger">
                Remove Item
            </button>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;

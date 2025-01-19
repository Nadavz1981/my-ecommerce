import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
    }, // נכניס Reducers בהמשך
});

export default store;

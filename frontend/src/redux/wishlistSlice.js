import { createSlice } from '@reduxjs/toolkit';

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('wishlist', serializedState);
    } catch (error) {
        console.error('Could not save wishlist to Local Storage:', error);
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('wishlist');
        if (serializedState === null) return [];
        const parsedState = JSON.parse(serializedState);
        return Array.isArray(parsedState) ? parsedState : [];
    } catch (error) {
        console.error('Could not load wishlist from Local Storage:', error);
        return [];
    }
};

const initialState = {
    items: loadFromLocalStorage(),
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (!existingItem) {
                state.items.push(action.payload);
                saveToLocalStorage(state.items);
            }
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
            );
            saveToLocalStorage(state.items);
        },
        clearWishlist: (state) => {
            state.items = [];
            saveToLocalStorage(state.items);
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

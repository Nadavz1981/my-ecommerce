import { createSlice } from '@reduxjs/toolkit';

// פונקציה לשמירת המצב ל-Local Storage
const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (error) {
        console.error('Could not save state to Local Storage:', error);
    }
};

// פונקציה לטעינת המצב מ-Local Storage
const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) return []; // אם אין נתונים, החזר מערך ריק
        const parsedState = JSON.parse(serializedState);
        return Array.isArray(parsedState) ? parsedState : []; // ודא שהנתונים הם מערך
    } catch (error) {
        console.error('Could not load state from Local Storage:', error);
        return [];
    }
};

// מצב ראשוני של Redux
const initialState = {
    items: loadFromLocalStorage(),
};

// יצירת ה-Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // פעולה להוספת פריט לסל
        addItem: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            saveToLocalStorage(state.items); // שמירה ל-Local Storage
        },
        // פעולה להסרת פריט מהסל
        removeItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
            );
            saveToLocalStorage(state.items); // שמירה ל-Local Storage
        },
        // פעולה להגדלת כמות
        increaseQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            }
            saveToLocalStorage(state.items); // שמירה ל-Local Storage
        },
        // פעולה להקטנת כמות
        decreaseQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            saveToLocalStorage(state.items); // שמירה ל-Local Storage
        },
    },
});

// ייצוא הפעולות והרידוסר
export const { addItem, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;

import { ADD_BOOK, REMOVE_BOOK, INCREMENT_BOOK_QUANTITY, DECREMENT_BOOK_QUANTITY } from "../constants/shoppingCartActionTypes";

// Initial state
const initialState = {
    shoppingCart: []
};

// Reducer function
const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOK:
            const existingBookIndex = state.shoppingCart.findIndex(book => book.id === action.payload.id);
            if (existingBookIndex !== -1) {
                const updatedCart = state.shoppingCart.map((book, index) => {
                    if (index === existingBookIndex) {
                        return { ...book, quantity: book.quantity + 1 };
                    }
                    return book;
                });
                return { ...state, shoppingCart: updatedCart };
            } else {
                return {
                    ...state,
                    shoppingCart: [...state.shoppingCart, { ...action.payload, quantity: 1 }]
                };
            }

        case REMOVE_BOOK:
            const filteredCart = state.shoppingCart.filter(book => book.id !== action.payload);
            return { ...state, shoppingCart: filteredCart };

        case INCREMENT_BOOK_QUANTITY:
            const incrementedCart = state.shoppingCart.map(book => {
                if (book.id === action.payload) {
                    return { ...book, quantity: book.quantity + 1 };
                }
                return book;
            });
            return { ...state, shoppingCart: incrementedCart };

        case DECREMENT_BOOK_QUANTITY:
            const decrementedCart = state.shoppingCart.map(book => {
                if (book.id === action.payload) {
                    return { ...book, quantity: Math.max(book.quantity - 1, 1) };
                }
                return book;
            });
            return { ...state, shoppingCart: decrementedCart };

        default:
            return state;
    }
};

export default shoppingCartReducer;

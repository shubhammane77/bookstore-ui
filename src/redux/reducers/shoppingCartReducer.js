import { ADD_BOOK, REMOVE_BOOK, INCREMENT_BOOK_QUANTITY, DECREMENT_BOOK_QUANTITY, SET_CART_ID, SET_TOTAL_PRICE, SET_SHOPPING_CART_ITEMS } from "../constants/shoppingCartActionTypes";

// Initial state
const initialState = {
    shoppingCart: [],
    cartId: 0,
    totalPrice: 0
};

// Reducer function
const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOK:
            const existingBookIndex = state.shoppingCart.findIndex(shoppingCartItem => shoppingCartItem.book.id === action.payload.id);
            if (existingBookIndex !== -1) {
                const updatedCart = state.shoppingCart.map((shoppingCartItem, index) => {
                    if (index === existingBookIndex) {
                        return { ...shoppingCartItem, quantity: shoppingCartItem.quantity + 1 };
                    }
                    return shoppingCartItem;
                });
                return { ...state, shoppingCart: updatedCart };
            } else {
                return {
                    ...state,
                    shoppingCart: [...state.shoppingCart,  { book: action.payload, quantity: 1 }]
                };
            }

        case REMOVE_BOOK:
            const filteredCart = state.shoppingCart.filter(shoppingCartItem => shoppingCartItem.book.id !== action.payload);
            return { ...state, shoppingCart: filteredCart };

        case INCREMENT_BOOK_QUANTITY:
            const incrementedCart = state.shoppingCart.map(shoppingCartItem => {
                if (shoppingCartItem.book.id === action.payload) {
                    return { ...shoppingCartItem, quantity: shoppingCartItem.quantity + 1 };
                }
                return shoppingCartItem;
            });
            return { ...state, shoppingCart: incrementedCart };

        case DECREMENT_BOOK_QUANTITY:
            const decrementedCart = state.shoppingCart.map(shoppingCartItem => {
                if (shoppingCartItem.book.id === action.payload) {
                    return { ...shoppingCartItem, quantity: Math.max(shoppingCartItem.quantity - 1, 1) };
                }
                return shoppingCartItem;
            });
            return { ...state, shoppingCart: decrementedCart };
        case SET_CART_ID:
            return { ...state, cartId: action.payload };
        case SET_TOTAL_PRICE:
            return { ...state, totalPrice: action.payload };
        case SET_SHOPPING_CART_ITEMS:
                return { ...state, shoppingCart: action.payload };

        default:
            return state;
    }
};

export default shoppingCartReducer;

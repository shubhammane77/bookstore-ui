import { ADD_BOOK, REMOVE_BOOK, DECREMENT_BOOK_QUANTITY, INCREMENT_BOOK_QUANTITY, SET_CART_ID, SET_TOTAL_PRICE, SET_SHOPPING_CART_ITEMS } from "../constants/shoppingCartActionTypes";

export const addBook = (book) => {
    return {
        type: ADD_BOOK,
        payload: book,
    };
};

export const incrementQuantity = (bookId) => {
    return {
        type: INCREMENT_BOOK_QUANTITY,
        payload: bookId,
    };
};

export const decrementQuantity = (bookId) => {
    return {
        type: DECREMENT_BOOK_QUANTITY,
        payload: bookId,
    };
};

export const removeBook = (bookId) => {
    return {
        type: REMOVE_BOOK,
        payload: bookId,
    };
};

export const setCartId = (cartId) => {
    return {
        type: SET_CART_ID,
        payload: cartId,
    };
};


export const setTotalPrice = (totalPrice) => {
    return {
        type: SET_TOTAL_PRICE,
        payload: totalPrice,
    };
};

export const setShoppingCartItems = (shoppingCartItems) => {
    return {
        type: SET_SHOPPING_CART_ITEMS,
        payload: shoppingCartItems,
    };
};
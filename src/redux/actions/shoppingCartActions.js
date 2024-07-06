import { ADD_BOOK, REMOVE_BOOK, DECREMENT_BOOK_QUANTITY, INCREMENT_BOOK_QUANTITY } from "../constants/shoppingCartActionTypes";

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
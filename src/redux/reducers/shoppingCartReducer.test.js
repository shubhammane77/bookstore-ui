import shoppingCartReducer from './ShoppingCartReducer';

import { ADD_BOOK,REMOVE_BOOK,INCREMENT_BOOK_QUANTITY,DECREMENT_BOOK_QUANTITY } from '../constants/shoppingCartActionTypes';
describe('shoppingCartReducer', () => {
    const initialState = { shoppingCart: [] };

    it('should return the initial state', () => {
        expect(shoppingCartReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle ADD_BOOK when the book is not in the cart', () => {
        const book = { id: 1, title: 'Book 1' };
        const action = { type: ADD_BOOK, payload: book };
        const expectedState = { shoppingCart: [{ ...book, quantity: 1 }] };

        expect(shoppingCartReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_BOOK when the book is already in the cart', () => {
        const book = { id: 1, title: 'Book 1', quantity: 1 };
        const state = { shoppingCart: [book] };
        const action = { type: ADD_BOOK, payload: { id: 1, title: 'Book 1' } };
        const expectedState = { shoppingCart: [{ ...book, quantity: 2 }] };

        expect(shoppingCartReducer(state, action)).toEqual(expectedState);
    });

    it('should handle REMOVE_BOOK', () => {
        const book = { id: 1, title: 'Book 1', quantity: 1 };
        const state = { shoppingCart: [book] };
        const action = { type: REMOVE_BOOK, payload: 1  };
        const expectedState = { shoppingCart: [] };

        expect(shoppingCartReducer(state, action)).toEqual(expectedState);
    });

    it('should handle INCREMENT_BOOK_QUANTITY', () => {
        const book = { id: 1, title: 'Book 1', quantity: 1 };
        const state = { shoppingCart: [book] };
        const action = { type: INCREMENT_BOOK_QUANTITY, payload:  1  };
        const expectedState = { shoppingCart: [{ ...book, quantity: 2 }] };

        expect(shoppingCartReducer(state, action)).toEqual(expectedState);
    });

    it('should handle DECREMENT_BOOK_QUANTITY', () => {
        const book = { id: 1, title: 'Book 1', quantity: 2 };
        const state = { shoppingCart: [book] };
        const action = { type: DECREMENT_BOOK_QUANTITY, payload: 1  };
        const expectedState = { shoppingCart: [{ ...book, quantity: 1 }] };

        expect(shoppingCartReducer(state, action)).toEqual(expectedState);
    });

    it('should not decrement book quantity below 1', () => {
        const book = { id: 1, title: 'Book 1', quantity: 1 };
        const state = { shoppingCart: [book] };
        const action = { type: DECREMENT_BOOK_QUANTITY, payload: 1 };
        const expectedState = { shoppingCart: [{ ...book, quantity: 1 }] };

        expect(shoppingCartReducer(state, action)).toEqual(expectedState);
    });
});

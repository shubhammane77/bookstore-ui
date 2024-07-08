import shoppingCartReducer from './shoppingCartReducer';
import {
  ADD_BOOK,
  REMOVE_BOOK,
  SET_CART_ID,
  SET_TOTAL_PRICE,
  SET_SHOPPING_CART_ITEMS
} from '../constants/shoppingCartActionTypes';

// Initial state
const initialState = {
  shoppingCart: [],
  cartId: 0,
  totalPrice: 0
};

describe('shoppingCartReducer', () => {

  it('should return the initial state', () => {
    expect(shoppingCartReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_BOOK', () => {
    const book = { id: 1, title: 'Test Book', unitPrice: 10 };
    const addAction = { type: ADD_BOOK, payload: book };

    const expectedState = {
      ...initialState,
      shoppingCart: [{ book, quantity: 1 }]
    };

    expect(shoppingCartReducer(initialState, addAction)).toEqual(expectedState);
  });

  it('should handle REMOVE_BOOK', () => {
    const book = { id: 1, title: 'Test Book', unitPrice: 10 };
    const removeAction = { type: REMOVE_BOOK, payload: 1 };

    const stateWithBook = {
      ...initialState,
      shoppingCart: [{ book, quantity: 1 }]
    };

    const expectedState = {
      ...initialState,
      shoppingCart: []
    };

    expect(shoppingCartReducer(stateWithBook, removeAction)).toEqual(expectedState);
  });

  it('should handle SET_CART_ID', () => {
    const setCartIdAction = { type: SET_CART_ID, payload: 1 };

    const expectedState = {
      ...initialState,
      cartId: 1
    };

    expect(shoppingCartReducer(initialState, setCartIdAction)).toEqual(expectedState);
  });

  it('should handle SET_TOTAL_PRICE', () => {
    const setTotalPriceAction = { type: SET_TOTAL_PRICE, payload: 100 };

    const expectedState = {
      ...initialState,
      totalPrice: 100
    };

    expect(shoppingCartReducer(initialState, setTotalPriceAction)).toEqual(expectedState);
  });

  it('should handle SET_SHOPPING_CART_ITEMS', () => {
    const book = { id: 1, title: 'Test Book', unitPrice: 10 };
    const setShoppingCartItemsAction = { type: SET_SHOPPING_CART_ITEMS, payload: [{ book, quantity: 1 }] };

    const expectedState = {
      ...initialState,
      shoppingCart: [{ book, quantity: 1 }]
    };

    expect(shoppingCartReducer(initialState, setShoppingCartItemsAction)).toEqual(expectedState);
  });
});

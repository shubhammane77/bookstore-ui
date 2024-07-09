import ShoppingCartReducer from './ShoppingCartReducer';
import {
  ADD_BOOK,
  REMOVE_BOOK,
  SET_CART_ID,
  SET_TOTAL_PRICE,
  SET_SHOPPING_CART_ITEMS
} from '../../constants/ActionTypes';


describe('ShoppingCartReducer', () => {
  let initialState;
  let book;
  beforeEach(() => {
    // Initial state
    initialState = {
      shoppingCart: [],
      cartId: 0,
      totalPrice: 0
    };
    book = { id: 1, title: 'Test Book', unitPrice: 10 };

  })
  it('should return the initial state', () => {
    expect(ShoppingCartReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_BOOK', () => {
    const addAction = { type: ADD_BOOK, payload: book };
    const expectedState = {
      ...initialState,
      shoppingCart: [{ book, quantity: 1 }]
    };

    expect(ShoppingCartReducer(initialState, addAction)).toEqual(expectedState);
  });

  it('should handle REMOVE_BOOK', () => {
    const removeAction = { type: REMOVE_BOOK, payload: 1 };
    const stateWithBook = {
      ...initialState,
      shoppingCart: [{ book, quantity: 1 }]
    };

    const expectedState = {
      ...initialState,
      shoppingCart: []
    };

    expect(ShoppingCartReducer(stateWithBook, removeAction)).toEqual(expectedState);
  });

  it('should handle SET_CART_ID', () => {
    const setCartIdAction = { type: SET_CART_ID, payload: 1 };

    const expectedState = {
      ...initialState,
      cartId: 1
    };

    expect(ShoppingCartReducer(initialState, setCartIdAction)).toEqual(expectedState);
  });

  it('should handle SET_TOTAL_PRICE', () => {
    const setTotalPriceAction = { type: SET_TOTAL_PRICE, payload: 100 };

    const expectedState = {
      ...initialState,
      totalPrice: 100
    };

    expect(ShoppingCartReducer(initialState, setTotalPriceAction)).toEqual(expectedState);
  });

  it('should handle SET_SHOPPING_CART_ITEMS', () => {
    const setShoppingCartItemsAction = { type: SET_SHOPPING_CART_ITEMS, payload: [{ book, quantity: 1 }] };

    const expectedState = {
      ...initialState,
      shoppingCart: [{ book, quantity: 1 }]
    };

    expect(ShoppingCartReducer(initialState, setShoppingCartItemsAction)).toEqual(expectedState);
  });
});

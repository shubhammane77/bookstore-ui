import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShoppingCart from './ShoppingCart';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
// Create a mock store
const mockStore = configureMockStore();
const store = mockStore({
  shoppingCart: {
    shoppingCart: []
  }
});

const filledStore = mockStore({
  shoppingCart: {
    shoppingCart: [
     { book: { id: 1, title: 'Catch-22', quantity: 1, imageUrl: 'https://covers.openlibrary.org/b/olid/OL2637120M-L.jpg' }},
     { book: { id: 2, title: 'The Catcher in the Rye', quantity: 2, imageUrl: 'https://covers.openlibrary.org/b/olid/OL23280426M-L.jpg' }},
    ]
  }
});

describe('ShoppingCart Component', () => {

  test('renders the shopping cart with items', () => {
    render(
      <Provider store={filledStore}>
        <ShoppingCart />
      </Provider>
    );
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('Catch-22')).toBeInTheDocument();
    expect(screen.getByText('The Catcher in the Rye')).toBeInTheDocument();
  });
  test('displays empty cart message when cart is empty', () => {
    render(
      <Provider store={store}>
        <ShoppingCart />
      </Provider>

    );
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShoppingCart from '../src/components/ShoppingCart/ShoppingCart';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { fetchData, postData } from '../src/apiService';
import { updateQuantity } from '../src/redux/actions/shoppingCartActions';
jest.mock('../../apiService');

// Create a mock store
const mockStore = configureMockStore();
const store = mockStore({
  shoppingCart: {
    shoppingCart: []
  },
  user: {
    userId: 1,
    token: 'test',
    userName: 'testName'
  }
});

const filledStore = mockStore({
  shoppingCart: {
    shoppingCart: [
      { book: { id: 1, title: 'Book 1', author: { name: 'Author 1' }, unitPrice: 10 }, quantity: 2 },
      { book: { id: 2, title: 'Book 2', author: { name: 'Author 2' }, unitPrice: 15 }, quantity: 1 },
    ],
    totalPrice: 35,
    cartId: 123,
  },
  user: {
    userId: 1,
    token: 'test',
    userName: 'testName'
  }
}
);
store.dispatch = jest.fn();
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('ShoppingCart Component', () => {

  test('renders the shopping cart with items', () => {
    render(
      <Provider store={filledStore}>
        <ShoppingCart />
      </Provider>
    );
    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
  });
  it('updates item quantity in cart', async () => {
    postData.mockResolvedValue({ totalPrice: 45 });

    render(
      <Provider store={filledStore}>
        <ShoppingCart />
      </Provider>
    );

    fireEvent.change(screen.getAllByRole('combobox')[0], { target: { value: '3' } });
    const dispatch = jest.fn();

    expect(postData).toHaveBeenCalledWith('/v1/cart/update', { cartId: 123, bookId: 1, quantity: 3 },{"Authorization": "Bearer test"});
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
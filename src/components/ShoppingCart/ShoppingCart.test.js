import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShoppingCart from './ShoppingCart/ShoppingCart';

const mockIncrementQuantity = jest.fn();
const mockDecrementQuantity = jest.fn();
const mockRemoveFromCart = jest.fn();

const mockCart = [
  { id: 1, title: 'Catch-22', quantity: 1, imageUrl: 'https://covers.openlibrary.org/b/olid/OL2637120M-L.jpg' },
  { id: 2, title: 'The Catcher in the Rye', quantity: 2, imageUrl: 'https://covers.openlibrary.org/b/olid/OL23280426M-L.jpg' },
];

describe('ShoppingCart Component', () => {
  beforeEach(() => {
    render(
      <ShoppingCart
        cart={mockCart}
        incrementQuantity={mockIncrementQuantity}
        decrementQuantity={mockDecrementQuantity}
        removeFromCart={mockRemoveFromCart}
      />
    );
  });

  test('renders the shopping cart with items', () => {
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('Catch-22')).toBeInTheDocument();
    expect(screen.getByText('The Catcher in the Rye')).toBeInTheDocument();
  });

  test('calls incrementQuantity when the + button is clicked', () => {
    const incrementButtons = screen.getAllByText('+');
    fireEvent.click(incrementButtons[0]);
    expect(mockIncrementQuantity).toHaveBeenCalledWith(1);
  });

  test('calls decrementQuantity when the - button is clicked', () => {
    const decrementButtons = screen.getAllByText('-');
    fireEvent.click(decrementButtons[0]);
    expect(mockDecrementQuantity).toHaveBeenCalledWith(1);
  });

  test('calls removeFromCart when the Remove button is clicked', () => {
    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  test('displays empty cart message when cart is empty', () => {
    render(
      <ShoppingCart
        cart={[]}
        incrementQuantity={mockIncrementQuantity}
        decrementQuantity={mockDecrementQuantity}
        removeFromCart={mockRemoveFromCart}
      />
    );
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });
});
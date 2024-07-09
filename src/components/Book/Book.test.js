import { fireEvent, render, screen } from '@testing-library/react';
import Book from './Book';
describe('Book component rendering', () => {
  let mockAddToCart = jest.fn();
  let book;
  beforeEach(() => {
    book = {
      "id": 6,
      "title": "The Catcher in the Rye",
      "author": {
        "id": 5,
        "name": "J.D. Salinger"
      },
      "unitPrice": 9.99,
      "stockQuantity": 70,
      "genres": "Classic",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL23280426M-L.jpg"
    };
  });
  test('renders book component', () => {
    render(<Book book={book} loading={false} addToCart={mockAddToCart} />)
    const linkElement = screen.getByText(/The Catcher in the Rye/i);
    expect(linkElement).toBeInTheDocument();

  });

  test('Test add to cart button', () => {
    render(<Book book={book} loading={false} addToCart={mockAddToCart} />)
    fireEvent.click(screen.getByText(/Add to cart/i));
    expect(mockAddToCart).toHaveBeenCalled();
  });

  test('loading button', () => {
    render(<Book book={book} loading={true} addToCart={mockAddToCart} />)
    const addingButton = screen.getByText(/Adding.../i);
    expect(addingButton).toBeInTheDocument();
  });
});

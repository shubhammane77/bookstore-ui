import { render, screen } from '@testing-library/react';
import Book from './Book';

test('renders book component', () => {
  var book = {
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

  render(<Book book={book} />);
  const linkElement = screen.getByText(/The Catcher in the Rye/i);
  expect(linkElement).toBeInTheDocument();
});

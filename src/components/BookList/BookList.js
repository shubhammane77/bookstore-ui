import Book from '../Book/Book';
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from "react-redux";
import { addBook } from '../../redux/actions/shoppingCartActions';
import './BookList.css';
const BookList = () => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state.shoppingCart.shoppingCart)
  const addToCart = (book) => {
    dispatch(addBook(book));
  };
  const [books, setBooks] = useState([
    {
      "id": 1,
      "title": "Harry Potter and the Sorcerer's Stone",
      "author": {
        "id": 1,
        "name": "J.K. Rowling"
      },
      "unitPrice": 19.99,
      "stockQuantity": 100,
      "genres": "Fantasy",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL26311688M-L.jpg"
    },
    {
      "id": 2,
      "title": "The Hobbit",
      "author": {
        "id": 2,
        "name": "J.R.R. Tolkien"
      },
      "unitPrice": 14.99,
      "stockQuantity": 90,
      "genres": "Fantasy",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL5334903M-L.jpg"
    },
    {
      "id": 3,
      "title": "The Lord of the Rings",
      "author": {
        "id": 2,
        "name": "J.R.R. Tolkien"
      },
      "unitPrice": 29.99,
      "stockQuantity": 120,
      "genres": "Fantasy",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL4720931M-L.jpg"
    },
    {
      "id": 4,
      "title": "The Hunger Games",
      "author": {
        "id": 3,
        "name": "Suzanne Collins"
      },
      "unitPrice": 12.99,
      "stockQuantity": 80,
      "genres": "Science Fiction",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL7915666M-L.jpg"
    },
    {
      "id": 5,
      "title": "The Da Vinci Code",
      "author": {
        "id": 4,
        "name": "Dan Brown"
      },
      "unitPrice": 15.99,
      "stockQuantity": 110,
      "genres": "Mystery",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL24218286M-L.jpg"
    },
    {
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
    },
    {
      "id": 7,
      "title": "To Kill a Mockingbird",
      "author": {
        "id": 6,
        "name": "Harper Lee"
      },
      "unitPrice": 11.99,
      "stockQuantity": 85,
      "genres": "Classic",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL24237920M-L.jpg"
    },
    {
      "id": 8,
      "title": "1984",
      "author": {
        "id": 7,
        "name": "George Orwell"
      },
      "unitPrice": 10.99,
      "stockQuantity": 95,
      "genres": "Dystopian",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL2715224M-L.jpg"
    },
    {
      "id": 9,
      "title": "Pride and Prejudice",
      "author": {
        "id": 8,
        "name": "Jane Austen"
      },
      "unitPrice": 8.99,
      "stockQuantity": 75,
      "genres": "Romance",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL24225895M-L.jpg"
    },
    {
      "id": 10,
      "title": "The Great Gatsby",
      "author": {
        "id": 9,
        "name": "F. Scott Fitzgerald"
      },
      "unitPrice": 7.99,
      "stockQuantity": 65,
      "genres": "Classic",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL2737262M-L.jpg"
    },
    {
      "id": 11,
      "title": "Moby Dick",
      "author": {
        "id": 10,
        "name": "Herman Melville"
      },
      "unitPrice": 13.99,
      "stockQuantity": 105,
      "genres": "Adventure",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL24194991M-L.jpg"
    },
    {
      "id": 12,
      "title": "Alice's Adventures in Wonderland",
      "author": {
        "id": 11,
        "name": "Lewis Carroll"
      },
      "unitPrice": 6.99,
      "stockQuantity": 55,
      "genres": "Fantasy",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL14307254M-L.jpg"
    },
    {
      "id": 13,
      "title": "Adventures of Huckleberry Finn",
      "author": {
        "id": 12,
        "name": "Mark Twain"
      },
      "unitPrice": 9.99,
      "stockQuantity": 85,
      "genres": "Adventure",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL2044307M-L.jpg"
    },
    {
      "id": 14,
      "title": "The Odyssey",
      "author": {
        "id": 13,
        "name": "Homer"
      },
      "unitPrice": 11.99,
      "stockQuantity": 95,
      "genres": "Epic",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL26455285M-L.jpg"
    },
    {
      "id": 35,
      "title": "A Tale of Two Cities",
      "author": {
        "id": 33,
        "name": "Alexandre Dumas"
      },
      "unitPrice": 8.99,
      "stockQuantity": 75,
      "genres": "Historical Fiction",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL2335155M-L.jpg"
    }]
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="book-list-container">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <h2>Book List</h2>
      <ul className="book-list">
        {filteredBooks.map(book => (
          <li key={book.id} className="book-item">
            <Book book={book} addToCart={() => addToCart(book)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
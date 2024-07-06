import Book from '../Book/Book';
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from "react-redux";
import {addBook } from '../../redux/actions/shoppingCartActions';

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
      "id": 15,
      "title": "War and Peace",
      "author": {
        "id": 14,
        "name": "Leo Tolstoy"
      },
      "unitPrice": 21.99,
      "stockQuantity": 125,
      "genres": "Historical Fiction",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL1859518M-L.jpg"
    },
    {
      "id": 16,
      "title": "Don Quixote",
      "author": {
        "id": 15,
        "name": "Mary Shelley"
      },
      "unitPrice": 17.99,
      "stockQuantity": 115,
      "genres": "Adventure",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL18222850M-L.jpg"
    },
    {
      "id": 17,
      "title": "The Old Man and the Sea",
      "author": {
        "id": 16,
        "name": "Bram Stoker"
      },
      "unitPrice": 8.99,
      "stockQuantity": 60,
      "genres": "Adventure",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL7299082M-L.jpg"
    },
    {
      "id": 18,
      "title": "Crime and Punishment",
      "author": {
        "id": 17,
        "name": "Oscar Wilde"
      },
      "unitPrice": 12.99,
      "stockQuantity": 95,
      "genres": "Psychological Fiction",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL23279740M-L.jpg"
    },
    {
      "id": 19,
      "title": "Frankenstein",
      "author": {
        "id": 18,
        "name": "Gabriel García Márquez"
      },
      "unitPrice": 10.99,
      "stockQuantity": 80,
      "genres": "Gothic Fiction",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL19617669M-L.jpg"
    },
    {
      "id": 20,
      "title": "Dracula",
      "author": {
        "id": 19,
        "name": "John Steinbeck"
      },
      "unitPrice": 9.99,
      "stockQuantity": 70,
      "genres": "Gothic Horror",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL5275157M-L.jpg"
    },
    {
      "id": 21,
      "title": "The Picture of Dorian Gray",
      "author": {
        "id": 20,
        "name": "Stephen King"
      },
      "unitPrice": 7.99,
      "stockQuantity": 55,
      "genres": "Gothic",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL18022116M-L.jpg"
    },
    {
      "id": 22,
      "title": "One Hundred Years of Solitude",
      "author": {
        "id": 21,
        "name": "Aldous Huxley"
      },
      "unitPrice": 11.99,
      "stockQuantity": 90,
      "genres": "Magic Realism",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL24937185M-L.jpg"
    },
    {
      "id": 23,
      "title": "Of Mice and Men",
      "author": {
        "id": 22,
        "name": "Charles Dickens"
      },
      "unitPrice": 6.99,
      "stockQuantity": 65,
      "genres": "Tragedy",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL1021236M-L.jpg"
    },
    {
      "id": 24,
      "title": "The Shining",
      "author": {
        "id": 23,
        "name": "Victor Hugo"
      },
      "unitPrice": 8.99,
      "stockQuantity": 75,
      "genres": "Horror",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL1104486M-L.jpg"
    },
    {
      "id": 25,
      "title": "Brave New World",
      "author": {
        "id": 24,
        "name": "Virginia Woolf"
      },
      "unitPrice": 9.99,
      "stockQuantity": 80,
      "genres": "Dystopian",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL23280061M-L.jpg"
    },
    {
      "id": 26,
      "title": "Great Expectations",
      "author": {
        "id": 25,
        "name": "Ernest Hemingway"
      },
      "unitPrice": 7.99,
      "stockQuantity": 60,
      "genres": "Classic",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL3219966M-L.jpg"
    },
    {
      "id": 27,
      "title": "Les Misérables",
      "author": {
        "id": 26,
        "name": "Fyodor Dostoevsky"
      },
      "unitPrice": 12.99,
      "stockQuantity": 100,
      "genres": "Historical Fiction",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL24404937M-L.jpg"
    },
    {
      "id": 28,
      "title": "Mrs. Dalloway",
      "author": {
        "id": 27,
        "name": "George Eliot"
      },
      "unitPrice": 6.99,
      "stockQuantity": 55,
      "genres": "Modernist Literature",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL24237836M-L.jpg"
    },
    {
      "id": 29,
      "title": "The Time Machine",
      "author": {
        "id": 28,
        "name": "Miguel de Cervantes"
      },
      "unitPrice": 9.99,
      "stockQuantity": 70,
      "genres": "Science Fiction",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL23962351M-L.jpg"
    },
    {
      "id": 30,
      "title": "Wuthering Heights",
      "author": {
        "id": 29,
        "name": "H.G. Wells"
      },
      "unitPrice": 8.99,
      "stockQuantity": 65,
      "genres": "Gothic Fiction",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL24227080M-L.jpg"
    },
    {
      "id": 31,
      "title": "The Adventures of Tom Sawyer",
      "author": {
        "id": 12,
        "name": "Mark Twain"
      },
      "unitPrice": 7.99,
      "stockQuantity": 60,
      "genres": "Adventure",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL3311271M-L.jpg"
    },
    {
      "id": 32,
      "title": "Catch-22",
      "author": {
        "id": 30,
        "name": "Emily Brontë"
      },
      "unitPrice": 10.99,
      "stockQuantity": 85,
      "genres": "Satire",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL2637120M-L.jpg"
    },
    {
      "id": 33,
      "title": "East of Eden",
      "author": {
        "id": 31,
        "name": "Charlotte Brontë"
      },
      "unitPrice": 11.99,
      "stockQuantity": 95,
      "genres": "Family Saga",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL24228935M-L.jpg"
    },
    {
      "id": 34,
      "title": "The Count of Monte Cristo",
      "author": {
        "id": 32,
        "name": "Joseph Heller"
      },
      "unitPrice": 13.99,
      "stockQuantity": 105,
      "genres": "Adventure",
      "imageUrl": "https://covers.openlibrary.org/b/olid/OL24229541M-L.jpg"
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
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <h2>Book List</h2>
      <ul>
        {filteredBooks.map(book => (
          <li key={book.id}>
            <Book book={book} addToCart={() => addToCart(book)} />
          </li>
        ))}
      </ul>

    </div>
  );
}

export default BookList;
import Book from '../Book/Book';
import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from "react-redux";
import { addBook, setCartId, setShoppingCartItems, setTotalPrice } from '../../redux/actions/shoppingCartActions';
import './BookList.css';
import { fetchData, postData } from '../../apiService';
const BookList = () => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state.shoppingCart.shoppingCart)
  const cartId = useSelector(state => state.shoppingCart.cartId)
  const userId = 1;

  const [books, setBooks] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books && books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const result = await fetchData(`/v1/cart/getShoppingCart?userId=${userId}`);
        dispatch(setCartId(result.shoppingCartId));
        dispatch(setTotalPrice(result.totalPrice));
        dispatch(setShoppingCartItems(result.shoppingCartItems));
      } catch (error) {
        dispatch(setCartId(0));
        dispatch(setTotalPrice(0));
      }
    };
    const fetchBooks = async () => {
      try {
        const data = await fetchData('/v1/books/getAllBooks');
        setBooks(data);
      } catch (error) {
      }
    };
    fetchCart();
    fetchBooks();
  }, []);

  const createNewCart = async (book) => {
    try {
      var request = {
        userId: userId,
        totalPrice: book.unitPrice,
        shoppingCartItems: [{
          bookId: book.id,
          quantity: 1
        }]
      }
      const endpoint = '/v1/cart/create';
      const result = await postData(endpoint, request);
      console.log('Added book successfully:', result);
      // set redux states
      dispatch(setCartId(result.cartId));
      dispatch(setTotalPrice(book.unitPrice));
      dispatch(addBook(book));
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }

  const updateCart = async (book) => {
    const endpoint = '/v1/cart/update';
    try {
      var request = { cartId: cartId, bookId: book.id };
      var doesBookExistInCart = shoppingCart.find(shoppingCartItem => shoppingCartItem.book.id === book.id)
      console.log(doesBookExistInCart);
      request = {
        ...request
        , quantity:
          doesBookExistInCart ? doesBookExistInCart.quantity + 1 : 1
      }

      const result = await postData(endpoint, request);
      console.log('Added book successfully:', result);
      dispatch(addBook(book));
      dispatch(setTotalPrice(result.totalPrice));
    } catch (error) {
      console.error('Error updating book:', error);
    }
  }
  const addToCart = async (book) => {
    if (cartId === 0) {
      createNewCart(book);
    } else {
      updateCart(book);
    }
  };

  return (
    <div className="book-list-container">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul className="book-list">
        {filteredBooks && filteredBooks.map(book => (
          <li key={book.id} className="book-item">
            <Book book={book} addToCart={() => addToCart(book)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
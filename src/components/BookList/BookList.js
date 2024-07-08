import Book from '../Book/Book';
import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from "react-redux";
import { addBook, setCartId, setShoppingCartItems, setTotalPrice } from '../../redux/actions/shoppingCartActions';
import './BookList.css';
import { fetchData, postData } from '../../apiService';
import { user_logout } from '../../redux/actions/userActions';

const BookList = () => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state.shoppingCart.shoppingCart)
  const cartId = useSelector(state => state.shoppingCart.cartId)
  const userId = useSelector(state => state.user.userId);
  const token = useSelector(state => state.user.token);
  var header = { Authorization: `Bearer ${token}` }
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books && books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchCart = async () => {
    try {
      setLoading(true);
      const result = await fetchData(`/v1/cart/getShoppingCart?userId=${userId}`, header);
      dispatch(setCartId(result.shoppingCartId));
      dispatch(setTotalPrice(result.totalPrice));
      dispatch(setShoppingCartItems(result.shoppingCartItems));
    } catch (error) {
      if (error.message === '401') {
        dispatch(user_logout());
      }
    } finally {
      setLoading(false);
    }
  };
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchData('/v1/books/getAllBooks', header);
      setBooks(data);
    } catch (error) {
      if (error.message === '401') {
        dispatch(user_logout());
      }
    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCart();
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
      const result = await postData(endpoint, request, header);
      console.log('Added book successfully:', result);
      // set redux states
      dispatch(setCartId(result.cartId));
      dispatch(setTotalPrice(book.unitPrice));
      dispatch(addBook(book));
      alert('Book added to cart');
    } catch (error) {
      if (error.message === '401') {
        dispatch(user_logout());
      }
      alert('Book not added to cart');

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

      const result = await postData(endpoint, request, header);
      console.log('Added book successfully:', result);
      dispatch(addBook(book));
      dispatch(setTotalPrice(result.totalPrice));
      alert('Book added to cart');
    } catch (error) {
      if (error.message === '401') {
        dispatch(user_logout());
      }
      console.error('Error updating book:', error);
      alert('Book not added to cart');
    }
  }
  const addToCart = async (book) => {
    setLoading(true);
    if (cartId === 0) {
      createNewCart(book);
    } else {
      updateCart(book);
    }
    setLoading(false);
  };

  return (
    <div className="book-list-container">
      {loading && <div className="loading-overlay"><div className="spinner"></div></div>}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul className="book-list">
        {filteredBooks && filteredBooks.map(book => (
          <li key={book.id} className="book-item">
            <Book book={book} addToCart={() => addToCart(book)} loading={loading} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
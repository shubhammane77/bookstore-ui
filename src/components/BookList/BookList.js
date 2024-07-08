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
    const [searchCriteria, setSearchCriteria] = useState(null);

    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleSearch = () => {
      setSearchCriteria(searchQuery);
    }

    const fetchCart = async () => {
      try {
        setLoading(true);
        const result = await fetchData(`/v1/carts/getShoppingCart?userId=${userId}`, header);
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
    const fetchBooks = async (pageNo) => {
      try {
        setLoading(true);
        const data = await fetchData(`/v1/books/search?searchCriteria=${searchCriteria ?? ''}&pageNo=${pageNo - 1}`, header);
        setTotalPages(data.totalPages);
        setCurrentPageNo(pageNo);
        setBooks(data.content);
      } catch (error) {
        if (error.message === '401') {
          dispatch(user_logout());
        }
      } finally {
        setLoading(false);

      }
    };

    useEffect(() => {
      fetchCart();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (searchCriteria == null) {
        return;
      }
      fetchBooks(1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchCriteria]);

    useEffect(() => {
      fetchBooks(currentPageNo); // Fetch books when component mounts or currentPageNo changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPageNo]);

    const handlePageChange = (pageNo) => {
      if (pageNo !== currentPageNo) {
        fetchBooks(pageNo);
      }
    };
    const handleNextPage = () => {
      if (currentPageNo < totalPages) {
        handlePageChange(currentPageNo + 1);
      }
    };

    const handlePrevPage = () => {
      if (currentPageNo > 1) {
        handlePageChange(currentPageNo - 1);
      }
    };

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
        const endpoint = '/v1/carts/create';
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
      const endpoint = '/v1/carts/update';
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
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
        <ul className="book-list">
          {books && books.map(book => (
            <li key={book.id} className="book-item">
              <Book book={book} addToCart={() => addToCart(book)} loading={loading} />
            </li>
          ))}
        </ul>
        {books && books.length > 0 && <div className="pagination">
          <button className="pagination-btn" onClick={handlePrevPage} disabled={currentPageNo === 1}>Previous</button>
          <span className="pagination-text">Page {currentPageNo} of {totalPages}</span>
          <button className="pagination-btn" onClick={handleNextPage} disabled={currentPageNo === totalPages}>Next</button>
        </div>
        }
        {books && books.length === 0 && <div className="pagination">
          <span className="pagination-text">No Book Found.</span>
        </div>
        }
      </div>
    );
  }

  export default BookList;
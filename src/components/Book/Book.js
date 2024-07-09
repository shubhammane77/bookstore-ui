import './Book.css'
import PropTypes from 'prop-types';

function Book({ book, addToCart, loading }) {
  return (
    <div className="book-container">
      <div className="book-details">
        <h4>{book.title}</h4>
        <p className="author">Author: {book.author?.name}</p>
        <p>Price: ${book.unitPrice.toFixed(2)}</p>
        <p>Genre: {book.genres}</p>
        <button onClick={() => addToCart(book)} disabled={loading}>
          {loading ? 'Adding...' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    unitPrice: PropTypes.number.isRequired,
    genres: PropTypes.string.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Book;

import './Book.css'
function Book({ book, addToCart,loading }) {
  return (
    <div className="book-container">

    <div className="book-details">
      <h4>{book.title}</h4>
      <p className="author">Author: {book.author?.name}</p>
      <p>Price: ${book.unitPrice.toFixed(2)}</p>
      <p>Stock: {book.stockQuantity}</p>
      <p>Genre: {book.genres}</p>
      <button onClick={() => addToCart(book)} disabled={loading}>
        {loading ? 'Adding...' : 'Add to cart'}
      </button>
    </div>
   
  </div>
  );
}

export default Book;

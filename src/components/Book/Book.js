import './Book.css'
function Book({ book, addToCart }) {
  return (
    <div className="book-container">
      <div className="book-details">
        <h4>{book.title}</h4>
        <p className="author">Author: {book.author?.name}</p>
        <p>Price: ${book.unitPrice}</p>
        <p>Stock: {book.stockQuantity}</p>
        <p>Genres: {book.genres}</p>
        <button onClick={() => addToCart(book)}>Add to cart</button>
      </div>
    </div>
  );
}

export default Book;

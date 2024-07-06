
function Book({book, addToCart}) {
  return (
    <div>
      <img src={book.imageUrl} alt={book.title} style={{ width: '100px' }} />
      <div>
       <h4>{book.title}</h4>
            <p className="p-3">Author: {book.author?.name}</p>
            <p>Price: ${book.unitPrice}</p>
            <p>Stock: {book.stockQuantity}</p>
            <p>Genres: {book.genres}</p>
            <button onClick={() => addToCart(book)}>Add to cart</button>
            </div>
    </div>
  );
}

export default Book;

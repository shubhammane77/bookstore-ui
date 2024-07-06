
function Book({book}) {
  
  return (
    <div>
      <img src={book.imageUrl} alt={book.title} style={{ width: '100px' }} />
      <div>
       <h4>{book.title}</h4>
            <p className="p-3">Author: {book.author?.name}</p>
            <p>Price: ${book.unitPrice}</p>
            <p>Stock: {book.stockQuantity}</p>
            <p>Genres: {book.genres}</p>
            </div>
    </div>
  );
}

export default Book;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeBook } from '../../redux/actions/shoppingCartActions';
import './ShoppingCart.css';
const ShoppingCart = () => {

  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state.shoppingCart.shoppingCart)

  const increment = (bookId) => {
    dispatch(incrementQuantity(bookId))
  };

  const decrement = (bookId) => {
    dispatch(decrementQuantity(bookId))
  };

  const remove = (bookId) => {
    dispatch(removeBook(bookId))
  };
  return (
    <div className="shopping-cart-container">
      <h2>Shopping Cart</h2>
      {shoppingCart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="cart-list">
          {shoppingCart.map((item) => (
            <li key={item.book.id} className="cart-item">
              <div>
              <span className="cart-item-title">{item.book.title}</span>              
              <span className="cart-item-author">by {item.book.author?.name}</span>
              </div>
              <span className="cart-item-quantity">
                Quantity:
                <button onClick={() => decrement(item.id)} className="quantity-button">-</button>
                {item.quantity}
                <button onClick={() => increment(item.id)} className="quantity-button">+</button>
              </span>
              <button onClick={() => remove(item.id)} className="remove-button">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;

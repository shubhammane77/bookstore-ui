import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  incrementQuantity, decrementQuantity, removeBook } from '../../redux/actions/shoppingCartActions';

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
    <div>
      <h2>Shopping Cart</h2>
      {shoppingCart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {shoppingCart.map((item) => (
            <li key={item.id}>
              <img src={item.imageUrl} alt={item.title} style={{ width: '50px', height: '75px' }} />
              <span>{item.title}</span>
              <span>
                Quantity: 
                <button onClick={() => increment(item.id)}>-</button>
                {item.quantity}
                <button onClick={() => decrement(item.id)}>+</button>
              </span>
              <button onClick={() => remove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
  
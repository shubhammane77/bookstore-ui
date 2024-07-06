import React from 'react';

const ShoppingCart = ({ cart, incrementQuantity, decrementQuantity, removeFromCart }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img src={item.imageUrl} alt={item.title} style={{ width: '50px', height: '75px' }} />
              <span>{item.title}</span>
              <span>
                Quantity: 
                <button onClick={() => decrementQuantity(item.id)}>-</button>
                {item.quantity}
                <button onClick={() => incrementQuantity(item.id)}>+</button>
              </span>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
  
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeBook, updateQuantity, setTotalPrice, deleteCartAction } from '../../redux/actions/shoppingCartActions';
import './ShoppingCart.css';
import { calculateTotalPrice } from '../../utils/util';
import { deleteData, postData } from '../../apiService';
import { useNavigate } from 'react-router-dom';
const ShoppingCart = () => {

  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state.shoppingCart.shoppingCart)
  const totalPrice = useSelector(state => state.shoppingCart.totalPrice)
  const cartId = useSelector(state => state.shoppingCart.cartId);

  const navigate = useNavigate();

  const updateCart = async (book, quantity, cartId) => {
    const endpoint = '/v1/cart/update';
    try {
      const request = { cartId: cartId, bookId: book.id, quantity: quantity };
      const result = await postData(endpoint, request);
      dispatch(updateQuantity(book.id, quantity));
      dispatch(setTotalPrice(result.totalPrice));
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  }


  const deleteCart = async (cartId) => {
    const endpoint = `/v1/cart/delete?cartId=${cartId}`;
    try {
      await deleteData(endpoint);
      dispatch(deleteCartAction());
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  }

  const removeCartItem = async (bookId, cartId) => {
    const endpoint = `/v1/cart/removeCartItem?cartId=${cartId}&bookId=${bookId}`;
    try {
      const result = await deleteData(endpoint);
      dispatch(removeBook(bookId));
      dispatch(setTotalPrice(result.totalPrice));
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  }

  const remove = (bookId) => {
    removeCartItem(bookId, cartId);
  };
  const handleQuantityChange = (book, quantity) => {
    updateCart(book, quantity, cartId);
  };

  const handleClearCart = () => {
    deleteCart(cartId);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout')
  };

  useEffect(() => {
    try {
      var calculatedTotalPrice = calculateTotalPrice(shoppingCart);
      if (calculatedTotalPrice !== totalPrice) {
        /// throw new Error // clear cart? 
      }
    } catch (error) {

    }
  }, [shoppingCart, totalPrice]);
  const quantityOptions = Array.from({ length: 50 }, (_, index) => index + 1);

  return (
    <div className="shopping-cart-container">
      <h2>Shopping Cart</h2>
      {shoppingCart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCart.map((item) => (
              <tr key={item.book.id}>
                <td>{item.book.title}</td>
                <td>{item.book.author?.name}</td>
                <td className="cart-item-quantity">
                  <select
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.book, parseInt(e.target.value))}
                    className="quantity-dropdown"
                  >
                    {quantityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td>${(item.quantity * item.book.unitPrice).toFixed(2)}</td>
                <td>
                  <button onClick={() => remove(item.book.id)} className="remove-button">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      )}
      <div className="total-price">
        <span>Total Price: ${totalPrice}</span>
      </div>
      {shoppingCart && shoppingCart.length > 0 && <div className="cart-actions">
        <button onClick={handleClearCart} className="clear-cart-button">Clear Cart</button>
        <button onClick={handleProceedToCheckout} className="proceed-checkout-button">Proceed to Checkout</button>
      </div>}
    </div>
  );
};

export default ShoppingCart;

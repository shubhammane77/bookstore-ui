// Checkout.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Checkout.css';
import { postData } from '../../api/apiService';
import { deleteCartAction } from '../../redux/actions/shoppingCartActions';
import { useNavigate } from 'react-router-dom';
import { user_logout } from '../../redux/actions/userActions';
import { PLACE_ORDER_ENDPOINT } from '../../api/endpoints';

const Checkout = () => {
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state) => state.shoppingCart.shoppingCart);
    const totalPrice = useSelector((state) => state.shoppingCart.totalPrice);
    const cartId = useSelector((state) => state.shoppingCart.cartId);
    const userId = useSelector(state => state.user.userId);
    const token = useSelector(state => state.user.token);

    const navigate = useNavigate();

    const placeOrder = async (cartId,userId) => {
        var header = { Authorization: `Bearer ${token}` }
        const endpoint = PLACE_ORDER_ENDPOINT;
        try {
            const request = {
                cartId: cartId,
                userId: userId

            }
            await postData(endpoint, request, header);
            dispatch(deleteCartAction());
            navigate('/');
            alert('Order placed successfully.');
        } catch (error) {
            if (error.message === '401') {
                dispatch(user_logout());
                return;
              }
            console.error('Error while placing order:', error);
            alert('Error while placing order: ' + error.message);
        }
    }

    const handlePlaceOrder = () => {
        placeOrder(cartId,userId);
    };

    return (
        <div className="checkout-container">
            <button onClick={() => navigate('/cart')} className="back-button">Back To Cart</button>
            <h2>Checkout</h2>
            <div className="checkout-summary">
                <h3>Order Summary</h3>
                {shoppingCart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <table className="summary-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shoppingCart.map((item) => (
                                <tr key={item.book.id}>
                                    <td>{item.book.title}</td>
                                    <td>{item.book.author?.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${(item.book.unitPrice * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="total-price">
                    <h4>Total: ${totalPrice}</h4>
                </div>
            </div>

            <button onClick={handlePlaceOrder} className="place-order-button">Place Order</button>

        </div>

    );
};

export default Checkout;
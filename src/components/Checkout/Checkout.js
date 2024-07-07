// Checkout.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Checkout.css';
import { postData } from '../../apiService';
import { deleteCartAction } from '../../redux/actions/shoppingCartActions';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state) => state.shoppingCart.shoppingCart);
    const totalPrice = useSelector((state) => state.shoppingCart.totalPrice);
    const cartId = useSelector((state) => state.shoppingCart.cartId);

    const userId = 1;
    const navigate = useNavigate();

    const placeOrder = async (cartId) => {
        const endpoint = `/v1/order/placeOrder`;
        try {
            const request = {
                cartId: cartId,
                userId: userId

            }
            await postData(endpoint, request);
            dispatch(deleteCartAction());
            navigate('/');
        } catch (error) {
            console.error('Error while placing order:', error);
        }
    }

    const handlePlaceOrder = () => {
        placeOrder(cartId);
    };

    return (
        <div className="checkout-container">
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
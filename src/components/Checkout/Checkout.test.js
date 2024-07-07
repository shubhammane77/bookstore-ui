import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Checkout from './Checkout';
import { deleteCartAction } from '../../redux/actions/shoppingCartActions';
import { postData } from '../../apiService';

jest.mock('../../apiService', () => ({
    postData: jest.fn(),
}));
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));


const mockStore = configureStore([]);

describe('Checkout', () => {
    let store;
    let cartId = 1;
    let userId = 1;

    beforeEach(() => {
        store = mockStore({
            shoppingCart: {
                shoppingCart: [
                    {
                        book: {
                            id: 1,
                            title: 'Test Book',
                            author: { name: 'Test Author' },
                            unitPrice: 10,
                        },
                        quantity: 2,
                    },
                ],
                totalPrice: 20,
                cartId: cartId,
            },
        });
    });

    it('renders Checkout component with order summary and total price', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Checkout />
                </Router>
            </Provider>
        );

        expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
        expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Book/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Author/i)).toBeInTheDocument();
        expect(screen.getByText(/\$20.00/i)).toBeInTheDocument();
    });

    it('calls placeOrder function when "Place Order" button is clicked', async () => {
        const { getByText } = render(
            <Provider store={store}>
                <Router>
                    <Checkout />
                </Router>
            </Provider>
        );

        fireEvent.click(getByText(/Place Order/i));

        expect(postData).toHaveBeenCalledWith('/v1/order/placeOrder', {
            cartId: cartId,
            userId: userId,
        });

    });
});
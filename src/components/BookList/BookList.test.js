import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { fetchData, postData } from '../../apiService';
import BookList from './BookList';
jest.mock('../../apiService');


describe('BookList Component', () => {
    let store;
  
    beforeEach(() => {
        const mockStore = configureMockStore();
      store = mockStore({
        shoppingCart: {
          shoppingCart: [],
          cartId: 0,
          totalPrice: 0,
        },
      });
      fetchData.mockImplementation((url) => {
        if (url === '/v1/cart/getShoppingCart?userId=1') {
          return Promise.resolve({
            shoppingCartId: 1,
            totalPrice: 0,
            shoppingCartItems: []
          });
        } else if (url === '/v1/books/getAllBooks') {
          return Promise.resolve([
            { id: 1, title: 'Test Book 1', unitPrice: 10 },
            { id: 2, title: 'Test Book 2', unitPrice: 15 },
          ]);
        }
        return Promise.reject(new Error('not found'));
      });
    });
  
    it('should fetch and display a list of books', async () => {
      render(
        <Provider store={store}>
          <BookList />
        </Provider>
      );
  
      await waitFor(() => {
        expect(screen.getByText('Test Book 1')).toBeInTheDocument();
        expect(screen.getByText('Test Book 2')).toBeInTheDocument();
      });
    });
  
    it('should filter books by title', async () => {
      render(
        <Provider store={store}>
          <BookList />
        </Provider>
      );
  
      await waitFor(() => {
        expect(screen.getByText('Test Book 1')).toBeInTheDocument();
        expect(screen.getByText('Test Book 2')).toBeInTheDocument();
      });
  
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test Book 1' } });
  
      expect(screen.getByText('Test Book 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Book 2')).not.toBeInTheDocument();
    });
  
  });
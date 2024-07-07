import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useNavigate } from 'react-router-dom';
import Header from './Header';  // Adjust the import path as necessary
import { user_logout } from '../../redux/actions/userActions';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../redux/actions/userActions', () => ({
  user_logout: jest.fn(),
}));

const mockStore = configureStore([]);
const navigateMock = useNavigate();

describe('Header Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: { userId: 1, userName:'test' },
    });
  });


  it('does not render header when user is not logged in', () => {
    store = mockStore({
      user: { userId: 0 },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.queryByText('Online Bookstore')).not.toBeInTheDocument();
  });
});
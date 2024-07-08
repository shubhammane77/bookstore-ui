import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';  // Adjust the import path as necessary
import AuthContext from '../../AuthContext';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  let loginMock;

  beforeEach(() => {
    loginMock = jest.fn();
    render(
      <AuthContext.Provider value={{ login: loginMock }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  });

  it('renders login form', () => {
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('New User Registeration')).toBeInTheDocument();
  });

  it('allows user to enter username and password', () => {
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    expect(screen.getByPlaceholderText('Username').value).toBe('testuser');
    expect(screen.getByPlaceholderText('Password').value).toBe('password123');
  });

  it('calls login function and navigates to home on successful login', async () => {
    loginMock.mockResolvedValue({ errorMessage: null });

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Log In'));

    await screen.findByText('Log In');  // Wait for the component to update
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('shows an alert on failed login', async () => {
    window.alert = jest.fn();
    loginMock.mockResolvedValue({ errorMessage: 'Invalid credentials' });

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Log In'));

    await screen.findByText('Log In');  // Wait for the component to update
    expect(window.alert).toHaveBeenCalledWith('Login failed: Invalid credentials');
  });

  it('navigates to register page on clicking "New User Registration"', () => {
    fireEvent.click(screen.getByText('New User Registeration'));

    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });
});

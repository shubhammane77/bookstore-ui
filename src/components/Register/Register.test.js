import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';  // Adjust the import path as necessary
import AuthContext from '../../AuthContext';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Register Component', () => {
  let registerMock;

  beforeEach(() => {
    registerMock = jest.fn();
    render(
      <AuthContext.Provider value={{ register: registerMock }}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  });

  it('renders register form', () => {
    expect(screen.getByText('Register New User')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('allows user to enter username, password, and email address', () => {
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });

    expect(screen.getByPlaceholderText('Username').value).toBe('testuser');
    expect(screen.getByPlaceholderText('Password').value).toBe('password123');
    expect(screen.getByPlaceholderText('Email Address').value).toBe('test@example.com');
  });

  it('calls register function and navigates to login on successful registration', () => {
    registerMock.mockReturnValue(true);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Register'));

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('does not navigate on failed registration', () => {
    registerMock.mockReturnValue(false);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Register'));

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

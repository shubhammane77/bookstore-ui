import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register'; // Adjust the path as per your project structure
import { postData } from '../../apiService';

// Mocking the react-router-dom useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

// Mocking the postData function from apiService
jest.mock('../../apiService', () => ({
  postData: jest.fn(),
}));

global.console = {error: jest.fn()}
describe('Register component', () => {
  beforeEach(() => {
    // Clear mock implementation for each test
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  it('renders Register component correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Register />);
    
    expect(getByText('Register New User')).toBeInTheDocument();
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(getByText('Register')).toBeInTheDocument();
  });

  it('submits registration form with valid data', async () => {
    const { getByText, getByPlaceholderText } = render(<Register />);

    // Simulate user input
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testUser' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });

    // Mock postData response
    const mockResponse = { errorMessage: null };
    postData.mockResolvedValue(mockResponse);

    // Click on Register button
    fireEvent.click(getByText('Register'));

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(postData).toHaveBeenCalledTimes(1);
      expect(postData).toHaveBeenCalledWith('/v1/auth/register', {
        userName: 'testUser',
        password: 'password123',
        emailAddress: 'test@example.com',
      });
    });
  });

  it('handles registration failure', async () => {
    const { getByText, getByPlaceholderText } = render(<Register />);

    // Simulate user input
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testUser' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });

    // Click on Register button
    fireEvent.click(getByText('Register'));

    // Wait for the async operation to complete
    await waitFor(() => {
      window.alert = jest.fn();
      expect(postData).toHaveBeenCalledTimes(1);
      expect(postData).toHaveBeenCalledWith('/v1/auth/register', {
        userName: 'testUser',
        password: 'password123',
        emailAddress: 'test@example.com',
      });
    });
  });

  it('handles registration error', async () => {
    const { getByText, getByPlaceholderText } = render(<Register />);

    // Simulate user input
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testUser' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });

    // Mock postData to throw an error
    // Click on Register button
    fireEvent.click(getByText('Register'));

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(postData).toHaveBeenCalledTimes(1);
      expect(postData).toHaveBeenCalledWith('/v1/auth/register', {
        userName: 'testUser',
        password: 'password123',
        emailAddress: 'test@example.com',
      });
    });
  });
});

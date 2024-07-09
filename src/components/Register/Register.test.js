import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register'; // Adjust the path as per your project structure
import { postData } from '../../api/apiService';
import { REGISTER_USER_ENDPOINT } from '../../api/endpoints';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

// Mocking the postData function from apiService
jest.mock('../../api/apiService', () => ({
  postData: jest.fn(),
}));

global.console = { error: jest.fn() }
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
      expect(postData).toHaveBeenCalledWith(REGISTER_USER_ENDPOINT, {
        userName: 'testUser',
        password: 'password123',
        emailAddress: 'test@example.com',
      });
      expect(mockUsedNavigate).toHaveBeenCalledWith('/login')
    });
    });

    it('handles registration failure', async () => {
      const { getByText, getByPlaceholderText } = render(<Register />);

      // Simulate user input
      fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testUser' } });
      fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
      fireEvent.change(getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });
      const mockResponse = { errorMessage: 'User already exists' };
      postData.mockResolvedValue(mockResponse);

      // Click on Register button
      fireEvent.click(getByText('Register'));
      // Wait for the async operation to complete
      await waitFor(() => {
        window.alert = jest.fn();
         expect(mockUsedNavigate).not.toHaveBeenCalled()
      });
    });
    it('handles login navigation', async () => {
      const { getByText } = render(<Register />);
      fireEvent.click(getByText('Back To Login'));
      await waitFor(() => {
        expect(mockUsedNavigate).toHaveBeenCalledWith('/login')
      });
    });

  });
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from './Login'; // Adjust the path as per your project structure
import { postData } from '../../apiService';

// Mocking the react-router-dom useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mocking the postData function from apiService
jest.mock('../../apiService', () => ({
  postData: jest.fn(),
}));

// Mocking the useDispatch function from react-redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Login component', () => {
  beforeEach(() => {
    // Clear mock implementation for each test
    jest.clearAllMocks();
  });


  it('handles network error during login', async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    // Simulate user input
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testUser' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Mock postData to throw an error
    const error = new Error('Network Error');
    useDispatch.mockReturnValue(jest.fn());
    postData.mockRejectedValue(error);

    // Click on Log In button
    fireEvent.click(getByText('Log In'));

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(postData).toHaveBeenCalledTimes(1);
      expect(postData).toHaveBeenCalledWith('/v1/auth/login', {
        userName: 'testUser',
        password: 'password123',
      });
    });
  });


});

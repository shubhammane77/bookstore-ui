import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Login from './Login'; // Adjust the path as per your project structure
import { postData } from '../../api/apiService';
import { LOGIN_USER_ENDPOINT } from '../../api/endpoints';

// Mocking the react-router-dom useNavigate hook

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));
// Mocking the postData function from apiService
jest.mock('../../api/apiService', () => ({
  postData: jest.fn(),
}));

// Mocking the useDispatch function from react-redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

//
jest.mock('../../redux/actions/UserActions', () => ({
  user_login: jest.fn(),
}));
describe('Login component', () => {
  beforeEach(() => {
    window.alert = jest.fn();


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
      expect(postData).toHaveBeenCalledWith(LOGIN_USER_ENDPOINT, {
        userName: 'testUser',
        password: 'password123',
      });
      expect(window.alert).toHaveBeenCalled()
    });
  });


  it('handles valid login', async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    // Simulate user input
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testUser' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Mock postData to throw an error
    useDispatch.mockReturnValue(jest.fn());
    postData.mockReturnValue({
      userId: 1,
      jwtToken: 'Test',
      isSuccess: true,
      errorMessage: null
    });

    fireEvent.click(getByText('Log In'));
    // Wait for the async operation to complete
    await waitFor(() => {
      expect(postData).toHaveBeenCalledTimes(1);
      expect(postData).toHaveBeenCalledWith(LOGIN_USER_ENDPOINT, {
        userName: 'testUser',
        password: 'password123',
      });
      expect(useDispatch).toHaveBeenCalled();
    });
  });
  it('handles registration navigation', async () => {
    const { getByText } = render(<Login />);
    fireEvent.click(getByText('New User Registration'));
    await waitFor(() => {
      expect(mockUsedNavigate).toHaveBeenCalled();
    });
  });

});

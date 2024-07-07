import React, { createContext, useState } from 'react';
import { postData } from './apiService';
import { useSelector, useDispatch } from 'react-redux';
import { user_logout, user_login } from './redux/actions/userActions';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const user = useSelector(state => state.user); // Example selector from Redux store
    const dispatch = useDispatch(); // Example dispatch function from Redux store


    const login = async (username, password) => {
        const endpoint = `/v1/auth/login`;
        try {
            var request = { userName: username, password: password };
            const result = await postData(endpoint, request);
            if (result.errorMessage == null) {
                dispatch(user_login({ userId: result.userId, userName: username, token: result.jwtToken }));
            }

            return result;
        } catch (error) {
            console.error('Error while login...', error);
        }
    };
    const logout = () => {
        dispatch(user_logout());
    };

    const register = async (username, password, email) => {
        const endpoint = `/v1/auth/register`;
        try {
            var request = { userName: username, password: password, emailAddress: email };
            const result = await postData(endpoint, request);
            return result;
        } catch (error) {
            console.error('Error while login', error);
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

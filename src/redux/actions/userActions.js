import { LOGIN, LOGOUT } from "../constants/userActionTypes";

export const user_login = (auth) => {
    return {
        type: LOGIN,
        payload: auth,
    };
};

export const user_logout = () => {
    return {
        type: LOGOUT
    };
};

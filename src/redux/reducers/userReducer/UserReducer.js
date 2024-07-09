import { LOGIN, LOGOUT } from "../../constants/ActionTypes";

const initialState = {
    userId: 0,
    userName: '',
    token:''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, userId: action.payload.userId, userName:action.payload.userName, token: action.payload.token };
        case LOGOUT:
            return initialState;
        default:
            return state;

    }
};

export default userReducer;

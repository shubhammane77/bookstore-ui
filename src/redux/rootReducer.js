import { combineReducers } from "redux";
import shoppingCartReducer from "./reducers/shoppingCartReducer/ShoppingCartReducer";
import userReducer from "./reducers/userReducer/UserReducer";

const rootReducer = combineReducers({ shoppingCart : shoppingCartReducer, user: userReducer });

export default rootReducer;
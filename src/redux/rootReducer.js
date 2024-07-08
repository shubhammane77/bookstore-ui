import { combineReducers } from "redux";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import userReducer from "./reducers/UserReducer";

const rootReducer = combineReducers({ shoppingCart : shoppingCartReducer, user: userReducer });

export default rootReducer;
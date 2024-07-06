import { combineReducers } from "redux";
import shoppingCartReducer from "./reducers/shoppingCartReducer";

const rootReducer = combineReducers({ shoppingCart : shoppingCartReducer });

export default rootReducer;
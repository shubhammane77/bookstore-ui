import { combineReducers } from "redux";
import shoppingCartReducer from "./reducers/shoppingCartReducer";

const rootReducer = combineReducers({ task: shoppingCartReducer });

export default rootReducer;
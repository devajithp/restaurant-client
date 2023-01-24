import {combineReducers,applyMiddleware,createStore} from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';
import loadingReducer from "./reducers/loadingReducers";
import messageReducer from "./reducers/messageReducers";
import categoryReducer from "./reducers/categoryReducers";
import productReducer from "./reducers/productReducers";

import thunk from "redux-thunk"

const reducer= combineReducers({
 loading:loadingReducer,
 messages:messageReducer,
 categories:categoryReducer,
 products:productReducer


})
const initialState={

}
const middleware=[thunk]

const store= createStore(reducer,initialState,composeWithDevTools(
    applyMiddleware(...middleware)
    
  ))

export default store;
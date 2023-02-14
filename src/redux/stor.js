import { createStore, combineReducers } from "redux";

 
import phoneNumbersReducer from "./reduser/phoneNumbersReducer"
import categoriesReducers from "./reduser/categoriesReducer"
 

const rootReducer = combineReducers({
    categoriesState: categoriesReducers,
    phoneNumberState: phoneNumbersReducer
 })
 
const store=createStore(rootReducer)

export default store
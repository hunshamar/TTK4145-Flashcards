import { combineReducers } from "redux"
import authReducer from "./authReducer"
import cardReducer from "./cardReducer"

const rootReducer = combineReducers({
    authReducer,
    cardReducer
});

export default rootReducer
import { combineReducers } from "redux"
import authReducer from "./authReducer"
import cardReducer from "./cardReducer"

const rootReducer = combineReducers({
    auth: authReducer,
    card: cardReducer
});

export default rootReducer
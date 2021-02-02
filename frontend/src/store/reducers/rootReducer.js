import { combineReducers } from "redux"
import authReducer from "./authReducer"
import cardReducer from "./cardReducer"
import cardgroupReducer from "./cardgroupReducer"

const rootReducer = combineReducers({
    authReducer,
    cardReducer,
    cardgroupReducer
});

export default rootReducer
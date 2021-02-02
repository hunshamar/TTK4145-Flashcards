import { combineReducers } from "redux"
import authReducer from "./authReducer"
import cardReducer from "./cardReducer"
import cardgroupReducer from "./cardgroupReducer"
import alertReducer from './alertReducer';

const rootReducer = combineReducers({
    authReducer,
    cardReducer,
    cardgroupReducer,
    alertReducer
});

export default rootReducer
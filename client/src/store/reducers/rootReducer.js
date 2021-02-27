import { combineReducers } from "redux"
import authReducer from "./authReducer"
import cardReducer from "./cardReducer"
import cardgroupReducer from "./cardgroupReducer"
import alertReducer from './alertReducer';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    authReducer,
    cardReducer,
    cardgroupReducer,
    alertReducer,
    loadingReducer,
    userReducer
});

export default rootReducer
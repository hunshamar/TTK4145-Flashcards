import { combineReducers } from "redux"
import authReducer from "./authReducer"
import cardReducer from "./cardReducer"
import cardgroupReducer from "./cardgroupReducer"
import alertReducer from './alertReducer';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';
import ratingReducer from './ratingReducer';
import peerreviewReducer from './peerreviewReducer';
import studyReducer from "./studyReducer"
import userFlashcardDeckReducer from "./userFlashcardDeckReducer"

const rootReducer = combineReducers({
    authReducer,
    cardReducer,
    cardgroupReducer,
    alertReducer,
    loadingReducer,
    userReducer,
    ratingReducer,
    peerreviewReducer,
    studyReducer,
    userFlashcardDeckReducer
});

export default rootReducer
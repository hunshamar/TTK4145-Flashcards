
import { CREATE_RATING } from '../actionTypes';

const initState = {
    ratings: []
}

const ratingReducer = (state = initState, action) => {

    switch(action.type){
        case CREATE_RATING:
            console.log("rating", action)
            return {
                ...state, 
                ratings: [action.payload]
            }               
        default:
            console.log("default alert")
            return state
    }
}

export default ratingReducer
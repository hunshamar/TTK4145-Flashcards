
import { CREATE_RATING, LOAD_RATINGS  } from '../actionTypes';

const initState = {
    ratings: []
}

const ratingReducer = (state = initState, action) => {

    switch(action.type){
        case CREATE_RATING:
            
            console.log("savind", action.payload)
            /* Is in list */
            if (state.ratings.filter(rating => rating.id === action.payload.id).length > 0){
                console.log("IN ARR")
                console.log(state.ratings)
                console.log(
                    state.ratings.map(rating => {
                        if (rating.id === action.payload.id){
                            return action.payload
                        }
                        else{
                            return rating
                        }
                    })    
                )
                return{
                    ...state,
                    ratings: state.ratings.map(rating => {
                        if (rating.id === action.payload.id){
                            return action.payload
                        }
                        else{
                            return rating
                        }
                    })    
                }
            } else{
                console.log("NOT IN ARR")
                return{
                    ...state,
                    ratings: [...state.ratings, action.payload]
                }
            }

            

            return{
                ...state,
                ratings: state.ratings.map(rating => {
                    if (rating.id === action.payload.id){
                        return action.payload
                    }
                    else{
                        return rating
                    }
                })
            }
        
            return{
                ...state,
                ratings: [action.payload]
            }
        case LOAD_RATINGS:
            console.log("got ratings", action.payload)
            return{
                ...state,
                ratings: action.payload
            }
            
        default:
            console.log("default alert")
            return state
    }
}

export default ratingReducer
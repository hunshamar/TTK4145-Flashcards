import { LOAD_CARDREVIEW_DECK } from "../actionTypes"



const initState = {
    cardReviews: []
}

const studyReducer = (state = initState, action) => {

    switch(action.type){
        case LOAD_CARDREVIEW_DECK:
            console.log("successfull get", action.payload)
            return {
                ...state, 
                title: action.payload.title,
                cardReviews: action.payload.cardreviews
            }   
        default:
            console.log("default auth")
            return state
    }
}

export default studyReducer
import { LOAD_CARDREVIEW_DECK , LOAD_CARDREVIEWS } from "../actionTypes"



const initState = {
    cardreviews: []
}

const studyReducer = (state = initState, action) => {

    switch(action.type){
        case LOAD_CARDREVIEW_DECK:
            console.log("successfull get", action.payload)
            return {
                ...state, 
                title: action.payload.title,
                cardreviews: action.payload.cardreviews
            }   
        
        case LOAD_CARDREVIEWS:
            return {
                ...state,
                cardreviews: action.payload
            }
        
        default:
            console.log("default auth")
            return state
    }
}

export default studyReducer
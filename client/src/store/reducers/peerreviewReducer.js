import { CREATE_PEERREVIEW, LOAD_PEERREVIEWS } from "../actionTypes"



const initState = {
    peerreviews: [
       
    ]
}

const peerreviewReducer = (state = initState, action) => {
    switch(action.type) {
        case CREATE_PEERREVIEW:        
            return { 
                ...state,
                peerreviews: [...state.peerreviews, action.payload]
            }
        case LOAD_PEERREVIEWS:
            console.log("got peerreviews", action.payload)
            console.log({...state, cardgroups: action.payload})
            return {
                ...state, 
                peerreviews: action.payload
            }
            // return state;   
            // return state;       
        
        default:
            return state;
    }
}

export default peerreviewReducer
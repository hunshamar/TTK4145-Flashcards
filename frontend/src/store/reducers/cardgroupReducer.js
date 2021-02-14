
import { CREATE_CARDGROUP, CREATE_CARDGROUP_ERROR, DELETE_CARDGROUP, LOAD_CARDGROUPS, DELETE_CARDGROUP_ERROR, LOAD_CARDGROUP } from '../actionTypes';

const initState = {
    cardgroups: [
       
    ]
}

const cardgroupReducer = (state = initState, action) => {
    switch(action.type) {
        case CREATE_CARDGROUP:
            console.log("created cardgroup", action.createdCardgroup)

            console.log(state)
            console.log({ 
                ...state,
                cardgroups: [...state.cardgroups, action.createdCardgroup]                
            })

            return { 
                ...state,
                cardgroups: [...state.cardgroups, action.createdCardgroup]
            }
        case CREATE_CARDGROUP_ERROR:
            return state
        case LOAD_CARDGROUPS:
            console.log("got cardgroups", action.cardgroups)
            console.log({...state, cardgroups: action.cardgroups})
            return {
                ...state, 
                cardgroups: action.cardgroups
            }
        case LOAD_CARDGROUP:
            console.log("cardgroup", action.cardgroup)
            return{
                ...state,
                cardgroups: action.payload
            }

        case DELETE_CARDGROUP:
            console.log("deleting cardgroup")
            console.log(state.cardgroups)
            console.log(state.cardgroups.filter(cardgroup => cardgroup.id !== action.cardgroup.id))
           

            return { 
                ...state,
                cardgroups: state.cardgroups.filter((cardgroup) => cardgroup.id !== action.cardgroup.id),
            }
            // return state;
        
        case DELETE_CARDGROUP_ERROR:
            return state;
        
        default:
            return state;
    }
}

export default cardgroupReducer
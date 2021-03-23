
import { CREATE_CARDGROUP, CREATE_CARDGROUP_ERROR, DELETE_CARDGROUP, LOAD_CARDGROUPS, DELETE_CARDGROUP_ERROR, EDIT_CARDGROUP, LOAD_CARDGROUP } from '../actionTypes';

const initState = {
    success: null,
    cardgroups: [
       
    ]
}

const cardgroupReducer = (state = initState, action) => {
    switch(action.type) {
        case CREATE_CARDGROUP:
            console.log("created cardgroup", action.payload)

            console.log(state)
            console.log({ 
                ...state,
                cardgroups: [...state.cardgroups, action.payload]   
            })

            return { 
                ...state,
                cardgroups: [...state.cardgroups, action.payload]
            }
        case CREATE_CARDGROUP_ERROR:
            return state
        case LOAD_CARDGROUPS:
            console.log("got cardgroups", action.payload)
            console.log({...state, cardgroups: action.payload})
            return {
                ...state, 
                cardgroups: action.payload
            }
        case LOAD_CARDGROUP:
            console.log("cardgroup", action.payload)
            return{
                ...state,
                cardgroups: action.payload
            }

        case EDIT_CARDGROUP:
            console.log("edit")
            return{
                ...state,
                cardgroups: state.cardgroups.map(group => {
                    if (group.id === action.payload.id){
                        return action.payload
                    }
                    else{
                        return group
                    }
                })    
            }

        case DELETE_CARDGROUP:
            console.log("deleting cardgroup")
            console.log(state.cardgroups)
            console.log(state.cardgroups.filter(cardgroup => cardgroup.id !== action.payload.id))
           

            return { 
                ...state,
                cardgroups: state.cardgroups.filter((cardgroup) => cardgroup.id !== action.payload.id),
            }
            // return state;
        
        case DELETE_CARDGROUP_ERROR:
            return state;
        
        default:
            return state;
    }
}

export default cardgroupReducer
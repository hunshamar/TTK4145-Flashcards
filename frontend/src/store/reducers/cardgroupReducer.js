
const initState = {
    cardgroups: [
       
    ]
}

const cardgroupReducer = (state = initState, action) => {
    switch(action.type) {
        case "CREATE_CARDGROUP":
            console.log("created cardgroup", action.createdCardgroup)
            // alert(action.err)

            console.log(state)
            console.log({ 
                ...state,
                cardgroups: [...state.cardgroups, action.createdCardgroup]                
            })

            return { 
                ...state,
                cardgroups: [...state.cardgroups, action.createdCardgroup]
            }
        case "CREATE_CARDGROUP_ERROR":
            return state
        case "LOAD_CARDGROUPS":
            console.log("got them cardgroups", action.cardgroups)
            console.log({...state, cardgroups: action.cardgroups})
            return {
                ...state, 
                cardgroups: action.cardgroups
            }
        case "DELETE_CARDGROUP":
            console.log("deleting dem cards")
            console.log(state.cardgroups)
            console.log(state.cardgroups.filter(cardgroup => cardgroup.id !== action.cardgroup.id))
           

            return { 
                ...state,
                cards: state.cardgroups.filter((cardgroup) => cardgroup.id !== action.cardgroup.id),
            }
            // return state;
        
        case "DELETE_CARDGROUP_ERROR":
            return state;
        
        default:
            return state;
    }
}

export default cardgroupReducer

const initState = {
    alert: {},
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
                cardgroups: [...state.cardgroups, action.createdCardgroup],
                alert: {success: "Successfully created cardgroup with id "+action.createdCardgroup.id},
            })

            return { 
                ...state,
                cardgroups: [...state.cardgroups, action.createdCardgroup],
                alert: {success: "Successfully created cardgroup with id "+action.createdCardgroup.id},
            }
        case "CREATE_CARDGROUP_ERROR":
            return { 
                ...state,
                alert: {error: "Error creating cardgroup: "+action.err},

            }
            return state;
        case "LOAD_CARDGROUPS":
            console.log("got them cardgroups", action.cardgroups)
            console.log({...state, cardgroups: action.cardgroups})
            return {
                ...state, 
                cardgroups: action.cardgroups,
                alert: {}
            }
        // case "DELETE_CARD":
        //     console.log("deleting dem cards")
        //     console.log(state.cards)
        //     console.log(state.cards.filter(card => card.id !== action.card.id))
           

        //     return { 
        //         ...state,
        //         cards: state.cards.filter((card) => card.id !== action.card.id),
        //         alert: {success: "Successfully deleted card with id "+action.card.id}
        //     }
        //     // return state;
        
        // case "DELETE_CARD_ERROR":
        //     return { 
        //         ...state,
        //         alert: {error: "Could not delete card with id "+action.card.id}
        //     }
            // return state
        
        default:
            return state;
    }
}

export default cardgroupReducer
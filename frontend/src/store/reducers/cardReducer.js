
const initState = {
    cards: [
        {id: "1", title: "myCard1", content: "ja bla bla"},
        {id: "2", title: "myCard2", content: "bla ja bla"},
        {id: "3", title: "myCard3", content: "bla bla ja"},
    ]
}

const cardReducer = (state = initState, action) => {
    switch(action.type) {
        case "CREATE_CARD":
            console.log("created card", action.card)
            return state;
        case "CREATE_CARD_ERROR":
            console.log("created card error", action.err)
            return state;
        case "FETCH_CARD_SUCCES":
            console.log("got them cards", action.cards)
            return {cards: action.cards}
        default:
            return state;
    }
    return state
}

export default cardReducer
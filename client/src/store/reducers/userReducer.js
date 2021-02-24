import { GET_USERS, GET_DELIVERY_STATUS } from "../actionTypes"



const initState = {
    users: [],
    status: []
}

const userReducer = (state = initState, action) => {

    switch(action.type){
        case GET_USERS:
            console.log("successfull get users")
            return {
                ...state, 
                users: action.payload
            }   
        case GET_DELIVERY_STATUS:
            console.log("successfull get status")
            return{
                ...state,
                status: action.payload
            }
            
        default:
            console.log("default auth")
            return state
    }
}

export default userReducer
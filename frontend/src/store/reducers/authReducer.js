import { LOG_IN_CALLBACK, LOG_IN_STATUS, LOG_OUT } from "../actionTypes"



const initState = {
    loggedIn: false,
    loading: true,
    loggedInUser: {}
}

const authReducer = (state = initState, action) => {

    switch(action.type){
        case LOG_IN_CALLBACK:
            console.log("successfull login callback")
            return {
                ...state, 
                loggedIn: action.loggedIn
            }
        
        case LOG_OUT:
            console.log("logging out")
            return {
                ...state,
                loggedIn: action.loggedIn
            }
        case LOG_IN_STATUS:
            console.log("fetching status")
            console.log(action.state)
            return action.state

        default:
            console.log("default auth")
            return state
    }
}

export default authReducer
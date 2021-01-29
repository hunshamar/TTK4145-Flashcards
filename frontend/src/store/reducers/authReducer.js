


const initState = {
    loggedIn: false
}

const authReducer = (state = initState, action) => {

    switch(action.type){
        case "LOG_IN_CALLBACK":
            console.log("successfull login callback")
            return {
                ...state, 
                loggedIn: true
            }
        
        case "LOG_OUT":
            console.log("logging out mimi")
            return {
                ...state,
                loggedIn: false
            }

        default:
            console.log("default auth")
            return state
    }
}

export default authReducer
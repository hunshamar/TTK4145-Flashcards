
import { SET_ALERT, CLEAR_ALERT } from '../actionTypes';

const initState = {
    newAlert: false,
    severity: "",
    text: ""
}

const alertReducer = (state = initState, action) => {

    switch(action.type){
        case SET_ALERT:
            console.log("Alert", action)
            return {
                severity: action.payload.severity,
                text: action.payload.text,
                newAlert: true,
            }           
        case CLEAR_ALERT:  
            return {
                ...state,
                newAlert: false,
            }
            
        default:
            console.log("default alert")
            return state
    }
}

export default alertReducer
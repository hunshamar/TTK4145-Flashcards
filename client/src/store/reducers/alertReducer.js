
import { SET_ALERT } from '../actionTypes';

const initState = {
    severity: "",
    text: ""
}

const alertReducer = (state = initState, action) => {

    switch(action.type){
        case SET_ALERT:
            console.log("Alert", action)
            return {
                severity: action.payload.severity,
                text: action.payload.text
            }               
        default:
            console.log("default alert")
            return state
    }
}

export default alertReducer
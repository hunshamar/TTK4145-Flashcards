
import { SET_ALERT } from '../actionTypes';

const initState = {
    alert: {}
}

const alertReducer = (state = initState, action) => {

    switch(action.type){
        case SET_ALERT:
            console.log("Alert", action.alert)
            return {
                ...state,
                alert: {
                    severity: action.alert.severity,
                    text: action.alert.text
                }
            }       
        
        default:
            console.log("default alert")
            return state
    }
}

export default alertReducer
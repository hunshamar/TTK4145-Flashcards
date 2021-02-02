
const initState = {
    alert: {}
}

const alertReducer = (state = initState, action) => {

    switch(action.type){
        case "ALERT":
            console.log("lalala mamamam")
            console.log("Alert1", action.alert)
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
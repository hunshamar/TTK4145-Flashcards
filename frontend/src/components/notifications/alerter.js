
import React, {useEffect} from "react"
import { Alert } from '@material-ui/lab/';
import alertReducer from '../../store/reducers/alertReducer';
import { useSelector } from 'react-redux';
import {Fade} from '@material-ui/core';


const Alerter = () => {

    const alert = useSelector(state => state.alertReducer.alert)
    
    console.log("allleerrtt")
    console.log(alert)
    const [open, setOpen] = React.useState(true);
    
    // useEffect(() => {
    //     if (alert){

    //     }
    // }, [alert])

    return(
        <React.Fragment>


        {alert.text ? 
            <Alert severity={alert.severity}>{alert.text}</Alert>
            :
            <React.Fragment></React.Fragment>
        }

        </React.Fragment>
    )
}

export default Alerter
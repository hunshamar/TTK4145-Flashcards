
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
    
    useEffect(() => {
        
    }, [alert])

    return(
        <React.Fragment>

        <Fade in={open} eixt={3000}>

        {alert.text ? 
            <Alert severity={alert.severity}>{alert.text}</Alert>
            :
            <Alert severity="info">fade</Alert>
        }

        </Fade>
        </React.Fragment>
    )
}

export default Alerter
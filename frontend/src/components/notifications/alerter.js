
import React, {useEffect} from "react"
import { Alert } from '@material-ui/lab/';
import alertReducer from '../../store/reducers/alertReducer';
import { useSelector } from 'react-redux';
import {Fade} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';



const Alerter = () => {

    const alert = useSelector(state => state.alertReducer.alert)
    const [calert, setCalert] = React.useState(alert.text)
    
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    return(

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>

            <Alert 
                onClose={handleClose}
                style={{}}
                severity={alert.severity}
            >{alert.text}
            </Alert>
            :
            <React.Fragment></React.Fragment>
        

    </Snackbar>
    )
}

export default Alerter
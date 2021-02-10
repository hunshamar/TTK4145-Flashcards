
import React, {useEffect} from "react"
import {Alert} from '@material-ui/lab/';
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

    useEffect(() => {
      if (alert.text){
        setOpen(true)
      }
    }, [alert])
  
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
                severity={alert.severity}
            >{alert.text}
            </Alert>                
      </Snackbar>
    )
}

export default Alerter

import React, {useEffect} from "react"
import {Alert} from '@material-ui/lab/';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch } from 'react-redux';
import { CLEAR_ALERT } from "../../store/actionTypes";



const Alerter = () => {

    const severity = useSelector(state => state.alertReducer.severity)
    const text = useSelector(state => state.alertReducer.text)
    const newAlert = useSelector(state => state.alertReducer.newAlert)
    
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
      if (newAlert){
        setOpen(true)
        dispatch({type: CLEAR_ALERT})
      }
    }, [newAlert])
  
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
                severity={severity}
            >{text}
            </Alert>                
      </Snackbar>
    )
}

export default Alerter
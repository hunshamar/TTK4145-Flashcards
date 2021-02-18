
import React, {useEffect} from "react"
import {Alert} from '@material-ui/lab/';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';



const Alerter = () => {

    const alert = useSelector(state => state.alertReducer.alert)
    
    const [open, setOpen] = React.useState(false);

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
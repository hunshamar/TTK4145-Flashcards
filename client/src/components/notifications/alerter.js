
import React, {useEffect} from "react"
import {Alert} from '@material-ui/lab/';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';



const Alerter = () => {

    const severity = useSelector(state => state.alertReducer.severity)
    const text = useSelector(state => state.alertReducer.text)
    
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
      if (text){
        setOpen(true)
      }
    }, [text])
  
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
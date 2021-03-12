
import { Button, 
    Grid, 
    TextField,
    Dialog,
    Typography,
    makeStyles
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  

import React, { useState } from 'react';


import { addCardgroup } from '../../store/actions/cardgroupActions';
import {  useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ConfirmDialog from "./confirmDialog"
import { useSelector } from 'react-redux';
import CardgroupSelect from '../submodules/cardgroupselect';
import { createPeerreviews } from '../../store/actions/peerreviewActions';

const useStyles = makeStyles(theme => ({
    dialog: {
        "& .MuiDialog-paperScrollPaper": {
            maxHeight: "100vh",
        },
    }
}))

const CreatePeerreview = (props) => {
    const { onClose, selectedValue, open } = props;
    const dispatch = useDispatch();    
    
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [numberOfReviews, setNumberOfReviews] = useState(0)
    const [time, setTime] = useState("23:59")
    const formSubmitCallback = useSelector(state => state.alertReducer.severity)
    const newStatus = useSelector(state => state.alertReducer.newAlert)

    const [groupId, setGroupId] = useState(0)

    const classes = useStyles()



    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    useEffect(() => {
        console.log("stformSubmitCallback")
        if (formSubmitCallback==="success"){
            handleClose()
        }

    },[newStatus])

    const submit = e => {
        e.preventDefault()        

      


        if (groupId && selectedDate && numberOfReviews && time){

            console.log("herfra")
            let dueDate = selectedDate

            dueDate.setMinutes(time.split(":")[1])
            dueDate.setHours(time.split(":")[0])


            dispatch(createPeerreviews({groupId, dueDate, numberOfReviews        
            }))              
        }
        else{
        }
    }


    const handleClose = () => {
        setSelectedDate(null)
        setGroupId(0)
        setNumberOfReviews(0)
        setTime("23:59")      
        onClose(selectedValue);
    };
    
    return (
      <Dialog onClose={handleClose} 
        className={classes.dialog}

       open={open} style={{ margin: "100px"}}>
          <ConfirmDialog></ConfirmDialog>
            
            <div style={{margin: "40px 40px"}}> 

            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Typography variant="h6" align="left" > Add Peer Review Session for Students </Typography>
                    <Typography variant="body2" align="left" color="textSecondary" > This will generate peer review sessions for all students for the choosen cardgroup. 
                    Each student will get n number of cards to rate before the due date.  
                     </Typography>
                </Grid>
            </Grid>


            <form onSubmit={submit} >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>                
                    <CardgroupSelect onChange={setGroupId}/>
                </Grid>



                <Grid item xs={12}>
                <TextField
                    fullWidth
                    color="secondary"
                    id="outlined-number"
                    label="Number of flashcards for delivery pr student"
                    type="number"
                    required
                    onChange={e => setNumberOfReviews(e.target.value)} 
                    variant="outlined"
                />
                </Grid>

                <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        fullWidth
                        disableToolbar         
                        required    
                        inputVariant="outlined"           
                        variant="outlined"
                        format="MM/dd/yyyy"
                        // margin="normal"
                        id="date-picker-inline"
                        label="Due date for delivery"
                        value={selectedDate}
                        
                        onChange={handleDateChange}
                        onClick={console.log("close")}
                        color="secondary"
                        autoOk
                        animateYearScrolling
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />                 
                </MuiPickersUtilsProvider>                   

                    </Grid>
                    <Grid item xs={6} >

                    <TextField
                            fullWidth
                            id="time"
                            label=""
                            type="time"
                            variant="outlined"
                            onChange = {e => setTime(e.target.value)}
                            defaultValue="23:59"
                            color="secondary"
                            InputLabelProps={{
                                shrink: true,
                                }}
                            // inputProps={{
                            //     step: 1440, // 5 min
                            // }}
                          />
                    </Grid>


               

                
                <Grid item xs={6}>
                    <Button variant="contained" onClick={handleClose} fullWidth color="primary"  > Back</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button type="submit" fullWidth style={{backgroundColor: (groupId && numberOfReviews && selectedDate) ? "green" : "grey", color: "white"}}>Submit</Button>
                </Grid>

                </Grid>
                </form>


                </div>
      </Dialog>
    );
}
  
export default CreatePeerreview


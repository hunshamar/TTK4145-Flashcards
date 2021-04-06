
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


import { addCardgroup, editCardgroup } from '../../store/actions/cardgroupActions';
import {  useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ConfirmDialog from "./confirmDialog"
import { useSelector } from 'react-redux';
import { dateJSONToString } from '../../utils/datehandling';
import { setDate } from 'date-fns';

const useStyles = makeStyles(theme => ({
    dialog: {
        "& .MuiDialog-paperScrollPaper": {
            maxHeight: "100vh",
        },
    }
}))

const CreateCardGroup = ({ onClose, selectedValue, open, toeditCardgroup }) => {
    const dispatch = useDispatch();    
    
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [title, setTitle] = useState("");
    const [numberOfCards, setNumberOfCards] = useState(null)
    const [time, setTime] = useState("23:59")
    const formSubmitCallback = useSelector(state => state.alertReducer.severity)
    const newStatus = useSelector(state => state.alertReducer.newAlert)

    const classes = useStyles()

    useEffect(() => {
        console.log("starting")
        if(toeditCardgroup){
            setTitle(toeditCardgroup.title)
            setNumberOfCards(toeditCardgroup.numberOfCardsDue)
            let d = new Date(toeditCardgroup.dueDate)
            setSelectedDate(d)
            console.log("æ",d.getHours()+":"+ String(d.getMinutes()).padStart(2, "0"))            
            setTime( String(d.getHours()).padStart(2, "0")+":"+ String(d.getMinutes()).padStart(2, "0") )

        }
    }, [open])

    // remove
    console.log(selectedDate)

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
        let dueDate = selectedDate

        dueDate.setMinutes(time.split(":")[1])
        dueDate.setHours(time.split(":")[0])



        if (title && selectedDate && numberOfCards && time){


            if (toeditCardgroup){
                dispatch(editCardgroup({
                    id: toeditCardgroup.id,
                    title: title,        
                    dueDate: dueDate,
                    numberOfCardsDue: numberOfCards        
                }))              
    
            } else {       

                dispatch(addCardgroup({
                    title: title,        
                    dueDate: dueDate,
                    numberOfCardsDue: numberOfCards        
                }))              
            }
        }
        else{
            alert("Fill inn all fields")
        }
    }


    const handleClose = () => {
        setSelectedDate(null)
        setTitle("")
        setNumberOfCards(0)
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
                    <Typography variant="h6" align="left" > {toeditCardgroup ? "Edit Cardgroup" : "New Cardgroup" } </Typography>
                </Grid>
            </Grid>


            <form onSubmit={submit} >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        color="secondary"
                        onChange={e => setTitle(e.target.value)} 
                        fullWidth 
                        required 
                        value={title}
                        variant="outlined" 
                        label="Cardgroup title"/>
                </Grid>

                <Grid item xs={12}>
                <TextField
                    fullWidth
                    color="secondary"
                    id="outlined-number"
                    label="Number of flashcards for delivery pr student"
                    type="number"
                    value={numberOfCards}
                    required
                    onChange={e => setNumberOfCards(e.target.value)} 
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
                            value={time}
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
                    <Button type="submit" fullWidth style={{backgroundColor: selectedDate && title && numberOfCards ? "green" : "grey", color: "white"}}>{toeditCardgroup ? "Submit Edit" : "Submit"}</Button>
                </Grid>

                </Grid>
                </form>


                </div>
      </Dialog>
    );
}
  
export default CreateCardGroup


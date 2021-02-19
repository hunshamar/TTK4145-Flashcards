
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

const useStyles = makeStyles(theme => ({
    dialog: {
        "& .MuiDialog-paperScrollPaper": {
            maxHeight: "100vh",
        },
    }
}))

const CreateCardGroup = (props) => {
    const { onClose, selectedValue, open } = props;
    const dispatch = useDispatch();    
    
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [title, setTitle] = useState("");
    const [numberOfCards, setNumberOfCards] = useState(0)
    const [time, setTime] = useState("23:59")

    const classes = useStyles()



    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    useEffect(() => {
        console.log(time)
    },[time])

    const submit = e => {
        e.preventDefault()        

      


        if (title && selectedDate && numberOfCards && time){
            console.log(selectedDate)

            let year = selectedDate.getFullYear()
            let month = selectedDate.getMonth()+1
            let date = selectedDate.getDate()
            let hour = time.split(":")[0]
            let minute = time.split(":")[1]
            let second = 59

            dispatch(addCardgroup({
                title: title,        
                dueDate: {
                    year,
                    month,
                    date,
                    hour,
                    minute,
                    second
                },
                numberOfCardsDue: numberOfCards        
            }))         
            handleClose()            
        }
        else{
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
                    <Typography variant="h6" align="left" >New Cardgroup</Typography>
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
                    <Button type="submit" fullWidth style={{backgroundColor: selectedDate && title && numberOfCards ? "green" : "grey", color: "white"}}>Submit</Button>
                </Grid>

                </Grid>
                </form>


                </div>
      </Dialog>
    );
}
  
export default CreateCardGroup


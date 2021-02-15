
import { Button, 
    Grid, 
    Card, 
    IconButton, 
    TextField,
    Dialog,
    Typography,
    makeStyles
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  
  import CloseIcon from '@material-ui/icons/Close';

import React, { useState } from 'react';
import axios from 'axios';


import { addCardgroup, loadCardgroups, deleteCardgroup } from '../../store/actions/cardgroupActions';
import { connect, useDispatch } from 'react-redux';
import {Alert} from '@material-ui/lab/';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import GroupView from '../submodules/groupview';
import ConfirmDialog from "./confirmDialog"
import { addCard, editCard, loadCard } from '../../store/actions/cardActions';
import cardReducer from '../../store/reducers/cardReducer';

const useStyles = makeStyles(theme => ({
    dialog: {
        "& .MuiDialog-paperScrollPaper": {
            maxHeight: "100vh",
        },
    }
}))

const FlashcardForm = (props) => {
    const { onClose, selectedValue, open } = props;
    const dispatch = useDispatch();    
    const classes = useStyles()
    const cardgroupId = props.cardgroupId

    const [front, setFront] = useState("")
    const [back, setBack] = useState("")
    const [cardId, setCardId] = useState(-1)

    // const card = useSelector(state => state.cardReducer.cards)
    

    
    useEffect(() => {
        if (props.card){
            console.log("cccc", props.card)
            setFront(props.card.front)
            setBack(props.card.back)
        }
    }, [props.card])
    

   

    const submit = e => {
        e.preventDefault()
        console.log("id", cardgroupId)
        
        if (front && back && cardgroupId){
            
            if (props.card){
             dispatch(editCard({
                front: front,
                back: back,
                cardgroupid: cardgroupId,
                id: props.card.id
                }))
            }
            else {
                dispatch(addCard({
                    front: front,
                    back: back,
                    cardgroupid: cardgroupId
                    }))
            }
            

            handleClose()
            
        }
        else{
            alert("fill inn all fields")
            console.log(front, back, cardgroupId)
        }
    }

    const handleClose = () => {

        onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    // return 

    return (
      <Dialog onClose={handleClose} 
        className={classes.dialog}

       open={open} >

        <form onSubmit={submit} style={{margin: "40px"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>

                    <Typography variant="h5">Edit a flashcard </Typography>
                </Grid>
                {/* <Grid item xs={12}>
                    <CardgroupSelect onChange={e => setCardgroupid(e)} />
                </Grid> */}
                <Grid item xs={12}>
                    <TextField 
                        onChange={e => setFront(e.target.value)} 
                        fullWidth 
                        required 
                        variant="outlined"
                        color="secondary"
                        label="Front"
                        value={front}
                        multiline
                        rows={4}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        onChange={e => setBack(e.target.value)}
                        id="asd"
                        label="Back"
                        color="secondary"
                        multiline
                        rows={4}
                        defaultValue=""
                        value={back}
                        fullWidth
                        required
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                <Button type="submit" fullWidth style={{backgroundColor: front && back ? "green" : "grey", color: "white"}}>{props.card ? "edit" : "submit"}</Button>
                
                </Grid>

            </Grid>
                </form>

        

      </Dialog>
    );
}

export default FlashcardForm
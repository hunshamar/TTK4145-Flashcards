
import { useState } from 'react';
import { Button, Card, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import {connect, useDispatch, useSelector, shallowEqual} from "react-redux"
import { useEffect } from 'react';
import { Grid } from '@material-ui/core/';
import {  Alert } from '@material-ui/lab/';
import axios from "axios"
import {compose} from "redux"
import { fetchCards, loadCards, deleteCard, addCard } from '../../store/actions/cardActions';
import cardReducer from '../../store/reducers/cardReducer';
import { Link } from 'react-router-dom';
import FlashcardForm from '../dialogs/flashcardForm';
import CreateCardGroup from '../dialogs/createCardGroup';



const CardView = props => {

    const dispatch = useDispatch();
    const cardAlert = useSelector(state => state.cardReducer.alert)
    const [editCard, setEditCard] = useState({})
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = (value) => {
        setOpen(false);
      };


    const deleteThisCard = card => {     
        dispatch(deleteCard(card))   
    }

    
    const editThisCard = card => {
        console.log("edit", card)
        setEditCard(card)    
        handleClickOpen()
    }

    
    let cardItems = []
    props.cards.map((card, index) => (

        
        cardItems[index] = 

        <Card key={card.id} style={{padding: "10px", width:"100%", margin:"5px"}}>
        <Grid container spacing={0}> 
                <Grid item xs={11}>
                    <Typography variant="h6" >
                        Front:
                    </Typography>
                    <Typography variant="body1" >
                        {card.front}
                    </Typography>
                    <Typography variant="h6" >
                        Back:
                    </Typography>
                    <Typography variant="body1" >
                        {card.back}
                    </Typography>
                </Grid>
                <Grid item xs={1} style={{padding: "auto"}} >
                    <IconButton onClick = {() => editThisCard(card)}> 
                        <EditIcon style={{fontSize: "20px"}} /> 
                    </IconButton>
                    <IconButton onClick = {() => deleteThisCard(card)}> 
                        <DeleteIcon style={{fontSize: "20px"}} /> 
                    </IconButton>
            </Grid>
            
            </Grid>
        </Card>))
    

  
    return (
        
        <div>
            {editCard ? 
            <FlashcardForm open={open} onClose={handleClose} cardgroupId={1} card={editCard}  />
            : <div> </div> }
            
            
            {cardItems.length ? 
            
            <Grid container spacing={2}> 
             {cardItems} 
            </Grid>
            
            : 
            <div style={{color: "grey", marginTop: "150px"}}>
                <Typography variant="h5">No cards</Typography>
                <Typography variant="body1">Add cards using the <i>Add Flashcard</i> button</Typography>
            </div>}
            
            
        </div>
    )
}

export default CardView
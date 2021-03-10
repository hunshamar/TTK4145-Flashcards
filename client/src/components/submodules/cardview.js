
import { useState } from 'react';
import { Card, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { useDispatch, useSelector} from "react-redux"
import { Grid } from '@material-ui/core/';
import { deleteCard } from '../../store/actions/cardActions';
import FlashcardForm from '../dialogs/flashcardForm';
import loadingReducer from '../../store/reducers/loadingReducer';
import Loading from '../notifications/loading';


const CardView = props => {

    const dispatch = useDispatch();
    const [editCard, setEditCard] = useState({})
    const [open, setOpen] = useState(false);
    const loading = useSelector(state => state.loadingReducer.loading)

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
    console.log("car1ds", props.cards)
    
    let cardItems = []
    if (props.cards.length){
    props.cards.map((card, index) => (        
        cardItems[index] = 
        <Grid item xs={12}>
        <Card key={card.id} style={{padding: "10px", margin: "5px"}}>
        <Grid container spacing={0}> 
            <Grid item xs={11}>
                <Typography variant="subtitle2" >
                    Front:
                </Typography>
                <Typography variant="caption" >
                    {card.front}
                </Typography>
                <Typography variant="subtitle2" >
                    Back:
                </Typography>
                <Typography variant="caption" >
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
    </Card>
    
    </Grid>))
    }

    
    if (loading){
        return <Loading />
    }

    return (
        
        <div>
            {editCard ? 
            <FlashcardForm open={open} onClose={handleClose} cardgroupId={1} card={editCard}  />
            : <div> </div> }
            
            
            {cardItems.length ? 
            
            <Grid container spacing={0}> 
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
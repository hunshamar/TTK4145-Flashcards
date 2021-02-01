
import { useState } from 'react';
import { Button, Card, IconButton } from '@material-ui/core';
import {connect, useDispatch, useSelector, shallowEqual} from "react-redux"
import { useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Alert } from '@material-ui/core/';
import axios from "axios"
import {compose} from "redux"
import { fetchCards, loadCards, deleteCard, addCard } from '../store/actions/cardActions';
import cardReducer from '../store/reducers/cardReducer';


const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad"

const ShowCards = props => {

    const cards = useSelector(state => state.cardReducer.cards)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(loadCards())
    }, [])   



    const deleteThisCard = card => {
        dispatch(deleteCard(card))   
        
    }
    
  
   
    // console.log(cards)

    return (
        
        <div>
            {cards && cards.map((card) => (
                <Card key={card.id} style={{margin: "20px", width: "400px", padding: "10px"}}>
                    <Grid container spacing={0}> 
                        <Grid item xs={11}>

                            <div style={{fontWeight: "bold"}}>Creator: {card.user.name}</div>
                            <div style={{fontWeight: "bold"}}>id: {card.id}</div>
                            <div style={{textDecoration: "underline"}}>title: {card.title}</div>
                            <div style={{color: "#555555"}}>content: {card.content}</div>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick = {() => deleteThisCard(card)}> 
                                <DeleteIcon style={{fontSize: "20px"}} /> 
                            </IconButton>
                    </Grid>
                    </Grid>
                </Card>
            ))}
            
            
        </div>
    )
}

// const mapStateToProps = state => {
//     return{
//         cards: state.cards
//     }
// }

// // const mapDispatchToProps = dispatch => {
// //     return{
// //         fetchCards: () => dispatch(fetchCards)
// //     }
// // }

// export default connect(mapStateToProps, mapDispatchToProps)(ShowCards)

export default ShowCards
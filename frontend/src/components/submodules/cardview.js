
import { useState } from 'react';
import { Button, Card, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import {connect, useDispatch, useSelector, shallowEqual} from "react-redux"
import { useEffect } from 'react';
import { Grid, Link } from '@material-ui/core/';
import {  Alert } from '@material-ui/lab/';
import axios from "axios"
import {compose} from "redux"
import { fetchCards, loadCards, deleteCard, addCard } from '../../store/actions/cardActions';
import cardReducer from '../../store/reducers/cardReducer';



const CardView = props => {

    const dispatch = useDispatch();
    const cardAlert = useSelector(state => state.cardReducer.alert)

    



    const deleteThisCard = card => {
        dispatch(deleteCard(card))   
    }
    
    let cardItems = []

    props.cards.map((card, index) => (

        
        cardItems[index] = 

        <Card key={card.id} style={{margin: "20px", width: "400px", padding: "10px"}}>
            <Grid container spacing={0}> 
                <Grid item xs={11}>

                    <div style={{fontWeight: "bold"}}>Creator: {card.user.name}</div>
                    <div style={{fontWeight: "bold"}}>id: {card.id}</div>
                    <div style={{textDecoration: "underline"}}>front: {card.front}</div>
                    <div style={{color: "#555555"}}>back: {card.back}</div>
                    <div style={{color: "#555555"}}>cardgroup: {card.cardgroup.title}</div>
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick = {() => deleteThisCard(card)}> 
                        <DeleteIcon style={{fontSize: "20px"}} /> 
                    </IconButton>
            </Grid>
            </Grid>
        </Card>))

  
    return (
        
        <div>
           
            
            {cardItems.length ? cardItems : 
            <div style={{margin: "20px", color: "grey"}}>
                <h1 > no cards </h1>
                <Link href="/createCard">Create cards</Link>
            </div>}
            
            
        </div>
    )
}

export default CardView
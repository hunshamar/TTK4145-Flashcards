
import { useState } from 'react';
import { Card, IconButton } from '@material-ui/core';
import {connect, useSelector} from "react-redux"
import { useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid } from '@material-ui/core/';
import axios from "axios"
import {compose} from "redux"
import { fetchCards } from '../store/actions/cardActions';



const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad"

const ShowCards = props => {

    // const cards = props.cards
    const [cards, setCards] = useState()

    const rCards = useSelector(state => state.cards)


    useEffect(() => {
        // props.fetchCards()
        console.log(props.cards)
        // axios.get("http://localhost:5000/api/flashcards")
        // .then(response => {
        //     console.log(response.data);
        //     setCards(response.data)
        // })
        // .catch(err => console.log(err))



    }, [])

    const deleteCard = card => {

        axios.delete("http://localhost:5000/api/deleteflashcard/" + card.id, {headers: { Authorization: "Bearer " +localStorage.getItem("user_token") }}).then(res => {
            console.log(res.data)
            window.location.reload();
        })

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
                            <IconButton onClick = {() => deleteCard(card)}> 
                                <DeleteIcon style={{fontSize: "20px"}} /> 
                            </IconButton>
                    </Grid>
                    </Grid>
                </Card>
            ))}
            
            
        </div>
    )
}

const mapStateToProps = state => {
    return{
        cards: state.cards
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchCards: () => dispatch(fetchCards)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCards)
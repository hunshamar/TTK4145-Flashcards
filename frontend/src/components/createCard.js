
import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';
import { addCard, loadCards } from '../store/actions/cardActions';
import { connect, useDispatch } from 'react-redux';
import { TextField, Card } from '@material-ui/core';
import {Alert} from '@material-ui/lab/';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadCardgroups } from '../store/actions/cardgroupActions';
import CardgroupSelect from './cardgroupselect';
import Alerter from './notifications/alerter';



const CreateCard = (props) => {

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [cardgroupid, setCardgroupid] = useState("");
    const [back, setBack] = useState({});

    const cards = useSelector(state => state.cardReducer.cards)
    const cardAlert = useSelector(state => state.cardReducer.alert)
    const cardgroups = useSelector(state => state.cardgroupReducer.cardgroups)
   
    
    const [age, setAge] = React.useState('');
  
    const handleCardgroupChange = (event) => {
        setCardgroupid(event.target.value);
    };

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(loadCards())
        dispatch(loadCardgroups())
    }, [])   






    const submit = e => {
        e.preventDefault()
        
        if (content && title && cardgroupid){


            try{ dispatch(addCard({
                title: title,
                content: content,
                cardgroupid: cardgroupid
            }))}
            catch {
            }
            
        }
        else{
            alert("fill inn all fields")
        }
    }
    
    
    return(

        <React.Fragment>           

            <Card style={{margin: "100px", padding: "100px"}}>
            <form onSubmit={submit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>

                    <h2>Create a single card </h2>
                </Grid>
                <Grid item xs={12}>
                    <CardgroupSelect onChange={e => setCardgroupid(e)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={e => setTitle(e.target.value)} fullWidth required variant="outlined" label="Front" multiline
                        rows={4}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        onChange={e => setContent(e.target.value)}
                        id="asd"
                        label="Back"
                        multiline
                        rows={4}
                        defaultValue=""
                        // value={formData[props.formNumber]}
                        fullWidth
                        required
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                <Button type="submit" fullWidth style={{backgroundColor: "grey", color: "white"}}>Submit</Button>
                </Grid>

            </Grid>
                </form>
                </Card>
        </React.Fragment>
    )
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addCard: (card) => dispatch(addCard(card)),
//     }
// }

// export default connect(null, mapDispatchToProps)(CreateCard)

export default CreateCard
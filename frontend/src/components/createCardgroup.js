
import { Button, Grid, Card, IconButton, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';

import DeleteIcon from '@material-ui/icons/Delete';

import { addCardgroup, loadCardgroups } from '../store/actions/cardgroupActions';
import { connect, useDispatch } from 'react-redux';
import {Alert} from '@material-ui/lab/';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';



const CreateCardgroup = (props) => {

    const [title, setTitle] = useState("");
    const [back, setBack] = useState({});

    const cardgroups = useSelector(state => state.cardgroupReducer.cardgroups)
    const cardAlert = useSelector(state => state.cardgroupReducer.alert)
    

    const dispatch = useDispatch();

    console.log("is token?", localStorage.getItem("user_token"))

    useEffect(() => {
        dispatch(loadCardgroups())
    }, [])   

    

    let cardgroupItems = []

    cardgroups.map((cardgroup, index) => (

        cardgroupItems[index] = 
            // <div>{cardgroup.title}</div>
            <Card key={cardgroup.id} style={{margin: "20px", width: "400px", padding: "10px"}}>
                <Grid container spacing={0}> 
                    <Grid item xs={11}>

                        <div style={{fontWeight: "bold"}}>id: {cardgroup.id}</div>
                        <div style={{textDecoration: "underline"}}>title: {cardgroup.title}</div>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton > 
                            <DeleteIcon style={{fontSize: "20px"}} /> 
                        </IconButton>
                </Grid>
                </Grid>
            </Card>
    ))




    const submit = e => {
        e.preventDefault()
        
        console.log(title)
        if (title){


            try{ dispatch(addCardgroup({
                title: title,                
            }))}
            catch {
                console.log("err")
            }

            // props.addCard({
            //     title: title,
            //     content: content
            // })

            
        }
        else{
            console.log("error here")
        }
    }
    
    
    return(

        <React.Fragment>
            {cardAlert.success ? 
                <Alert severity="success">{cardAlert.success}</Alert>   
                :
                <div></div>            
            }
            {cardAlert.error ? 
                <Alert severity="error">{cardAlert.error}</Alert>   
                :
                <div></div>            
            }
            


            <Card style={{margin: "100px", padding: "100px"}}>
            <form onSubmit={submit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>

                    <h2>Create cardgroup </h2>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={e => setTitle(e.target.value)} fullWidth required variant="outlined" label="Title"/>
                </Grid>
                <Grid item xs={12}>
                <Button type="submit" fullWidth style={{backgroundColor: "grey", color: "white"}}>Submit</Button>
                </Grid>

            </Grid>
                </form>
                </Card>

        {cardgroupItems.length ? cardgroupItems : <div>no items</div>}

        </React.Fragment>
    )
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addCard: (card) => dispatch(addCard(card)),
//     }
// }

// export default connect(null, mapDispatchToProps)(CreateCard)

export default CreateCardgroup
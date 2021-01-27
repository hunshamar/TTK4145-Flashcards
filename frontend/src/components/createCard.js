
import { Button, Grid } from '@material-ui/core';
import { TextField, Card } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import { addCard } from '../store/actions/cardActions';
import { connect } from 'react-redux';


const CreateCard = (props) => {

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    // const [back, setBack] = useState({});

    console.log("is token?", localStorage.getItem("user_token"))

    const submit = e => {
        e.preventDefault()
        
        console.log(content, title)
        if (content && title){

            props.addCard({
                title: title,
                content: content
            })

            
        }
        else{
            console.log("error here")
        }
    }
    
    
    return(
        <Card style={{margin: "100px", padding: "100px"}}>
        <form onSubmit={submit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>

                <h2>Create a single card </h2>
            </Grid>
            <Grid item xs={12}>
                <TextField onChange={e => setTitle(e.target.value)} fullWidth required variant="outlined" label="Title"/>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    onChange={e => setContent(e.target.value)}
                    id="asd"
                    label="Front"
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
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCard: (card) => dispatch(addCard(card)),
    }
}

export default connect(null, mapDispatchToProps)(CreateCard)
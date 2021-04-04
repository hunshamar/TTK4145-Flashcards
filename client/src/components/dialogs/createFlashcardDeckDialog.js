import { Button, Dialog, Grid, makeStyles, TextField, Typography } from "@material-ui/core"

import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadCardgroupFlashcards } from "../../store/actions/cardActions"
import { loadCardgroups, loadCardgroupsInCollectiveDeck } from "../../store/actions/cardgroupActions"
import CardgroupCheck from "../submodules/cardgroupCheck"
import CardgroupSelect from "../submodules/cardgroupselect"

const useStyles = makeStyles(theme => ({
    dialog: {
        "& .MuiDialog-paperScrollPaper": {
            maxHeight: "100vh",
        },
    }
}))


const CreateFlashCardDeckDialog = ({onClose, open}) => {
    const classes = useStyles()

    const [numberOfFlashcards, setNumberOfFlashcards] = useState(20)
    const [checkedCardgroups, setCheckedCardgroups] = useState([])

    const handleClose = () => {
        onClose(false);
    };

    const dispatch = useDispatch()
    useEffect(() => {
        console.log("init create flashcard deck dialog")
        dispatch(loadCardgroupFlashcards(1))
        // dispatch(loadCardgroupsInCollectiveDeck())
        dispatch(loadCardgroups())
    }, [])


    
    const collective_deck_cards = useSelector(state => state.cardReducer.cards)
    const cardgroups = useSelector(state => state.cardgroupReducer.cardgroups)


    return (
        <Dialog onClose={handleClose} 
        className={classes.dialog}
       open={open} 
       style={{ margin: "100px"}}
       >    
            <div style={{margin: "40px 40px"}}> 

            <Grid container spacing={2}>

                

                <Grid item xs={12} >
                    <Typography variant="h6" align="left" > Create New Flashcard Deck </Typography>
                    <Typography variant="body2" align="left" color="textSecondary" > bla bla bla bla tekst her
                     </Typography>
                </Grid>

                <Grid item xs={12}>
                    <CardgroupCheck cardgroups={cardgroups} checkedCardgroups={checkedCardgroups} setCheckedCardgroups={setCheckedCardgroups} />
                </Grid>

                <Grid item xs={12}>
                    {(collective_deck_cards.length) } cards from collective deck matching your requirements
                    {JSON.stringify(cardgroups)}
                </Grid>

            

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        color="secondary"
                        id="outlined-number"
                        label="Number of Flashcards to Study"
                        type="number"
                        required
                        value={numberOfFlashcards}
                        onChange={e => setNumberOfFlashcards(e.target.value)} 
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={handleClose} fullWidth color="primary"  >Cancel</Button>
                </Grid>
                <Grid item xs={6}>
                <Button type="submit" fullWidth style={{backgroundColor: true ? "green" : "grey", color: "white"}}>Submit</Button>
                </Grid>

            </Grid>
            </div>
        </Dialog> 
    )
}

export default CreateFlashCardDeckDialog
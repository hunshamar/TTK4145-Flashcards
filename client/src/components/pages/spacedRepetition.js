import { Button, Divider, Grid, TextField, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PageWrapper } from "../../static/wrappers"
import { getCardreviewDeck, addCardsToDeck } from "../../store/actions/studyActions"




const SpacedRepetition =  () => {

    const dispatch = useDispatch()
    const cardreviewDeck = useSelector(state => state.studyReducer)
    const [numberOfCardsToReview, setNumberofCardsToReview] = useState(20)

    useEffect(() => {
        dispatch(getCardreviewDeck())
    }, [])  

    const addCardsToReview = () => {
        dispatch(addCardsToDeck())
    }

    return(
        <PageWrapper>
            <Grid container spacing={2}>
                <Grid item xs={12}  >
                    <Typography variant="h4" gutterBottom >
                        Spaced Repetition Study
                    </Typography>
                </Grid> 
                    <Grid item xs={12}>
                        <Divider />
                    </Grid> 
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={addCardsToReview} >Add Cards to Deck</Button>
                    </Grid>
                    <Grid item xs={12}>
                        Cards in Deck: {cardreviewDeck.cardreviews.length}
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" style={{margin: 0, height: "100%"}} color="primary" fullWidth>Start Today's Session</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-number"
                            label="Number of Flashcards to Review Today"
                            type="number"
                            value={numberOfCardsToReview}
                            required
                            onChange={e => setNumberofCardsToReview(e.target.value)} 
                            variant="outlined"
                        />
                    </Grid>


                    <Grid item xs={12}>
                    spaced rep
            {JSON.stringify(cardreviewDeck)}

                    </Grid>
            </Grid>

        </PageWrapper>
    )


}

export default SpacedRepetition
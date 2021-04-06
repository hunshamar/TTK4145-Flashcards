

import { Button, Divider, Grid, Typography } from "@material-ui/core"
import React from "react"
import { useHistory } from "react-router";
import { PageWrapper } from "../../static/wrappers";


const Study = () => {

    const history = useHistory()
    const redirectToSpacedRepetitionPage = () => {
        history.push("/spaced-repetition")
    }
    const redirectToUserDecks = () => {
        history.push("/user-decks")
    }
    redirectToUserDecks()



    return (
        <PageWrapper>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom> Study - Coming Soon... </Typography>
                    <Typography variant="body2" color="textSecondary">
                    Page for studying cards.                     <br/> 
                    Todo:<br/>

                    <ul>
                        <li>Spaced Repition review</li>
                        <li>"random" cards review from each chapter</li>
                    </ul>

                    {/* <b>Overall quality</b> The overall quality of the flashcard. Is the question well phrased? Is it too long and complex? Is it original? This rating can be more subjective. <br/> */}

                </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={redirectToSpacedRepetitionPage}>Spaced Repetition</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={redirectToUserDecks}>User Decks</Button>
                </Grid>
            </Grid>
        </PageWrapper>
    )
}

export default Study
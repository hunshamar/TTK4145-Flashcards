

import { Divider, Grid, Typography } from "@material-ui/core"
import React from "react"
import { PageWrapper } from "../../static/wrappers";


const Study = () => {




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
            </Grid>
        </PageWrapper>
    )
}

export default Study
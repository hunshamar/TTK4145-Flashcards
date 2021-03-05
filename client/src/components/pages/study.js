

import { Divider, Grid, Typography } from "@material-ui/core"
import React from "react"
import { PageWrapper } from "../../static/wrappers";


const Study = () => {




    return (
        <PageWrapper>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom> Study </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>
        </PageWrapper>
    )
}

export default Study
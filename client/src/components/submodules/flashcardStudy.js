import { Divider, Grid, Typography, Button } from "@material-ui/core"
import { useState } from 'react';





const FlashcardStudy = ({flashcard, style}) => {
    
    const [reveal, setReveal] = useState(false)

    return (
        <div style={style}>
            <Grid container spacing={2} style={{minWidth: "500px", minHeight: "200px"}}>
                <Grid item xs={12} style={{textAlign: "center"}}>

                    <Typography variant="body2">
                        {/* {flashcard.front} */}
                        <div dangerouslySetInnerHTML={{__html: flashcard.front}} />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12} style={{textAlign: "center"}}>
                    {reveal ? 
                    <Typography variant="body2">
                        <div dangerouslySetInnerHTML={{__html: flashcard.back}} />
                    </Typography>
                    :
                    <Button variant="contained" color="primary" onClick={() => setReveal(true)}> 
                        Show Answer
                    </Button>}
                </Grid>
            </Grid>
        </div>
    )

}

export default FlashcardStudy
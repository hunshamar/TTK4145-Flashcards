import { Divider, Grid, Typography, Button } from "@material-ui/core"
import { useState } from 'react';

import DOMPurify from 'dompurify';


const FlashcardStudy = ({flashcard, style, revealback}) => {
    
    const [reveal, setReveal] = useState(revealback)

    return (
        <div style={style}>
            <Grid container spacing={0} >
                <Grid item xs={12}  style={{textAlign: "center", minHeight: "100px"}}>
                <Typography variant="caption" color="textSecondary">
                        Front:
                    </Typography>
                    <Typography variant="body2" style={{marginTop: "auto", overflow: "hidden"}}>
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flashcard.front)}} />
                    </Typography>
                </Grid>
                <Grid item xs={12}  >
                    <Divider /> 
                </Grid>
                <Grid item xs={12} style={{textAlign: "center", minHeight: "100px"}}>

                   
                    {reveal ? 
                     <div>
                        <Typography variant="caption" color="textSecondary">
                            Back:
                        </Typography>
                        <Typography variant="body2">
                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flashcard.back)}} />
                        </Typography>
                    </div>
                    :
                    <Button variant="contained" color="primary" style={{marginTop: "25px"}} onClick={() => setReveal(true)}> 
                        Show Answer
                    </Button>}
                </Grid>
            </Grid>
        </div>
    )

}

export default FlashcardStudy
import { Divider, Grid, Typography, Button } from "@material-ui/core"

import { useState,useEffect } from 'react';

import DOMPurify from 'dompurify';
import DivHTMLSanatized from "./divHTMLSanitized";


const FlashcardStudy = ({flashcard, style, revealback, externalReveal=false}) => {
    
    useEffect(() => {
        console.log("rrr")
    }, revealback)

    const [reveal, setReveal] = useState(false)

    return (
        <div style={style}>
            <Grid container spacing={0} >
                <Grid item xs={12}  style={{textAlign: "center", minHeight: "100px", minWidth: "300px"}}>
                <Typography variant="caption" color="textSecondary">
                        Front:
                    </Typography>
                    <Typography variant="body2" style={{marginTop: "auto", overflow: "hidden"}}>
                        <DivHTMLSanatized text={flashcard.front}/>

                    </Typography>
                </Grid>
                <Grid item xs={12}  >
                    <Divider /> 
                </Grid>
                <Grid item xs={12} style={{textAlign: "center", minHeight: "100px", minWidth: "300px"}}>

                   
                    {revealback || reveal? 
                     <div>
                        <Typography variant="caption" color="textSecondary">
                            Back:
                        </Typography>
                        <Typography variant="body2">
                        <DivHTMLSanatized text={flashcard.back}/>
                        </Typography>
                    </div>
                    :
                    externalReveal ? "" : 
                    <Button variant="contained" color="primary" style={{marginTop: "25px"}} onClick={() => setReveal(true)}> 
                        Show Answer
                    </Button>}
                </Grid>
            </Grid>
        </div>
    )

}

export default FlashcardStudy
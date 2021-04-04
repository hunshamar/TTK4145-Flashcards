import { Button, Divider, Grid, Typography } from "@material-ui/core"
import { PageWrapper } from "../../static/wrappers"
import AddIcon from '@material-ui/icons/Add';
import React, {useState} from "react"
import CreateFlashCardDeckDialog from "../dialogs/createFlashcardDeckDialog";

const UserDecks = () => {

    const [open, setOpen] = useState(false)

    return(
        <PageWrapper>
            <CreateFlashCardDeckDialog open={open} onClose={() => setOpen(false)} />
            <Grid container spacing={2}>
                <Grid item xs={12}  >
                    <Typography variant="h4" gutterBottom >
                        User Flashcard Decks
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Create decks with random flashcards from the collective deck and study <br/>
                        Decks are deleted after they are finished
                    </Typography>

                </Grid> 
                    <Grid item xs={12}>
                        <Divider />
                    </Grid> 
                    <Grid item xs={12}>
                        <Button startIcon={<AddIcon />} onClick={() => setOpen(true)} variant="contained" color="primary">New Flashcard Deck</Button>
                    </Grid>
                </Grid>
 
        </PageWrapper>
    )
}

export default UserDecks
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageWrapper } from "../../static/wrappers";
import { getUserFlashcardDecks } from "../../store/actions/userFlashcardDeckActions";
import CreateFlashCardDeckDialog from "../dialogs/createFlashcardDeckDialog";
import Loading from "../notifications/loading";
import UserDeckList from "../submodules/userDecksList";

const UserDecksPage = () => {
  const [open, setOpen] = useState(false);

  const userDecks = useSelector(
    (state) => state.userFlashcardDeckReducer.decks
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserFlashcardDecks());
  }, []);

  return (
    <PageWrapper>
      <CreateFlashCardDeckDialog open={open} onClose={() => setOpen(false)} />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom>
            User Flashcard Decks
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            variant="contained"
            color="primary"
          >
            New Flashcard Deck
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            Create decks with random flashcards from the collective deck and
            study. <br />
            Decks are automatically deleted after they are finished, but you can
            create new ones.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          {userDecks.length ? (
            <Loading alternative={<UserDeckList decks={userDecks} />} />
          ) : (
            <Typography variant="body2" color="textPrimary">
              Could not find any decks for user. Create new decks with the
              button above
            </Typography>
          )}
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default UserDecksPage;

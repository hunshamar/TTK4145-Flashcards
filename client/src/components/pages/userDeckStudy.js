import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { PageWrapper } from "../../static/wrappers";
import {
  answerFlashcard,
  getFlashcardsInUserDeck,
} from "../../store/actions/cardActions";
import {
  deleteUserFlashcardDeck,
  getUserFlashcardDecks,
} from "../../store/actions/userFlashcardDeckActions";
import Loading from "../notifications/loading";
import FlashcardStudy from "../submodules/flashcardStudy";
import Progress from "../submodules/progress";

const useStyles = makeStyles((theme) => ({
  correctButton: {
    backgroundColor: theme.palette.button.success.main,
    color: "white",
    border: "none",
    align: "center",
    "&:hover": {
      background: theme.palette.button.success.dark,
    },
  },
  wrongButton: {
    backgroundColor: theme.palette.button.error.main,
    color: "white",
    border: "none",
    align: "center",
    "&:hover": {
      background: theme.palette.button.error.dark,
    },
  },
  studyContainer: {
    height: "60px",
    display: "grid",
    placeItems: "center",
  },
}));

const UserDeckStudy = () => {
  const classes = useStyles();
  const params = useParams();
  const id = parseInt(params.id);

  const flashcards = useSelector((state) => state.cardReducer.cards);
  const flashcard = useSelector((state) => state.cardReducer.cards)[0];
  const userDeck = useSelector(
    (state) => state.userFlashcardDeckReducer.decks
  )[0];

  const dispatch = useDispatch();
  const [reveal, setReveal] = useState(false);
  const [done, setDone] = useState(false);
  const history = useHistory();

  const handleAnswer = (isCorrect) => {
    dispatch(
      answerFlashcard({
        deckId: id,
        flashcardId: flashcard.id,
        correct: isCorrect,
      })
    ).then(() => {
      setReveal(false);
    });
  };

  useEffect(() => {
    dispatch(getFlashcardsInUserDeck(id));
    dispatch(getUserFlashcardDecks({ id: id }));
  }, []);

  useEffect(() => {
    if (!flashcards.length) {
      dispatch(getUserFlashcardDecks({ id: id }));
    }
  }, [flashcards]);

  useEffect(() => {
    console.log(id);
    console.log("ud", userDeck);
    if (userDeck && !userDeck.nFlashcards && userDeck.id === id) {
      setDone(true);
    }
  }, [userDeck]);

  const handleEnd = () => {
    dispatch(deleteUserFlashcardDeck(id));
    history.push("/user-decks");
  };

  if (done) {
    return <PageWrapper>Deck done</PageWrapper>;
  }

  return (
    <PageWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Flashcard study from deck:<i> {userDeck ? userDeck.title : ""}</i>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Wrong cards are re-asked. Correct cards are removed from the deck.
            When all cards are finished, the deck is complete and is deleted.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {userDeck ? (
            <Typography variant="h4" color="textSecondary">
              <Progress
                x={userDeck.nFlashcardsOriginally - flashcards.length}
                y={userDeck.nFlashcardsOriginally}
                body="Study progress"
              />
            </Typography>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>

      {flashcard ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              border={1}
              borderColor="secondary.light"
              borderRadius={5}
              className={classes.studyContainer}
              style={{
                minHeight: "250px",
                height: "auto",
                backgroundColor: "white",
                color: "black",
              }}
            >
              <Loading
                alternative={
                  <FlashcardStudy
                    flashcard={flashcard}
                    externalReveal
                    revealback={reveal}
                  />
                }
              />
            </Box>
          </Grid>

          {reveal ? (
            <React.Fragment>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleAnswer(false)}
                  className={classes.wrongButton}
                >
                  wrong (move card to back of Deck)
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleAnswer(true)}
                  className={classes.correctButton}
                >
                  Correct (remove card from deck)
                </Button>
              </Grid>
            </React.Fragment>
          ) : (
            <Grid item xs={12}>
              <Button
                onClick={() => setReveal(true)}
                fullWidth
                variant="contained"
                color="primary"
              >
                Reveal Answer
              </Button>
            </Grid>
          )}
        </Grid>
      ) : (
        <Loading />
      )}
    </PageWrapper>
  );
};

export default UserDeckStudy;

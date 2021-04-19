import {
  Button,
  Dialog,
  Grid,
  makeStyles,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert } from "../../store/actions/alertActions";
import {
  clearCardReducer,
  getCollectiveDeckFlashcards,
} from "../../store/actions/cardActions";
import { loadCardgroupsInCollectiveDeck } from "../../store/actions/cardgroupActions";
import { createUserFlashcardDeck } from "../../store/actions/userFlashcardDeckActions";
import Loading from "../notifications/loading";
import CardgroupCheck from "../submodules/cardgroupCheck";

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paperScrollPaper": {
      maxHeight: "100vh",
      margin: "10px",
      maxWidth: "500px",
    },
  },
}));

const marks = [
  {
    value: 0,
    difficultyRange: [0, 4],
    label: "easy",
  },
  {
    value: 1,
    label: "normal",
    difficultyRange: [4, 7],
  },
  {
    value: 2,
    label: "hard",
    difficultyRange: [7, 10],
  },
];

const CreateFlashCardDeckDialog = ({ onClose, open }) => {
  const classes = useStyles();

  const [numberOfFlashcards, setNumberOfFlashcards] = useState(20);
  const [checkedCardgroups, setCheckedCardgroups] = useState([]);
  const [difficulty, setDifficulty] = useState([0, 2]);
  const [title, setTitle] = useState("");

  const handleClose = () => {
    onClose(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("init create flashcard deck dialog");
    dispatch(clearCardReducer());
    dispatch(loadCardgroupsInCollectiveDeck());
  }, []);

  console.log(checkedCardgroups);
  const collective_deck_cards = useSelector((state) => state.cardReducer.cards);
  const cardgroups = useSelector((state) => state.cardgroupReducer.cardgroups);

  const getCheckedCardsCardgroupNames = () => {
    return checkedCardgroups
      .map((checked_id) => cardgroups.find((g) => g.id == checked_id).title)
      .join(", ");
  };

  const difficultyToString = () => {
    console.log("diff", difficulty[0], difficulty[1]);
    return marks
      .filter((m) => m.value >= difficulty[0] && m.value <= difficulty[1])
      .map((mark) => mark.label)
      .join(", ");
  };

  const difficultyToRange = () => {
    console.log("diff", difficulty[0], difficulty[1]);
    const rangeList = marks
      .filter((m) => m.value >= difficulty[0] && m.value <= difficulty[1])
      .map((mark) => mark.difficultyRange);

    return [rangeList[0][0], rangeList[rangeList.length - 1][1]];
  };

  useEffect(() => {
    if (checkedCardgroups.length) {
      const [difficultyMin, difficultyMax] = difficultyToRange(difficulty);
      console.log(difficultyToRange(difficulty));
      console.log(
        `%c ${difficultyMin}, ${difficultyMax}`,
        "background: #222; color: red"
      );

      let cardgroupIds = checkedCardgroups.join();

      dispatch(
        getCollectiveDeckFlashcards({
          difficultyMin,
          difficultyMax,
          cardgroupIds,
          idOnly: true,
        })
      );
    }
  }, [difficulty, checkedCardgroups]);

  useEffect(() => {
    if (!checkedCardgroups.length && collective_deck_cards.length) {
      dispatch(clearCardReducer());
    }
  }, [collective_deck_cards, checkedCardgroups]);

  console.log(getCheckedCardsCardgroupNames());

  const submitDeck = (e) => {
    e.preventDefault();
    console.log("hø");
    console.log(numberOfFlashcards);
    console.log(collective_deck_cards);

    if (numberOfFlashcards > collective_deck_cards.length) {
      dispatch(
        errorAlert(
          "Error. Number of cards to study exceeds number of matching cards"
        )
      );
    } else {
      dispatch(
        createUserFlashcardDeck({
          flashcards: collective_deck_cards,
          title,
          nCards: numberOfFlashcards,
        })
      ).then((successfullyCreated) => {
        console.log("succc", successfullyCreated);
        if (successfullyCreated) {
          onClose();
        }
      });
    }
  };

  return (
    <Dialog onClose={handleClose} className={classes.dialog} open={open}>
      <div style={{ margin: "40px 40px" }}>
        <form onSubmit={submitDeck}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" align="left">
                {" "}
                Create New Flashcard Deck{" "}
              </Typography>
              <Typography variant="body2" align="left" color="textSecondary">
                {" "}
                Create a custom deck of flashcards to review. The deck is
                deleted after it is completed
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
                value={title}
                required
                variant="outlined"
                label="Your flashcard deck name"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2">
                {" "}
                Select one or more cardgroups to study{" "}
              </Typography>
              <div style={{ padding: "10px 20px" }}>
                <CardgroupCheck
                  cardgroups={cardgroups}
                  checkedCardgroups={checkedCardgroups}
                  setCheckedCardgroups={setCheckedCardgroups}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2">
                {" "}
                Select difficulty range of flashcards{" "}
              </Typography>
              <div style={{ padding: "10px 20px" }}>
                <Slider
                  value={difficulty}
                  onChange={(e, difficulty) => setDifficulty(difficulty)}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  max={2}
                  valueLabelDisplay={"off"}
                  marks={marks}
                  // getAriaValueText={valuetext}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              Picking cards from chapters:{" "}
              <i style={{ color: "blue" }}>
                {" "}
                {getCheckedCardsCardgroupNames()}{" "}
              </i>{" "}
              <br />
              with difficulty{" "}
              <i style={{ color: "blue" }}> {difficultyToString()} </i>
            </Grid>

            <Grid item xs={12}>
              <b style={{ color: "blue" }}>
                {" "}
                <Loading
                  alternative={
                    collective_deck_cards.length
                      ? collective_deck_cards.length
                      : "0"
                  }
                  style={{ textAlign: "left", display: "inline   " }}
                  size="12px"
                  color="primary"
                />{" "}
              </b>{" "}
              cards from collective deck matching your requirements
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                color="secondary"
                id="outlined-number"
                label="Number of random flashcards to study"
                type="number"
                required
                value={numberOfFlashcards}
                onChange={(e) => setNumberOfFlashcards(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={handleClose}
                fullWidth
                color="primary"
                style={{ height: "100%" }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                style={{
                  backgroundColor: true ? "green" : "grey",
                  color: "white",
                  height: "100%",
                }}
              >
                Create your deck
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Dialog>
  );
};

export default CreateFlashCardDeckDialog;

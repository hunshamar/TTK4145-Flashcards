import { CardActionArea, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import StyleIcon from "@material-ui/icons/Style";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteUserFlashcardDeck } from "../../store/actions/userFlashcardDeckActions";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },

  title: {
    maxWidth: "100%",
    height: "60px",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",

    // backgroundColor: "red"
  },

  iconContainer: {
    height: "60px",
    display: "grid",
    placeItems: "center",
  },

  content: {
    height: "200px",
  },
  actions: {
    // backgroundColor: "red",
    marginTop: "auto",
  },
  pos: {
    marginBottom: 12,
  },
});

const UserDeck = ({ cardDeck }) => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const deleteCardDeck = () => {
    console.log("delete this");
    if (
      window.confirm(
        "Are you sure you want to delete flash card deck '" +
          cardDeck.title +
          "'?"
      )
    ) {
      dispatch(deleteUserFlashcardDeck(cardDeck.id));
    } else {
      console.log("asd");
    }
  };

  const redirectToDeck = () => {
    history.push(`/user-decks/${cardDeck.id}`);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea onClick={redirectToDeck}>
        <CardContent>
          <Typography variant="overline" color="textSecondary">
            Flashcard Deck:
          </Typography>
          <Typography className={classes.title} gutterBottom variant="h6">
            {cardDeck.title}
          </Typography>
          <div className={classes.iconContainer}>
            <StyleIcon fontSize="large" color="inherit" />
          </div>
        </CardContent>
        <CardContent>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {cardDeck.nFlashcards} flashcards
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button
          fullWidth
          startIcon={<DeleteIcon />}
          onClick={deleteCardDeck}
          variant="outlined"
        >
          Delete Deck
        </Button>
      </CardActions>
    </Card>
  );
};

const UserDecksView = ({ decks }) => {
  return (
    <Grid container spacing={2}>
      {decks.map((deck) => (
        <Grid item xs={4}>
          <UserDeck cardDeck={deck} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserDecksView;

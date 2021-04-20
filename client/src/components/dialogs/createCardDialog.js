import {
  Box,
  Button,
  Dialog,
  Grid,
  TextField,
  makeStyles,
  Typography,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCard, editCard } from "../../store/actions/cardActions";
import FlashcardStudy from "../submodules/flashcardStudy";

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paperScrollPaper": {
      maxHeight: "100vh",
      margin: "10px",
    },
  },
}));

const CreateCardDialog = ({ onClose, open, cardgroupId, toEditCard }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (toEditCard) {
      console.log("are editing");
      setFront(toEditCard.front);
      setBack(toEditCard.back);
    }
  }, [toEditCard, open]);

  const submit = (e) => {
    e.preventDefault();

    if (front && back && (cardgroupId || toEditCard)) {
      (toEditCard
        ? dispatch(
            editCard({
              front: front,
              back: back,
              id: toEditCard.id,
            })
          )
        : dispatch(
            addCard({
              front: front,
              back: back,
              cardgroupid: cardgroupId,
            })
          )
      ).then((success) => {
        if (success) {
          handleClose();
        }
      });
    }
  };

  const handleClose = () => {
    setPreview(false);
    onClose();
    setFront("");
    setBack("");
  };

  return (
    <Dialog onClose={handleClose} className={classes.dialog} open={open}>
      <form onSubmit={submit} style={{ padding: "40px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">
              {toEditCard
                ? "Edit Flashcard"
                : "Create a flashcard. This can be edited later"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Markdown is supported
              <br />
              Make sure the flashcard looks good in <i>Preview Flashcard</i> if
              writing in Markdown.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setFront(e.target.value)}
              value={front}
              label="Front (question)"
              fullWidth
              required
              variant="outlined"
              color="secondary"
              multiline
              rows={7}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setBack(e.target.value)}
              label="Back (answer)"
              multiline
              rows={7}
              value={back}
              fullWidth
              required
              variant="outlined"
              color="secondary"
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            {preview ? (
              <Box
                border={1}
                borderColor="secondary.light"
                borderRadius={5}
                align="center"
                mb="5px"
              >
                <FlashcardStudy flashcard={{ front, back }} revealback={true} />
              </Box>
            ) : null}
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              endIcon={<VisibilityIcon />}
              onClick={() => setPreview(!preview)}
            >
              {preview ? "Hide Preview" : "Preview Flashcard"}
            </Button>
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
                backgroundColor: front && back ? "green" : "grey",
                color: "white",
                height: "100%",
              }}
            >
              Submit {toEditCard ? "Edit" : ""}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default CreateCardDialog;

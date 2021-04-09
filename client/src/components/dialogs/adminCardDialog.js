import { Box, Dialog, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetFlashcardRatings } from "../../store/actions/ratingActions";
import FlashcardStudy from "../submodules/flashcardStudy";

const AdminCardDialog = (props) => {
  const { onClose, selectedValue, open, card } = props;
  const dispatch = useDispatch();

  // const dispatch = useDispatch()

  const handleClose = () => {
    onClose(selectedValue);
  };

  console.log("the card", card.id);

  useEffect(() => {
    if (open) {
      dispatch(adminGetFlashcardRatings(card.id));
    }
  }, [card, dispatch, open]);

  const ratings = useSelector((state) => state.ratingReducer.ratings);
  console.log(ratings);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* {ratings.length ? JSON.stringify(ratings[0]) : null} */}

          <Box style={{ width: "400px", height: "auto", margin: 0 }}>
            <FlashcardStudy
              flashcard={card}
              style={{ margin: "30px" }}
              revealback
            />
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default AdminCardDialog;

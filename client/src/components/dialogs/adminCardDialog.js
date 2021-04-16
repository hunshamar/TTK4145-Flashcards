import { Box, Dialog, Grid, makeStyles, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetFlashcardRatings } from "../../store/actions/ratingActions";
import FlashcardStudy from "../submodules/flashcardStudy";

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paperScrollPaper": {
      maxHeight: "100vh",
      maxWidth: "1000px",
      width: "1000px",
      minHeight: "700px",
    },
  },

  customizedButton: {
    position: "absolute",
    left: "80%",
    top: "5%",
  },
}));

const AdminCardDialog = (props) => {
  const { onClose, selectedValue, open, card } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  // const dispatch = useDispatch()

  const handleClose = () => {
    onClose(selectedValue);
  };

  console.log("the card", card);

  useEffect(() => {
    if (open) {
      dispatch(adminGetFlashcardRatings(card.id));
    }
  }, [card, dispatch, open]);

  const ratings = useSelector((state) => state.ratingReducer.ratings);
  console.log("asd", ratings);

  const columns = [
    { field: "id", headerName: "id", width: 65 },
    { field: "difficulty", headerName: "difficulty", width: 120 },
    { field: "quality", headerName: "quality", width: 120 },
    { field: "duplicates", headerName: "duplicate card ids", width: 400 },
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (ratings.length) {
      console.log("rat", ratings);
      let rowsArr = ratings.map((r, i) => {
        let duplicates_string = r.duplicates.map((d) => d.card.id).join(",");
        return {
          id: r.id,
          difficulty: r.difficulty,
          quality: r.quality_rating,
          duplicates: duplicates_string,
        };
      });
      console.log(rowsArr);
      setRows(rowsArr);
    }
  }, [ratings]);

  return (
    <Dialog className={classes.dialog} onClose={handleClose} open={open}>
      <div style={{ margin: "30px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* {ratings.length ? JSON.stringify(ratings[0]) : null} */}
            <Typography variant="h6">{card.username}'s flashcard</Typography>
            <Box
              border={1}
              borderColor="secondary.light"
              borderRadius={5}
              align="center"
              mb="5px"
            >
              <FlashcardStudy flashcard={card} revealback={true} />
            </Box>
            <Typography variant="h6">Ratings</Typography>
            <Typography variant="body">
              <b>Average difficulty:</b> {"\t"}
              {card.averageDifficulty}
            </Typography>
            <br />
            <Typography variant="body">
              <b>Average Quality:</b> {"\t"}
              {card.averageRating}
            </Typography>
            <DataGrid autoHeight rows={rows} columns={columns} pageSize={5} />
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
};

export default AdminCardDialog;

import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Rating from "@material-ui/lab/Rating";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveDifficultyRating,
  saveDuplicatesRating,
  saveQualityRating,
} from "../../store/actions/ratingActions";
import MarkAsDuplicatedDialog from "../dialogs/markAsDuplicateDialog";
import Loading from "../notifications/loading";
import DivHTMLSanatized from "./divHTMLSanitized";

const useStyles = makeStyles((theme) => ({
  duplicateButton: {
    fontSize: "10px",
    marginTop: "10px",
  },
  marked: {
    backgroundColor: theme.palette.backgroundHover,
  },
  body: {
    minHeight: "100px",
  },
}));

const difficultyLabels = {
  0.5: "Extremely Easy",
  1: "Very Easy",
  1.5: "Easy",
  2: "A Little Easy",
  2.5: "Ok",
  3: "Ok+",
  3.5: "A Little Hard",
  4.0: "Hard",
  4.5: "Very Hard",
  5: "Extremely Hard",
};

const qualityLabels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const RateCard = ({ rating, save, previewCard, cardIdToIndex }) => {
  const classes = useStyles();
  const [flipped, setFlipped] = useState(false);

  const [difficulty, setDifficulty] = useState(0);
  const [hoverDifficulty, setHoverDifficulty] = useState(-1);

  const [saveDate, setSaveDate] = useState("");

  const [duplicateRatings, setDuplicateRatings] = useState([]);
  const [openMarkAsDuplicated, setOpenMarkAsDuplicated] = useState(false);
  const loading = useSelector((state) => state.loadingReducer.loading);

  const [quality, setQuality] = useState(0);
  const [hoverQuality, setHoverQuality] = useState(-1);
  const dispatch = useDispatch();

  const rating_state = useSelector((state) =>
    state.ratingReducer.ratings.find((rat) => rat.id == rating.id)
  );
  const otherRatings = useSelector((state) =>
    state.ratingReducer.ratings.filter((rat) => rat.id !== rating.id)
  );

  console.log("ææ");
  console.log(rating_state);
  console.log(otherRatings);

  useEffect(() => {
    if (rating_state.savedatestring) {
      setDifficulty(rating_state.difficulty);
      setQuality(rating_state.quality_rating);
      setSaveDate(rating_state.savedatestring);
      console.log("rard", rating_state);
      setDuplicateRatings(rating_state.duplicates);
    }
  }, [rating_state]);

  useEffect(() => {
    console.log("dup", duplicateRatings);
  }, [duplicateRatings]);

  useEffect(() => {
    if (difficulty && difficulty != rating.difficulty) {
      console.log("save thi sdiff");
      dispatch(saveDifficultyRating(difficulty, rating.id));
    }
  }, [difficulty]);

  useEffect(() => {
    if (quality && quality != rating.quality_rating) {
      console.log("save this quality");
      dispatch(saveQualityRating(quality, rating.id));
    }
  }, [quality]);

  const markAsDuplicate = () => {
    setOpenMarkAsDuplicated(true);
  };

  const handleCloseDuplicated = () => {
    setOpenMarkAsDuplicated(false);
    dispatch(saveDuplicatesRating(duplicateRatings, rating.id));
  };

  return (
    <Box
      className={openMarkAsDuplicated ? classes.marked : ""}
      style={{ padding: "20px 10px" }}
    >
      <Grid className={classes.container} container spacing={2}>
        <MarkAsDuplicatedDialog
          open={openMarkAsDuplicated}
          onClose={handleCloseDuplicated}
          otherRatings={otherRatings}
          currentRating={rating_state}
          duplicateRatings={duplicateRatings}
          setDuplicateRatings={setDuplicateRatings}
        />

        <Grid item xs={1}>
          <Typography variant="subtitle2">#</Typography>
          <Typography variant="body2">{rating.index}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2">Question</Typography>
          <Typography variant="body2">
            <DivHTMLSanatized
              text={rating.card.front}
              style={{ overflow: "hidden" }}
            />
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle2">
            {flipped ? "Answer" : "Reveal Answer"}
          </Typography>
          {flipped ? (
            <Typography className={classes.body} variant="body2">
              {" "}
              {flipped ? (
                <DivHTMLSanatized
                  text={rating.card.back}
                  style={{ overflow: "hidden" }}
                />
              ) : (
                ""
              )}
            </Typography>
          ) : (
            <div></div>
          )}

          <Tooltip
            title={flipped ? "Hide Answer" : "Reveal Answer"}
            placement="right"
          >
            <IconButton
              onClick={() => setFlipped(!flipped)}
              variant={"outlined"}
              className={classes.revealButton}
              size="small"
            >
              {flipped ? (
                <VisibilityOffIcon size="small" color="primary" />
              ) : (
                <VisibilityIcon size="small" color="primary" />
              )}
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Rate</Typography>
          <Typography variant="body2"> Difficulty</Typography>

          <Tooltip title={difficultyLabels[hoverDifficulty]} placement="right">
            <Rating
              value={difficulty / 2}
              precision={0.5}
              size="small"
              onChange={(event, newValue) => {
                setDifficulty(2 * newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHoverDifficulty(newHover);
              }}
            />
          </Tooltip>

          {/* {difficulty/2 !== null && <Box ml={2}>{difficultyLabels[hovedDifficulty !== -1 ? hovedDifficulty : difficulty/2]}</Box>}  */}

          <Typography variant="body2">Relevance and Quality</Typography>
          <Tooltip title={qualityLabels[hoverQuality]} placement="right">
            <Rating
              value={quality / 2}
              precision={0.5}
              size="small"
              onChange={(event, newValue) => {
                setQuality(2 * newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHoverQuality(newHover);
              }}
            />
          </Tooltip>

          {/* <Typography variant="body2">Overall quality</Typography> 
                        <Rating 
                            value={quality}
                            precision={0.5}
                            size="small"
                            onChange={(event, newValue) => {
                                setQuality(newValue);
                            }}
                        /> */}
          {/* <Typography variant="body2">Duplicate Card{duplicateCardIds.length >= 2 ? "s" : ""}: </Typography> */}
          <Box style={{ minHeight: "30px", minWidth: "30px" }}>
            <Typography variant="body2" color="textSecondary">
              {duplicateRatings.map((rating) => (
                <b>#{rating.index}, </b>
              ))}{" "}
            </Typography>
          </Box>

          <Button
            className={classes.duplicateButton}
            onClick={markAsDuplicate}
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<MoodBadIcon />}
          >
            Mark as duplicate
          </Button>
        </Grid>

        <Grid item xs={9}>
          <Typography variant="caption" color="textSecondary">
            {saveDate ? "Last saved " + saveDate : ""}{" "}
            <Loading
              style={{ textAlign: "left", display: "inline   " }}
              size="12px"
            />{" "}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={() => previewCard(rating.card)}
            endIcon={<VisibilityIcon />}
          >
            Full Card View
          </Button>
        </Grid>

        {/* <Grid item xs={2} style={{textAlign: "center"}}>     
                    <Typography variant="subtitle2">Save Rating</Typography>  
                    <IconButton size="small" color="primary" onClick={submitRating}>
                        {loading  ? <Loading color="primary" size="24px"  /> : <SaveIcon size="small"/>} 
                    </IconButton> 
                </Grid> */}
      </Grid>
    </Box>
  );
};

export default RateCard;

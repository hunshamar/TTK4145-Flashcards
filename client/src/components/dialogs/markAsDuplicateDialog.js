import {
  Button,
  Checkbox,
  Divider,
  Grid,
  makeStyles,
  Popover,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paperScrollPaper": {
      maxHeight: "100vh",
      maxWidth: "100%",
    },
  },

  customizedButton: {
    position: "absolute",
    left: "80%",
    top: "5%",
  },

  root: {
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const CheckCard = ({ rating, isDuplicate, editDuplicates }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(isDuplicate);

  useEffect(() => {
    editDuplicates(rating, checked);
  }, [checked]);

  return (
    <div onClick={() => setChecked(!checked)}>
      <Grid container spacing={2}>
        <Grid item xs={9} className={classes.root}>
          <Typography variant="body2">
            <b>Card #{rating.index}</b>
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Checkbox
            size="small"
            color="primary"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </Grid>
        {/* <Grid item xs={3} className={classes.root}>
                    <Tooltip title="preview card" placement="right">
                        <IconButton size="small">
                            <VisibilityIcon fontSize="small" color="secondary" />
                        </IconButton>
                    </Tooltip>
                </Grid> */}
      </Grid>
    </div>
  );
};

const MarkAsDuplicatedDialog = ({
  onClose,
  open,
  duplicateRatings,
  setDuplicateRatings,
  otherRatings,
  currentRating,
  selectedValue,
}) => {
  const handleClose = () => {
    onClose(selectedValue);
  };

  // const [cardIndex, setCardIndex] = useState(-1)

  const editDuplicates = (rating, isDuplicate) => {
    if (!isDuplicate) {
      setDuplicateRatings(
        duplicateRatings.filter((rat) => rat.id !== rating.id)
      );
    } else if (isDuplicate) {
      if (!duplicateRatings.some((rat) => rat.id === rating.id)) {
        setDuplicateRatings([...duplicateRatings, rating]);
      }
    }
  };

  const classes = useStyles();

  return (
    <Popover
      onClose={handleClose}
      className={classes.dialog}
      open={open}
      //    anchorOrigin={{vertical: "top", horizontal: "right"}}
    >
      <div style={{ minWidth: "200px", maxWidth: "200px", margin: "30px" }}>
        <Typography variant="h5">Mark Duplicate cards:</Typography>
        <Typography variant="body2" color="textSecondary">
          {" "}
          Check cards that are very similar or duplicate of choosen card
        </Typography>
        <Divider />
        {otherRatings.map((rating) => (
          <div>
            <CheckCard
              rating={rating}
              isDuplicate={duplicateRatings.some((rat) => rat.id === rating.id)}
              editDuplicates={editDuplicates}
            />
            <Divider />
          </div>
        ))}

        <div style={{ marginTop: "50px" }}>
          <Button
            variant="contained"
            onClick={onClose}
            fullWidth
            color="primary"
          >
            {" "}
            Close
          </Button>
        </div>
      </div>
    </Popover>
  );
};

export default MarkAsDuplicatedDialog;

import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Dialog,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPeerreviews,
  editPeerReview,
} from "../../store/actions/peerreviewActions";
import { formatTime } from "../../utils/datehandling";
import Loading from "../notifications/loading";
import CardgroupSelect from "../submodules/cardgroupselect";

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paperScrollPaper": {
      maxHeight: "100vh",
    },
  },
}));

const CreatePeerreview = ({
  onClose,
  selectedValue,
  open,
  toEditPeerreview,
}) => {
  const dispatch = useDispatch();
  const editmode = toEditPeerreview && toEditPeerreview.cardgroup;

  useEffect(() => {
    console.log("ppp", toEditPeerreview);
    if (editmode) {
      console.log("groipid", toEditPeerreview.cardgroup.id);
      setGroupId(toEditPeerreview.cardgroup.id);
      setNumberOfReviews(toEditPeerreview.cardgroup.numberOfRatingsDue);
      let d = new Date(toEditPeerreview.cardgroup.peerReviewDueDate);
      setSelectedDate(d);
      setTime(formatTime(d.getHours(), d.getMinutes()));
    }
  }, [open, toEditPeerreview]);

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  const [time, setTime] = useState("23:59");
  const formSubmitCallback = useSelector(
    (state) => state.alertReducer.severity
  );
  const newStatus = useSelector((state) => state.alertReducer.newAlert);

  const [groupId, setGroupId] = useState(null);

  const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    console.log("stformSubmitCallback");
    if (formSubmitCallback === "success") {
      handleClose();
    }
  }, [newStatus]);

  //   e.preventDefault();

  //   if (groupId && selectedDate && numberOfReviews && time) {
  //     console.log("herfra");

  //     dispatch(createPeerreviews({  }));
  //   } else {
  //   }
  // };

  const submit = (e) => {
    e.preventDefault();
    let dueDate = selectedDate;

    dueDate.setMinutes(time.split(":")[1]);
    dueDate.setHours(time.split(":")[0]);

    if (groupId && selectedDate && numberOfReviews && time) {
      (editmode
        ? dispatch(
            editPeerReview({
              groupId,
              dueDate,
            })
          )
        : dispatch(
            createPeerreviews({
              groupId,
              dueDate,
              numberOfReviews,
            })
          )
      ).then((success) => {
        if (success) {
          console.log("closed");
          handleClose();
        }
      });
    }
  };

  const handleClose = () => {
    setSelectedDate(null);
    setGroupId(null);
    setNumberOfReviews(0);
    setTime("23:59");
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} className={classes.dialog} open={open}>
      <div style={{ margin: "40px 40px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" align="left">
              {editmode
                ? "Edit Existing Peer  Reviews"
                : "Add Peer Review Session for Students"}
            </Typography>
            <Typography variant="body2" align="left" color="textSecondary">
              {editmode
                ? "Can only change due date in edit mode. Delete peer review and create new one if you wish to change number of flashcards per student."
                : ` This will generate peer review sessions for all students for the
                choosen cardgroup. Each student will get n number of cards to rate
                before the due date.`}
            </Typography>
          </Grid>
        </Grid>

        <form onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <CardgroupSelect
                onChange={setGroupId}
                id={groupId}
                disabled={editmode}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                color="secondary"
                id="outlined-number"
                disabled={editmode}
                value={numberOfReviews}
                label="Number of flashcards to review pr student"
                type="number"
                required
                onChange={(e) => setNumberOfReviews(e.target.value)}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  disableToolbar
                  required
                  inputVariant="outlined"
                  variant="outlined"
                  format="MM/dd/yyyy"
                  // margin="normal"
                  id="date-picker-inline"
                  label="Due date for delivery"
                  value={selectedDate}
                  onChange={handleDateChange}
                  onClick={console.log("close")}
                  color="secondary"
                  autoOk
                  animateYearScrolling
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="time"
                label=""
                type="time"
                variant="outlined"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                defaultValue="23:59"
                color="secondary"
                InputLabelProps={{
                  shrink: true,
                }}
                // inputProps={{
                //     step: 1440, // 5 min
                // }}
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={handleClose}
                fullWidth
                color="primary"
              >
                {" "}
                Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                style={{
                  backgroundColor:
                    groupId && numberOfReviews && selectedDate
                      ? "green"
                      : "grey",
                  color: "white",
                }}
              >
                {editmode ? "Submit edit" : "submit"}
                <Loading
                  style={{ marginLeft: "10px", height: "26px" }}
                  size={24}
                  alternative={""}
                />
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Dialog>
  );
};

export default CreatePeerreview;

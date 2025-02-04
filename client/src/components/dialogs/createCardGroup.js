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
  addCardgroup,
  editCardgroup,
} from "../../store/actions/cardgroupActions";
import { formatTime } from "../../utils/datehandling";

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paperScrollPaper": {
      maxHeight: "100vh",
    },
  },
}));

const CreateCardGroup = ({ onClose, open, toeditCardgroup }) => {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [title, setTitle] = useState("");
  const [numberOfCards, setNumberOfCards] = useState(null);
  const [time, setTime] = useState("23:59");

  const classes = useStyles();

  useEffect(() => {
    if (toeditCardgroup) {
      setTitle(toeditCardgroup.title);
      setNumberOfCards(toeditCardgroup.numberOfCardsDue);
      let d = new Date(toeditCardgroup.dueDate);
      setSelectedDate(d);

      setTime(formatTime(d.getHours(), d.getMinutes()));
    }
  }, [open, toeditCardgroup]);

  const submit = (e) => {
    e.preventDefault();
    let dueDate = selectedDate;

    dueDate.setMinutes(time.split(":")[1]);
    dueDate.setHours(time.split(":")[0]);

    if (title && selectedDate && numberOfCards && time) {
      (toeditCardgroup
        ? dispatch(
            editCardgroup({
              id: toeditCardgroup.id,
              title: title,
              dueDate: dueDate,
              numberOfCardsDue: numberOfCards,
            })
          )
        : dispatch(
            addCardgroup({
              title: title,
              dueDate: dueDate,
              numberOfCardsDue: numberOfCards,
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
    setTitle("");
    setNumberOfCards(0);
    setTime("23:59");
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      className={classes.dialog}
      open={open}
      style={{ margin: "100px" }}
    >
      <div style={{ margin: "40px 40px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" align="left">
              {" "}
              {toeditCardgroup ? "Edit Cardgroup" : "New Cardgroup"} 
            </Typography>
          </Grid>
        </Grid>

        <form onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
                value={title}
                variant="outlined"
                label="Cardgroup title"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                color="secondary"
                id="outlined-number"
                label="Number of flashcards for delivery pr student"
                type="number"
                value={numberOfCards}
                required
                onChange={(e) => setNumberOfCards(e.target.value)}
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
                  onChange={(date) => setSelectedDate(date)}
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
                onChange={(e) => setTime(e.target.value)}
                value={time}
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
                    selectedDate && title && numberOfCards ? "green" : "grey",
                  color: "white",
                }}
              >
                {toeditCardgroup ? "Submit Edit" : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Dialog>
  );
};

export default CreateCardGroup;

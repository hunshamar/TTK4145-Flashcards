import {
  Dialog,
  Button,
  makeStyles,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { useState } from "react";
import FeedbackIcon from "@material-ui/icons/Feedback";
import CloseIcon from "@material-ui/icons/Close";
import MarkAsDuplicatedDialog from "./markAsDuplicateDialog";

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paperScrollPaper": {
      maxHeight: "100vh",
      maxWidth: "100%",
    },
  },
}));

const Feedback = ({ buttonstyle, dialogstyle }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => setOpen(true)}
        endIcon={<FeedbackIcon />}
      >
        Send Feedback
      </Button>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        className={classes.dialog}
        style={buttonstyle}
        //    anchorOrigin={{vertical: "top", horizontal: "right"}}
      >
        <div style={{ marginLeft: "auto" }}>
          <Tooltip title="Close">
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>

        <div style={{ margin: "20px 0" }}>
          <iframe
            title="title"
            src="https://docs.google.com/forms/d/e/1FAIpQLSeNwVsGczbV1229hlstKRI56IT8rCP6SMuAJzC0nuAxKoUMbg/viewform?embedded=true"
            width="640"
            height="587"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Loading…
          </iframe>
        </div>
      </Dialog>
    </div>
  );
};

export default Feedback;

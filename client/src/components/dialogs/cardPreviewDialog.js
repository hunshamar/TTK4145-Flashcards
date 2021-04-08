import { Dialog, IconButton, makeStyles, Tooltip } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FlashcardStudy from "../submodules/flashcardStudy";

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paperScrollPaper": {
      maxHeight: "100vh",
    },
  },

  customizedButton: {
    position: "absolute",
    left: "80%",
    top: "5%",
  },
}));

const CardPreviewDialog = ({ card, onClose, open, selectedValue }) => {
  const handleClose = () => {
    onClose(selectedValue);
  };

  const classes = useStyles();

  return (
    <Dialog onClose={handleClose} className={classes.dialog} open={open}>
      <div>
        <Tooltip title="Close" placement="left">
          <IconButton
            onClick={handleClose}
            className={classes.customizedButton}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>

        {/* <Typography variant="h4" align="center">Flashcard Preview </Typography>  */}
        <FlashcardStudy flashcard={card} style={{ margin: "30px" }} />
      </div>
    </Dialog>
  );
};

export default CardPreviewDialog;

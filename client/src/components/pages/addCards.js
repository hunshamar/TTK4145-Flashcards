import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PageWrapper } from "../../static/wrappers";
import { loadCardgroups } from "../../store/actions/cardgroupActions";
import CreateCardGroup from "../dialogs/createCardGroup";
import CardgroupList from "../submodules/cardgroupList";

const useStyles = makeStyles((theme) => ({
  addButton: {
    backgroundColor: theme.palette.button.success.main,
    color: "white",
    border: "none",
    align: "center",
    "&:hover": {
      background: theme.palette.button.success.dark,
    },
  },
}));

const AddCards = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const cardgroups = useSelector((state) => state.cardgroupReducer.cardgroups);
  const isAdmin = useSelector((state) => state.authReducer.adminMode);

  useEffect(() => {
    dispatch(loadCardgroups());
  }, [dispatch]);

  useEffect(() => {
    console.log("cardgroups changed...");
  }, [cardgroups]);

  const [open, setOpen] = React.useState(false);
  // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("closing time");
    setOpen(false);
  };

  const history = useHistory();
  const handleRedirectToGroup = (groupId) => {
    history.push("/cardgroup/" + groupId);
  };

  return (
    // <div style={{maxWidth: "600px", marginTop: "65px", marginLeft: "auto", marginRight: "auto"}}>
    <PageWrapper>
      {/* <img src="../../static/download.jpeg"  width="500" height="600" /> */}

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom>
            Create Flashcards
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Each flashcard group has a set number of flashcards to submit and a
            due date. Click a flashcard group to create new flashcards.
          </Typography>
        </Grid>
        <Grid item xs={4}>
          {isAdmin ? (
            <Button
              fullWidth
              className={classes.addButton}
              variant="outlined"
              onClick={handleClickOpen}
            >
              + Create group
            </Button>
          ) : (
            <div></div>
          )}
        </Grid>
        <Grid item xs={12}>
          <CardgroupList
            cardgroups={cardgroups}
            showDueDate
            onClick={handleRedirectToGroup}
          />
        </Grid>
      </Grid>

      <CreateCardGroup open={open} onClose={handleClose} />
    </PageWrapper>
  );
};

export default AddCards;

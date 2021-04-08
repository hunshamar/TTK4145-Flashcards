import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PageWrapper } from "../../static/wrappers";
import { infoAlert } from "../../store/actions/alertActions";
import { loadCardGroupUserFlashcards } from "../../store/actions/cardActions";
import {
  deleteCardgroup,
  loadCardgroup,
} from "../../store/actions/cardgroupActions";
import { dateJSONToString } from "../../utils/datehandling";
import CreateCardDialog from "../dialogs/createCardDialog";
import CreateCardGroup from "../dialogs/createCardGroup";
import Loading from "../notifications/loading";
import CardView from "../submodules/cardview";
import Progress from "../submodules/progress";

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
  delButton: {
    backgroundColor: theme.palette.button.error.main,
    color: "white",
    border: "none",
    align: "center",
    "&:hover": {
      background: theme.palette.button.error.dark,
    },
  },
}));

const CardGroupPage = (props) => {
  console.log("prop");
  console.log(props.match.params);

  const classes = useStyles();

  const isAdmin = useSelector((state) => state.authReducer.isAdmin);

  const cards = useSelector((state) => state.cardReducer.cards);
  const cardgroup = useSelector(
    (state) => state.cardgroupReducer.cardgroups[0]
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [openEditCardgroup, setOpenEditCardgroup] = useState(false);

  const loading = useSelector((state) => state.loadingReducer.loading);

  const handleClickOpen = () => {
    if (cards.length >= cardgroup.numberOfCardsDue) {
      dispatch(
        infoAlert(
          "All flashcards for this cardgroup delivered. Delete or edit existing cards"
        )
      );
    } else {
      setOpen(true);
    }
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const history = useHistory();
  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete cardgroup with all cards?"
      )
    ) {
      dispatch(deleteCardgroup(cardgroup));
      history.push("/addcards");
    }
  };

  const handleEdit = () => {
    setOpenEditCardgroup(true);
  };

  console.log("cardgr.:");
  console.log(cardgroup);

  useEffect(() => {
    console.log("stuff and things");

    console.log(cardgroup);
    dispatch(loadCardGroupUserFlashcards(props.match.params.id));
    dispatch(loadCardgroup(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  if (loading) {
    return (
      <PageWrapper>
        <Loading />
      </PageWrapper>
    );
  } else
    return (
      <PageWrapper>
        <CreateCardDialog
          open={open}
          onClose={handleClose}
          cardgroupId={props.match.params.id}
        />
        <CreateCardGroup
          open={openEditCardgroup}
          onClose={() => setOpenEditCardgroup(false)}
          toeditCardgroup={cardgroup}
        />

        {cardgroup ? (
          <Grid container spacing={6}>
            <Grid item xs={8}>
              <Typography variant="h4">
                Create Flashcards in {cardgroup.title}
              </Typography>
              <Typography variant="body2">
                {cardgroup.numberOfCardsDue} cards are due{" "}
                {dateJSONToString(cardgroup.dueDate)}
              </Typography>

              <div style={{ marginTop: "40px" }}>
                <CardView cards={cards} />
              </div>
            </Grid>

            <Grid item xs={4}>
              <Button
                fullWidth
                style={{ height: "80px" }}
                className={classes.addButton}
                variant="outlined"
                onClick={handleClickOpen}
              >
                + Create Flashcard
              </Button>

              <Progress
                x={cards.length}
                y={cardgroup.numberOfCardsDue}
                body="You've created"
                style={{ margin: "40px 0px" }}
              />

              {isAdmin ? (
                <div>
                  <Typography variant="subtitle2">
                    Admin Functionality for This Cardgroup:
                  </Typography>
                  <Divider />
                  <Button
                    fullWidth
                    style={{ height: "60px", margin: "10px 0" }}
                    className={classes.delButton}
                    variant="contained"
                    onClick={handleDelete}
                  >
                    Delete cardgroup and all cards
                  </Button>
                  <Button
                    fullWidth
                    style={{ height: "60px", margin: "10px 0" }}
                    color="primary"
                    variant="contained"
                    onClick={handleEdit}
                  >
                    Edit Cardgroup
                  </Button>
                </div>
              ) : (
                <div></div>
              )}
            </Grid>
            <Grid item xs={7}></Grid>
          </Grid>
        ) : (
          <div>suo</div>
        )}
      </PageWrapper>
    );
};

export default CardGroupPage;

import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PageWrapper } from "../../static/wrappers";
import { getUserPeerreviews } from "../../store/actions/peerreviewActions";
import CreatePeerreview from "../dialogs/createPeerreview";
import PeerreviewList from "../submodules/peerreviewList";

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

const PeerReview = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const peerreviews = useSelector(
    (state) => state.peerreviewReducer.peerreviews
  );
  const isAdmin = useSelector((state) => state.authReducer.adminMode);
  const [cardgroups, setCardgroups] = useState([]);

  useEffect(() => {
    dispatch(getUserPeerreviews());
  }, [dispatch]);

  const history = useHistory();

  const handleRedirect = (peerreviewid) => {
    history.push("/peerreview/" + peerreviewid);
  };

  useEffect(() => {
    if (peerreviews.length) {
      setCardgroups(
        peerreviews.map((p) => {
          return p.cardgroup;
        })
      );
    }
  }, [peerreviews]);

  return (
    <PageWrapper>
      <CreatePeerreview open={open} onClose={() => setOpen(false)} />

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom>
            Peer Review of Flashcards
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Rate other students' cards
          </Typography>
        </Grid>
        <Grid item xs={4}>
          {isAdmin ? (
            <Button
              fullWidth
              className={classes.addButton}
              variant="outlined"
              onClick={() => setOpen(true)}
            >
              + Add Peer Review Session
            </Button>
          ) : (
            <div></div>
          )}
        </Grid>

        <Grid item xs={12}>
          <PeerreviewList peerreviews={peerreviews} onClick={handleRedirect} />
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default PeerReview;

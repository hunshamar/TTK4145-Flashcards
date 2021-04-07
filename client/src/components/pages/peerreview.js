import { PageWrapper } from "../../static/wrappers";
import { Divider, Grid, makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import GroupView from "../submodules/groupview";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadCardgroups } from "../../store/actions/cardgroupActions";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import CreatePeerreview from "../dialogs/createPeerreview";
import { getUserPeerreviews } from "../../store/actions/peerreviewActions";
import PeerreviewView from "../submodules/peerReviewView";

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
  const isAdmin = useSelector((state) => state.authReducer.isAdmin);
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
          <PeerreviewView peerreviews={peerreviews} onClick={handleRedirect} />
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default PeerReview;

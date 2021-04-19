import {
  CardActionArea,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { dateJSONToString } from "../../utils/datehandling";
import Loading from "../notifications/loading";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";
import CreatePeerreview from "../dialogs/createPeerreview";
import { deletePeerreview } from "../../store/actions/peerreviewActions";
import { errorAlert } from "../../store/actions/alertActions";
const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const PeerreviewList = ({ peerreviews, showDueDate, onClick }) => {
  const classes = useStyles();
  const loading = useSelector((state) => state.loadingReducer.loading);
  const isAdmin = useSelector((state) => state.authReducer.adminMode);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const deleteThisPeerReview = (peerreview) => {
    console.log("asd", peerreview);

    const name = window.prompt(
      "Are you sure you want to delete this peerreview and all ratings accociated with it? If so write the name of the cardgroup below"
    );

    console.log(name);
    console.log(peerreview.cardgroup.title);
    if (name === peerreview.cardgroup.title) {
      dispatch(deletePeerreview(peerreview.cardgroup.id));
    } else {
      dispatch(errorAlert("error deleting peerreview"));
    }
  };

  const [editPeerreview, setEditPeerreview] = useState({});

  const editThisPeerReview = (peerreview) => {
    console.log("edit", peerreview);
    setEditPeerreview(peerreview);

    setOpen(true);
    // setEditCard(card);
    // setOpenEdit(true);
  };

  if (false) {
    return <Loading />;
  } else {
    return (
      <div>
        <Divider />
        <CreatePeerreview
          open={open}
          onClose={() => setOpen(false)}
          toEditPeerreview={editPeerreview}
        />
        {loading ? (
          <Loading />
        ) : (
          <Grid container spacing={0}>
            {peerreviews.length ? (
              peerreviews.map((peerreview) => (
                <Grid item xs={12} key={peerreview.id}>
                  <Grid container spacing={2}>
                    <Grid item xs={isAdmin ? 11 : 12}>
                      <CardActionArea
                        onClick={() => onClick(peerreview.id)}
                        style={{ padding: "10px", minHeight: "100px" }}
                      >
                        <Typography variant="subtitle1" component="h2">
                          Peer Review of cards from{" "}
                          <i>{peerreview.cardgroup.title} </i>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="h2"
                        >
                          {peerreview.reviewsDue} Cards are due for peer review:{" "}
                          {dateJSONToString.call(this, peerreview.dueDate)}
                        </Typography>
                      </CardActionArea>
                    </Grid>
                    {isAdmin ? (
                      <Grid item xs={1} className={classes.root}>
                        <Tooltip
                          title="Edit Peerreview"
                          placement="right"
                          style={{ margin: "3px" }}
                        >
                          <IconButton
                            onClick={() => editThisPeerReview(peerreview)}
                          >
                            <EditIcon style={{ fontSize: "medium" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title="Delete Peerreview"
                          placement="right"
                          style={{ margin: "3px" }}
                        >
                          <IconButton
                            onClick={() => deleteThisPeerReview(peerreview)}
                          >
                            <DeleteIcon style={{ fontSize: "medium" }} />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    ) : null}
                  </Grid>
                  <Divider />
                </Grid>
              ))
            ) : (
              <Typography variant="subtitle1"> No peer reviews due</Typography>
            )}
          </Grid>
        )}
      </div>
    );
  }
};

export default PeerreviewList;

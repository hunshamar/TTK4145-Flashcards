import { useState } from "react";
import {
  Card,
  Divider,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core/";
import { deleteCard } from "../../store/actions/cardActions";
import loadingReducer from "../../store/reducers/loadingReducer";
import Loading from "../notifications/loading";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CardPreviewDialog from "../dialogs/cardPreviewDialog";
import FlashcardStudy from "./flashcardStudy";
import CreateCardDialog from "../dialogs/createCardDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const CardView = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editCard, setEditCard] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const loading = useSelector((state) => state.loadingReducer.loading);

  const previewThisCard = (card) => {
    setEditCard(card);
    setOpenPreview(true);
    // dispatch(deleteCard(card))
  };

  const deleteThisCard = (card) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      dispatch(deleteCard(card));
    }
  };

  const editThisCard = (card) => {
    console.log("edit", card);
    setEditCard(card);
    setOpenEdit(true);
  };
  console.log("car1ds", props.cards);

  let cardItems = [];
  if (props.cards.length) {
    props.cards.map(
      (card, index) =>
        (cardItems[index] = (
          <Grid item xs={12}>
            <Card key={card.id} style={{ margin: "10px" }}>
              <Grid container spacing={1}>
                <Grid item xs={1}></Grid>
                <Grid
                  item
                  xs={10}
                  onClick={() => previewThisCard(card)}
                  style={{}}
                >
                  <FlashcardStudy flashcard={card} revealback={true} />
                </Grid>
                <Grid item xs={1} className={classes.root}>
                  <Tooltip
                    title="Edit Flashcard"
                    placement="right"
                    style={{ margin: "3px" }}
                  >
                    <IconButton onClick={() => editThisCard(card)} size="small">
                      <EditIcon style={{ fontSize: "20px" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Delete Flashcard"
                    placement="right"
                    style={{ margin: "3px" }}
                  >
                    <IconButton
                      onClick={() => deleteThisCard(card)}
                      size="small"
                    >
                      <DeleteIcon style={{ fontSize: "20px" }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <CardPreviewDialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        card={editCard}
      />
      {/* <FlashcardForm open={openEdit} onClose={() => setOpenEdit(false)}  card={editCard}  /> */}
      <CreateCardDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        card={editCard}
      />

      {cardItems.length ? (
        <Grid container spacing={0}>
          {cardItems}
        </Grid>
      ) : (
        <div style={{ color: "grey", marginTop: "150px" }}>
          <Typography variant="h5">No cards</Typography>
          <Typography variant="body1">
            Create flashcards using the <i>Create Flashcard</i> button
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CardView;

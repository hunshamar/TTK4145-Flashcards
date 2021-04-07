import { PageWrapper } from "../../static/wrappers";
import { useDispatch, useSelector } from "react-redux";
import userReducer from "../../store/reducers/userReducer";
import { useEffect } from "react";
import { getUsersStatus } from "../../store/actions/userActions";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import CardgroupSelect from "../submodules/cardgroupselect";
import { useState } from "react";
import { Button, Grid, Typography, makeStyles } from "@material-ui/core";
import {
  addCardsToCollectiveDeck,
  loadCardgroupFlashcards,
  removeCardsFromCollectiveDeck,
} from "../../store/actions/cardActions";
import CardDialog from "../dialogs/cardDialog";
import Loading from "../notifications/loading";

// const useStyles = makeStyles(theme => ({

// }))

const AllCards = () => {
  // const classes = useStyles()
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cardReducer.cards);
  const [openCard, setOpenCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const loading = useSelector((state) => state.loadingReducer.loading);

  const [cardGroupId, setCardGroupId] = useState(0);

  useEffect(() => {
    dispatch(loadCardgroupFlashcards(cardGroupId));
    console.log("status");
  }, [dispatch, cardGroupId]);

  console.log("cards");
  console.log(cards);

  const columns = [
    { field: "id", headerName: "id", width: 65 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "front", headerName: "Front", width: 100 },
    { field: "back", headerName: "Back", width: 100 },
    { field: "nRatings", headerName: "n_ratings", width: 120 },
    { field: "averageRating", headerName: "rating avg", width: 120 },
    { field: "averageDifficulty", headerName: "difficulty avg", width: 120 },
    { field: "duplicates", headerName: "duplicate ids", width: 140 },
    { field: "collectiveDeckId", headerName: "Collective Deck", width: 110 },
  ];

  let rows = [];
  if (cards.length) {
    rows = cards.map((c) => {
      let duplicates_string = c.duplicates.map((d) => d.id).join(",");
      console.log(duplicates_string);
      return {
        id: c.id,
        name: c.user ? c.user.name : "",
        username: c.user ? c.user.username : "",
        front: c.front,
        back: c.back,
        nRatings: c.nRatings,
        averageRating: c.averageRating,
        averageDifficulty: c.averageDifficulty,
        collectiveDeckId: c.collectiveDeckId,
        duplicates: duplicates_string,
      };
    });
  }

  const handleClick = (e, a) => {
    // e.preventdefault()
    a.preventDefault();

    console.log("print", e.row);
    setSelectedCard(e.row);
    setOpenCard(true);
  };

  const addToCollectiveDeck = () => {
    const cardIdArr = selectionModel.map((id) => {
      return { id: id };
    });
    dispatch(addCardsToCollectiveDeck(cardIdArr));
    setSelectionModel([]);
  };

  const removeFromCollectiveDeck = () => {
    const cardIdArr = selectionModel.map((id) => {
      return { id: id };
    });
    dispatch(removeCardsFromCollectiveDeck(cardIdArr));
    setSelectionModel([]);
  };

  const [selectionModel, setSelectionModel] = useState([]);

  console.log("seal", selectionModel);

  console.log("cgid", cardGroupId);
  return (
    <PageWrapper>
      <CardDialog
        open={openCard}
        onClose={() => setOpenCard(false)}
        card={selectedCard}
      />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CardgroupSelect onChange={setCardGroupId} showFirst />
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={removeFromCollectiveDeck}
          >
            Remove {selectionModel.length} Cards from the Collective Deck
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={addToCollectiveDeck}
          >
            Add {selectionModel.length} Selected Cards to Collective Deck
          </Button>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <Loading />
          ) : cards.length ? (
            <DataGrid
              // className={classes.inCollective}
              checkboxSelection
              pageSize={5}
              autoHeight
              disableSelectionOnClick={true}
              rowsPerPageOptions={[5, 10, 20, 50, 100, 500, 1000]}
              onRowClick={handleClick}
              rows={rows}
              columns={columns}
              selectionModel={selectionModel}
              onSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection.selectionModel);
              }}
            />
          ) : (
            "No flashcards for this cardgroup found"
          )}
        </Grid>
      </Grid>

      {/* </div> */}
    </PageWrapper>
  );
};

export default AllCards;

// import {useDispatch, useSelector} from "react-redux"
// import { useEffect } from 'react';
// import { loadCards, loadCardgroupFlashcards } from '../../store/actions/cardActions';
// import CardView from '../submodules/cardview';
// import {PageWrapper} from "../../static/wrappers"

// const AllCards = props => {

//     const cards = useSelector(state => state.cardReducer.cards)

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(loadCards())
//     }, [dispatch])

//     return(
//         <PageWrapper>
//             <CardView cards={cards}/>
//         </PageWrapper>
//     )
// }

// export default AllCards

import {
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageWrapper } from "../../static/wrappers";
import {
  loadCardgroupFlashcardsWithMinRating,
  addCardsToCollectiveDeck,
  loadCardgroupFlashcards,
  removeCardsFromCollectiveDeck,
} from "../../store/actions/cardActions";
import AdminCardDialog from "../dialogs/adminCardDialog";
import Loading from "../notifications/loading";
import CardgroupSelect from "../submodules/cardgroupselect";

const AllCards = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cardReducer.cards);
  const [openCard, setOpenCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [onlyShowQualityCards, setOnlyShowQualityCards] = useState(false);

  const loading = useSelector((state) => state.loadingReducer.loading);

  const [cardGroupId, setCardGroupId] = useState(0);
  const [minRating, setMinRating] = useState(6.5);

  useEffect(() => {
    if (onlyShowQualityCards) {
      let removeDuplicates = true;
      dispatch(
        loadCardgroupFlashcardsWithMinRating(
          cardGroupId,
          minRating,
          removeDuplicates
        )
      );
    } else {
      dispatch(loadCardgroupFlashcards(cardGroupId));
    }
  }, [dispatch, cardGroupId, onlyShowQualityCards, minRating]);

  const columns = [
    { field: "id", headerName: "id", width: 65 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "nRatings", headerName: "n_ratings", width: 120 },
    { field: "averageRating", headerName: "rating avg", width: 120 },
    { field: "averageDifficulty", headerName: "difficulty avg", width: 120 },
    { field: "duplicates", headerName: "duplicate ids", width: 140 },
    { field: "collectiveDeckId", headerName: "Collective Deck", width: 110 },
    { field: "front", headerName: "Front", width: 100 },
    { field: "back", headerName: "Back", width: 100 },
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
    a.preventDefault();
    setSelectedCard(e.row);
    setOpenCard(true);
  };

  const addToCollectiveDeck = () => {
    const cardIdArr = selectionModel.map((id) => {
      return { id };
    });
    dispatch(addCardsToCollectiveDeck(cardIdArr));
    setSelectionModel([]);
  };

  const removeFromCollectiveDeck = () => {
    const cardIdArr = selectionModel.map((id) => {
      return { id };
    });
    dispatch(removeCardsFromCollectiveDeck(cardIdArr));
    setSelectionModel([]);
  };

  const [selectionModel, setSelectionModel] = useState([]);

  console.log("seal", selectionModel);

  console.log("cgid", cardGroupId);
  return (
    <PageWrapper>
      <AdminCardDialog
        open={openCard}
        onClose={() => setOpenCard(false)}
        card={selectedCard}
      />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CardgroupSelect
            onChange={setCardGroupId}
            showFirst
            id={cardGroupId}
          />
        </Grid>

        <Grid item xs={10}>
          <FormControlLabel
            control={
              <Switch
                checked={onlyShowQualityCards}
                onChange={() => setOnlyShowQualityCards(!onlyShowQualityCards)}
                color="primary"
              />
            }
            label={`Only Show Flashcards with Rating higher than ${minRating} (only duplicate cards with highest ratings are selected)`}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            color="secondary"
            id="outlined-number"
            label="Rating >="
            type="number"
            InputProps={{ minRating: { min: 1, max: 10, step: 0.1 } }}
            value={minRating}
            required
            onChange={(e) => setMinRating(e.target.value)}
            variant="outlined"
          />
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

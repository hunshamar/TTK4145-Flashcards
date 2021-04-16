import { Divider, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageWrapper } from "../../static/wrappers";
import { clearCardReducer } from "../../store/actions/cardActions";
import { loadPeerreview } from "../../store/actions/peerreviewActions";
import { getRatingsInPeerreview } from "../../store/actions/ratingActions";
import CardPreviewDialog from "../dialogs/cardPreviewDialog";
import Loading from "../notifications/loading";
import Progress from "../submodules/progress";
import RateFlashcard from "../submodules/rateFlashcard";

const useStyles = makeStyles((theme) => ({
  savebutton: {
    // margin: theme.spacing.unit, // You might not need this now
    // position: "fixed",
    // width: "300px",
    // bottom: theme.spacing.unit * 2
  },
}));

const PeerReviewGroup = (props) => {
  const classes = useStyles();

  const peerreviewId = props.match.params.id;

  const ratings = useSelector((state) => state.ratingReducer.ratings);
  const [save, setSave] = useState(false);

  const [previewCard, setPreviewCard] = useState({});
  const [openPreview, setOpenPreview] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCardReducer());
    dispatch(loadPeerreview(peerreviewId));
    // dispatch(loadPeerReviewFlashcards(peerreviewId))  # remove from actions
    dispatch(getRatingsInPeerreview(peerreviewId));
  }, []);

  // const cards = useSelector(state => state.cardReducer.cards)
  const peerreview = useSelector(
    (state) => state.peerreviewReducer.peerreviews[0]
  );

  console.log("mhmhmhm", ratings);

  const loading = useSelector((state) => state.loadingReducer.loading);

  useEffect(() => {
    if (!loading) {
      setSave(false);
    }
  }, [loading]);

  useEffect(() => {
    console.log("tiss");
    console.log(ratings);
  }, [ratings]);

  const saveAllRatings = () => {
    console.log("save...");
    setSave(true);
  };

  const testFunc = (props) => {
    console.log("test:", props);
  };

  const openPreviewCard = (card) => {
    setPreviewCard(card);
    setOpenPreview(true);
  };

  // const cardIdToIndex = id => {
  //     console.log(id)
  //     return cards.map(function(x) {return x.id; }).indexOf(id)+1;
  // }

  if (!peerreview) {
    return (
      <PageWrapper>
        <Loading />
      </PageWrapper>
    );
  } else {
    return (
      <PageWrapper>
        <CardPreviewDialog
          open={openPreview}
          onClose={() => setOpenPreview(false)}
          card={previewCard}
        />
        <Typography variant="h4">Peer Review of Cards from </Typography>
        <Typography variant="h4">{peerreview.cardgroup.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {peerreview.reviewsDue} cards are due to be rated. Read the question,
          attempt to answer it to yourself, then you may reveal the answer.
          After testing the card, you are to rate the card
          <br />
          If the card is hard to read, press "FULL CARD VIEW" button for a full
          preview of the card. <br />
          <br />
          <br />
          <b>Level of Difficulty</b> A rating on the difficulty of the card.
          From extremely easy to extremely hard.
          <br />
          <b>Relevance and Quality</b> A rating of how relevant the card is to
          the course curriculum and the quality of the flashcard. Will studying
          this card be useful for learning the course material? Is the question
          well-phrased? Is it too long and complex? Is it original?
          <br />
          <b>Mark as Duplicate</b> If two or more cards are very similar or
          duplicate of each other, press "mark as duplicate" on one of the cards
          and choose one or more of the other cards. Marking as duplicate goes
          both ways, but this is handled automatically.
          <br /> <br />
          {/* <b>Overall quality</b> The overall quality of the flashcard. Is the question well phrased? Is it too long and complex? Is it original? This rating can be more subjective. <br/> */}
        </Typography>
        <Progress
          x={
            ratings.filter(
              (rating) => rating.difficulty > 0 && rating.quality_rating > 0
            ).length
          }
          y={peerreview.reviewsDue}
          body="Card ratings submitted"
          style={{ width: "300px", marginLeft: "auto", marginBottom: "30px" }}
        />
        <Divider />

        {ratings.length ? (
          ratings.map((rating, i) => (
            <React.Fragment>
              <RateFlashcard
                key={rating.id}
                rating={rating}
                index={i + 1}
                save={save}
                previewCard={openPreviewCard}
              />
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <div>empty</div>
        )}
      </PageWrapper>
    );
  }
};

export default PeerReviewGroup;

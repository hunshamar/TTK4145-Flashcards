
import { useSelector } from 'react-redux';
import React, {useState} from "react"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadCards, loadCardgroupFlashcards, loadPeerReviewFlashcards, clearCardReducer } from '../../store/actions/cardActions';
import RateCard from '../submodules/rateCard';
import { Box, Button, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { PageWrapper } from "../../static/wrappers";
import { loadCardgroup } from '../../store/actions/cardgroupActions';
import Loading from '../notifications/loading';
import loadingReducer from '../../store/reducers/loadingReducer';
import  SaveIcon  from '@material-ui/icons/Save';
import CardgroupSelect from '../submodules/cardgroupselect';
import { loadPeerreview } from '../../store/actions/peerreviewActions';
import Progress from '../submodules/progress';
import ratingReducer from '../../store/reducers/ratingReducer';
import { getRatingsInPeerreview } from '../../store/actions/ratingActions';
import CardPreviewDialog from '../dialogs/cardPreviewDialog';

const useStyles = makeStyles(theme => ({
    savebutton: {
        // margin: theme.spacing.unit, // You might not need this now
        // position: "fixed",
        // width: "300px",
        // bottom: theme.spacing.unit * 2
      },
}))

const PeerReviewGroup = (props) =>{

    const classes = useStyles()

    const peerreviewId = props.match.params.id


    const ratings = useSelector(state => state.ratingReducer.ratings)
    const [save, setSave] = useState(false) 

    const [previewCard, setPreviewCard] = useState({})
    const [openPreview, setOpenPreview] = useState(false)

    const dispatch = useDispatch() 
    useEffect(() => {
        dispatch(clearCardReducer())
        dispatch(loadPeerreview(peerreviewId))
        dispatch(loadPeerReviewFlashcards(peerreviewId))  
        dispatch(getRatingsInPeerreview(peerreviewId))
    }, [])

    const cards = useSelector(state => state.cardReducer.cards)
    const peerreview = useSelector(state => state.peerreviewReducer.peerreviews[0])


    console.log("mhmhmhm")

    const loading = useSelector(state => state.loadingReducer.loading)

    useEffect(() => {
        if (!loading){
            setSave(false)
        }
    }, [loading])

    useEffect(() => {
        console.log("tiss")
        console.log(ratings)
    }, [ratings])

    const saveAllRatings = () => {
        console.log("save...")
        setSave(true)
    }

    const testFunc = props => {
        console.log("test:", props)
    }

    const openPreviewCard = card => {
        setPreviewCard(card)
        setOpenPreview(true)   
    }

    const cardIdToIndex = id => {
        console.log(id)
        return cards.map(function(x) {return x.id; }).indexOf(id)+1;
    }
    

    if (!cards.length){
        return(
            <PageWrapper>
                <Loading />
            </PageWrapper>
        )
    }
    else {
        return (
            <PageWrapper>
                <CardPreviewDialog open={openPreview} onClose={() => setOpenPreview(false)} card={previewCard}  />
                <Typography  variant="h4" >Peer Review of Cards from </Typography>
                <Typography  variant="h4" >{peerreview.cardgroup.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                {peerreview.reviewsDue} cards are due to be rated. Read the question, attempt to answer it to yourself, 
                then you may reveal the answer. After testing the card, you are to rate it based on three criteria, try to be objective<br/> 
                    If the card is hard to read, press "FULL CARD VIEW"  button for a full preview of the card. <br/>
                    <u>Remember to save ratings before exiting this page.</u>
                    <br/><br/>
                    <b>Level of Difficulty</b> An objective rating on the difficulty of the card. From extremely easy to extremely hard.<br/>
                    <b>Relevance and Quality</b> A rating of how relevant the card is to the course curriculum and the quality of the flashcard. Will studying
                     this card be useful for learning the course material? Is the question well-phrased? Is it too long and complex? Is it original?
                    <br/>
                    <b>Mark as Duplicate</b>  If two or more cards are very similar or duplicate of each other, press "mark as duplicate" on one of the cards and
                     choose one or more of the other cards.
                     <br/> <br/>

                    {/* <b>Overall quality</b> The overall quality of the flashcard. Is the question well phrased? Is it too long and complex? Is it original? This rating can be more subjective. <br/> */}

                </Typography>
                    <Progress x={ratings.length} y={peerreview.reviewsDue} body="Card ratings submitted" style={{width: "300px", marginLeft: "auto", marginBottom: "30px"}} />
                <Divider />
                
                {cards.length ? 
                
                cards.map((card, i) => 
                    <React.Fragment>
                        <RateCard key={card.id} card={card} index={i+1} save={save} cardIdToIndex={cardIdToIndex} previewCard={openPreviewCard}  />
                        <Divider />
                    </React.Fragment>
                ) : <div>empty</div>}
                
                <div style={{margin: "10px", textAlign: "left"}}>
{/*                 
                <Grid container spacing={2}>
                    <Grid item xs={12}>     */}
                    <div style={{padding: "0 200px"}}>
                    <Button color="primary" fullWidth variant="contained" onClick={saveAllRatings}  className={classes.savebutton}>
                        Save Ratings<Loading style={{marginLeft: "10px", height: "26px", }} size={24} alternative={<SaveIcon />} /> 
                    </Button> <br/>
                    </div>
                    
                    {/* </Grid>
                    <Grid item xs={6}> 
                    </Grid>
                </Grid> */}

                </div>
            </PageWrapper>
        )
    }
}

export default PeerReviewGroup
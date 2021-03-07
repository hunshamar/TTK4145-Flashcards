
import { useSelector } from 'react-redux';
import React, {useState} from "react"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadCards, loadCardgroupFlashcards } from '../../store/actions/cardActions';
import RateCard from '../submodules/rateCard';
import { Box, Button, Divider, Typography } from '@material-ui/core';
import { PageWrapper } from "../../static/wrappers";
import { loadCardgroup } from '../../store/actions/cardgroupActions';
import Loading from '../notifications/loading';
import loadingReducer from '../../store/reducers/loadingReducer';
import  SaveIcon  from '@material-ui/icons/Save';
import CardgroupSelect from '../submodules/cardgroupselect';

const PeerReviewGroup = (props) =>{
    const groupId = props.match.params.id

    const cards = useSelector(state => state.cardReducer.cards)
    const cardgroup = useSelector(state => state.cardgroupReducer.cardgroups[0])

    const [save, setSave] = useState(false) 

    const dispatch = useDispatch() 
    useEffect(() => {
        dispatch(loadCardgroupFlashcards(groupId))  
        dispatch(loadCardgroup(groupId))
    }, [])

    console.log(cards)

    const loading = useSelector(state => state.loadingReducer.loading)

    useEffect(() => {
        if (!loading){
            setSave(false)
        }
    }, [loading])

    const saveAllRatings = () => {
        console.log("save...")
        setSave(true)
    }

    const testFunc = props => {
        console.log("test:", props)
    }

    

    if (!cards || !cardgroup){
        return(
            <Loading />
        )
    }
    else {
        return (
            <PageWrapper>
                <Typography  variant="h4" >Peer Review of Cards from </Typography>
                <Typography  variant="h4" >{cardgroup.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                (find amount) number of cards are due to be rated. Read the question, attempt to answer it to yourself, 
                then you may reveal the answer. After testing the card, you are to rate it based on three criteria, try to be objective:
                    <br/> <br/>
                    <b>Level of Difficulty</b> An objective rating on whether the difficulty of the card is appropriate. Too easy or too hard? Rate the card low. 
                    Good level of difficulty? Rate the card high. <br/>
                    <b>Relevance and Quality</b> A rating of how relevant the card is to the course curriculum and the quality of the flashcard. Will studying
                     this card be useful for learning the course material? Is the question well-phrased? Is it too long and complex? Is it original?
                    the cource material? Is the question well phrased? Is it too long and complex? Is it original?<br/>
                    <b>Mark as Duplicate</b>  If two or more cards are very similar or duplicate of each other, press "mark as duplicate" on one of the cards and
                     choose one or more of the other cards.

                    {/* <b>Overall quality</b> The overall quality of the flashcard. Is the question well phrased? Is it too long and complex? Is it original? This rating can be more subjective. <br/> */}

                </Typography>
                <Box mb={5} />



                <Divider />
                
                {cards.length ? 
                
                cards.map((card, i) => 
                    <React.Fragment>
                        <RateCard key={card.id} card={card} index={i+1} save={save} />
                        <Divider />
                    </React.Fragment>
                ) : <div>empty</div>}
                
                <div style={{margin: "10px", textAlign: "left"}}>
                
                <Button color="primary" variant="contained" onClick={saveAllRatings} >
                    Save Ratings<Loading style={{marginLeft: "10px", height: "26px", }} size={24} alternative={<SaveIcon />} /> 
                </Button> <br/>


                </div>
            </PageWrapper>
        )
    }
}

export default PeerReviewGroup

import { useSelector } from 'react-redux';
import React from "react"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadCards, loadCardgroupFlashcards } from '../../store/actions/cardActions';
import RateCard from '../submodules/rateCard';
import { Box, Divider, Typography } from '@material-ui/core';
import { PageWrapper } from "../../static/wrappers";
import { loadCardgroup } from '../../store/actions/cardgroupActions';

const PeerReviewGroup = (props) =>{
    const groupId = props.match.params.id

    const cards = useSelector(state => state.cardReducer.cards)
    const cardgroup = useSelector(state => state.cardgroupReducer.cardgroups[0])

    const dispatch = useDispatch() 
    useEffect(() => {
        dispatch(loadCardgroupFlashcards(groupId))  
        dispatch(loadCardgroup(groupId))
    }, [])

    console.log(cards)

    return (
        <PageWrapper>
            <Typography  variant="h4" >Peer Review of Cards from </Typography>
            <Typography  variant="h4" >{cardgroup.title}</Typography>
            <Typography variant="body2" color="textSecondary">
                (find amount) number of cards are due to be rated. Read the question, attemt to answer it to yourself, then you may reveal the answer. 
                After testing the card, you are to rate it based on three criterias, try to be objective:
                <br/> <br/>
                <b>Level of difficulty</b> An objective rating on whether the difficulty of the card is appropiate. Too easy or too hard? Rate the card low.
                 Good level of difficulty? Rate the card high. <br/>
                 <b>Relevance and Quality</b> A rating of how relevant the card is to the cource curriculum and the quaility of the flashcard. Will studying this card be useful for learning 
                 the cource material? Is the question well phrased? Is it too long and complex? Is it original?<br/>

                 {/* <b>Overall quality</b> The overall quality of the flashcard. Is the question well phrased? Is it too long and complex? Is it original? This rating can be more subjective. <br/> */}

            </Typography>
            <Box mb={5} />



            <Divider />
            
            {cards.length ? 
            
            cards.map((card, i) => 
                <React.Fragment>
                    <RateCard card={card} index={i+1} />
                    <Divider />
                </React.Fragment>
             ) : <div>empty</div>}
        </PageWrapper>
    )
}

export default PeerReviewGroup
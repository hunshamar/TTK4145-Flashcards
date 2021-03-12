import { CardActionArea, Divider, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loadingReducer from '../../store/reducers/loadingReducer';
import Loading from '../notifications/loading';
import { dateJSONToString } from '../../utils/datehandling';




const PeerreviewView = ({peerreviews, showDueDate, onClick}) => {

    const loading = useSelector(state => state.loadingReducer.loading)   

    if (loading){
        return <Loading />
    }
    else {
        return(
            <div>
                <Divider   /> 
                <Grid container spacing={0}>
                    <Divider   /> 

                    {peerreviews.length ? 
                    peerreviews.map((peerreview) => (
                        <Grid item xs={12} key={peerreview.id}> 
                            <CardActionArea onClick={() => onClick(peerreview.id)} style={{padding: "10px", minHeight: "100px"}}>
                                <Grid container spacing={2} >
                                    <Grid item xs={12}>                        
                                        <Typography variant="subtitle1" component="h2">
                                            Peer Review of cards in {peerreview.cardgroup.title}     
                                        </Typography>
                                            <Typography variant="body2" color="textSecondary" component="h2">
                                                {peerreview.reviewsDue} Cards are due for peer review: {dateJSONToString.call(this, peerreview.dueDate)} from this chapter   
                                            </Typography> 
                                    </Grid>
                                </Grid>
                            </CardActionArea> 
                            <Divider   /> 
                        </Grid>)) : <Typography variant="subtitle1"> No peer reviews due</Typography> } 
                
                </Grid>
            </div>
        )
    }
}

export default PeerreviewView
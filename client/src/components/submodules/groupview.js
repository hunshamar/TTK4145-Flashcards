import { Box, CardActionArea, Divider, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loadingReducer from '../../store/reducers/loadingReducer';
import Loading from '../notifications/loading';
import { dateJSONToString } from '../../utils/datehandling';
import AddIcon from '@material-ui/icons/Add';



const GroupView = ({cardgroups, showDueDate, onClick}) => {

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

                    {cardgroups.length ? 
                    cardgroups.map((cardgroup) => (
                        <Grid item xs={12} key={cardgroup.id}> 
                            <CardActionArea onClick={() => onClick(cardgroup.id)} style={{padding: "10px", minHeight: "100px"}}>
                                <Grid container spacing={2} >
                                    <Grid item xs={1} alignItems="center">
                                        <AddIcon color="textprimary" style={{marginTop: "10px"}} />
                                    </Grid>


                                    <Grid item xs={11}>                        
                                        <Typography variant="subtitle1" component="h2">
                                            Add flashcards to <i>{cardgroup.title}    </i> 
                                        </Typography>
                                        {showDueDate ? 
                                            <Typography variant="body2" color="textSecondary" component="h2">
                                                {cardgroup.numberOfCardsDue} cards are due: {dateJSONToString.call(this, cardgroup.dueDate)}     
                                            </Typography> : <div></div>}
                                    </Grid>
                                </Grid>
                            </CardActionArea> 
                            <Divider   /> 
                        </Grid>)) : <Typography variant="subtitle1"> No groups</Typography> } 
                
                </Grid>
            </div>
        )
    }
}

export default GroupView
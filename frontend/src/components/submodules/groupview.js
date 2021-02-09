import { Card, CardActionArea, Grid, IconButton, makeStyles, styled, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadCardgroups, deleteCardgroup } from '../../store/actions/cardgroupActions';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const StyledCard = styled(Card)({
    
});

const useStyles = makeStyles(theme => ({
    customHoverFocus: {
      "&:hover, &.Mui-focusVisible": { backgroundColor: theme.palette.hover}
    }
  }));

const GroupView = ({cardgroups}) => {

    const [redirectToGroupWithId, setredirectToGroupWithId] = useState(-1)
    const classes = useStyles();

    const dispatch = useDispatch();

    

    const deleteThisCardgroup = (e, cardgroup) => {
        console.log("--delete")
        dispatch(deleteCardgroup(cardgroup))   
        e.stopPropagation() // Make sure handleClick, resulting in redirect, of parent component is not propogated
        
    }

    const handleClick = (e, groupId) => {
        console.log("redirect")
        console.log(groupId)
        setredirectToGroupWithId(groupId)
    }

    

    let cardgroupItems = cardgroups.map((cardgroup) => (
        <Grid item xs={12} key={cardgroup.id}> 
            <StyledCard >
                <CardActionArea onClick={e => handleClick(e, cardgroup.id)} className={classes.customHoverFocus} style={{padding: "10px", minHeight: "100px"}}>
                <Grid container spacing={2} >
                    <Grid item xs={10}>
                        
                        <Typography variant="h5" component="h2">
                            {cardgroup.title}     
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="h2">
                            Due: {cardgroup.dueDate}     
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick = {e => deleteThisCardgroup(e, cardgroup)} > 
                            <DeleteIcon style={{fontSize: "20px"}} /> 
                        </IconButton>
                    </Grid>
                </Grid>
                </CardActionArea> 
            </StyledCard>     
        </Grid>
    ))

    if (redirectToGroupWithId > 0) {
        return( 
          <Redirect to={{
            pathname: "/cardgroup/" +redirectToGroupWithId
          }}/>  
        )
      }
    else if (cardgroupItems){
        return(
            <Grid container spacing={2}>
                {cardgroupItems}
            </Grid>
        )
    } else{
        return (
            <div></div>
        )
    }

}

export default GroupView
import { Card, CardActionArea, Divider, Grid, IconButton, makeStyles, styled, Typography } from '@material-ui/core';
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

    const dateToString = date => {
        console.log("ddatee")
        console.log(date)
        try{
            let a = new Date(date.year, date.month-1, date.date, date.hour, date.minute)
            console.log("aa", a)
            // return a.getUTCMonth()
            return a.toString()
        }
        catch{
            return "Date error"
        }
    }
    

    let cardgroupItems = cardgroups.map((cardgroup) => (
        <Grid item xs={12} key={cardgroup.id}> 
                <CardActionArea onClick={e => handleClick(e, cardgroup.id)} className={classes.customHoverFocus} style={{padding: "10px", minHeight: "100px"}}>
                <Grid container spacing={2} >
                    <Grid item xs={10}>
                        
                        <Typography variant="subtitle1" component="h2">
                            {cardgroup.title}     
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="h2">
                            {cardgroup.numberOfCardsDue} cards are due: {dateToString.call(this, cardgroup.dueDate)}     
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick = {e => deleteThisCardgroup(e, cardgroup)} > 
                            <DeleteIcon style={{fontSize: "20px"}} /> 
                        </IconButton>
                    </Grid>
                </Grid>
                </CardActionArea> 
                <Divider   /> 
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

            <div>
            <Divider   /> 
            <Grid container spacing={0}>
                 
                 <Divider   /> 
                {cardgroupItems}
                
            </Grid>
            </div>
        )
    } else{
        return (
            <div>empty</div>
        )
    }

}

export default GroupView
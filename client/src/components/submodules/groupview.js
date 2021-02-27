import { CardActionArea, Divider, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loadingReducer from '../../store/reducers/loadingReducer';
import Loading from '../notifications/loading';




const GroupView = ({cardgroups}) => {

    const loading = useSelector(state => state.loadingReducer.loading)

    const [redirectToGroupWithId, setredirectToGroupWithId] = useState(-1)

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
                <CardActionArea onClick={e => handleClick(e, cardgroup.id)} style={{padding: "10px", minHeight: "100px"}}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>                        
                        <Typography variant="subtitle1" component="h2">
                            {cardgroup.title}     
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="h2">
                            {cardgroup.numberOfCardsDue} cards are due: {dateToString.call(this, cardgroup.dueDate)}     
                        </Typography>
                    </Grid>
                </Grid>
                </CardActionArea> 
                <Divider   /> 
        </Grid>
    ))

    if (loading){
        return <Loading />
    }
    else if (redirectToGroupWithId > 0) {
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
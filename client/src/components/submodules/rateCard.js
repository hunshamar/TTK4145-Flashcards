
import { Button, Card, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import { getRating, saveRating } from '../../store/actions/ratingActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ratingReducer from '../../store/reducers/ratingReducer';
import loadingReducer from '../../store/reducers/loadingReducer';
import Loading from '../notifications/loading';
import { SET_ALERT } from '../../store/actionTypes';
const useStyles = makeStyles(theme => ({
    container: {
        padding: "10px",
        minHeight: "150px",
        margin: "10px 0",
    },
    duplicateButton: {
        fontSize: "10px",
        marginTop: "10px"
    },
    body:{
        minHeight: "100px",
    }
}))

const RateCard = ({card, index, save}) => {

    const classes = useStyles()
    const [flipped, setFlipped] = useState(false);

    const [difficulty, setDifficulty] = useState(0)
    const [relevance, setRelevance] = useState(0)
    const [saveDate, setSaveDate] = useState("");

    const loading = useSelector(state => state.loadingReducer.loading)


    const [quality, setQuality] = useState(0)
    const dispatch = useDispatch() 

    const rating = useSelector(state => state.ratingReducer.ratings.find(rating => rating.card.id == card.id))
    
    

    useEffect(() => {
        console.log("fml")
        dispatch(getRating(card.id))     
    }, [])


    useEffect(() => {
        if (rating){
            setDifficulty(rating.difficulty)    
            setQuality(rating.quality_rating)
            setSaveDate(rating.savedatestring)
        }
    }, [rating])

    useEffect(() => {
        if(save){
            submitRating()
        }
    }, [save])



    const markAsDuplicate = () => {
        console.log("duplicate")
        alert("Mark as duplicate not yet implemented")
        // setDifficulty(5)
    }

    const submitRating = () => {

        if (difficulty && quality){
            console.log("rate")
            const rating = {
                difficulty,
                quality,
                cardId: card.id
            }                  
            dispatch(saveRating({rating, cardNumber: index}))
            }
        else {
        }
    }

    return(
        <Grid className={classes.container} container spacing={2}>
                <Grid item xs={1}>       
                        <Typography variant="subtitle2">#</Typography>
                        <Typography variant="body2">{index}</Typography>
                </Grid>
                <Grid item xs={3}>       
                        <Typography variant="subtitle2">Question</Typography>
                        <Typography variant="body2">{card.front}</Typography>
                </Grid>
                
                <Grid item xs={5}>       
                        <Typography variant="subtitle2">{flipped ? "Answer" : "Reveal Answer"}</Typography>
                        {flipped ? 
                            <Typography className={classes.body} variant="body2"> {flipped ? card.back : "" }</Typography>
                        :
                            <div></div>
                        }


                        <Tooltip title={flipped ? "Hide Answer" : "Reveal Answer"} placement="right">
                            <IconButton onClick={() => setFlipped(!flipped)} variant={"outlined"}  className={classes.revealButton} size="small">                           
                                {flipped ? <VisibilityOffIcon size="small" color="primary" /> : <VisibilityIcon size="small"  color="primary"/>}
                            </IconButton>
                        </Tooltip>
                        
                        
                </Grid>
                <Grid item xs={3}>       
                        <Typography variant="subtitle2">Rate</Typography> 
                        <Typography variant="body2"> Difficulty</Typography> 
                        <Rating 
                            value={difficulty/2}
                            precision={0.5}
                            size="small"
                            onChange={(event, newValue) => {
                                setDifficulty(2*newValue);
                            }}
                        />
                        
                        <Typography variant="body2">Relevance and Quality</Typography> 
                        <Rating 
                            value={quality/2}
                            precision={0.5}
                            size="small"
                            onChange={(event, newValue) => {
                                setQuality(2*newValue);
                            }}
                        />

                        {/* <Typography variant="body2">Overall quality</Typography> 
                        <Rating 
                            value={quality}
                            precision={0.5}
                            size="small"
                            onChange={(event, newValue) => {
                                setQuality(newValue);
                            }}
                        /> */}
                         <Button className={classes.duplicateButton} onClick={markAsDuplicate} variant="contained" color="primary" size="small" endIcon={<MoodBadIcon />} >                           
                            Mark as duplicate
                        </Button>

                </Grid>

                <Grid item xs={12} style={{height: "24px"}}>
                    <Typography variant="caption" color="textSecondary" >{saveDate ? "Last saved "+saveDate : ""} </Typography> 
                </Grid>
                {/* <Grid item xs={2} style={{textAlign: "center"}}>     
                    <Typography variant="subtitle2">Save Rating</Typography>  
                    <IconButton size="small" color="primary" onClick={submitRating}>
                        {loading  ? <Loading color="primary" size="24px"  /> : <SaveIcon size="small"/>} 
                    </IconButton> 
                </Grid> */}
        </Grid>
    )
}

export default RateCard
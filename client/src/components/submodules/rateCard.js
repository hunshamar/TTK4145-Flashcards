
import { Button, Card, Tooltip, Grid, IconButton, Typography, Box, TextField } from '@material-ui/core';
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
import MarkAsDuplicatedDialog from '../dialogs/markAsDuplicateDialog';
import DivHTMLSanatized from './divHTMLSanitized';
const useStyles = makeStyles(theme => ({
    duplicateButton: {
        fontSize: "10px",
        marginTop: "10px"
    },
    marked: {
        backgroundColor: theme.palette.backgroundHover,
    },
    body:{
        minHeight: "100px",
    }
}))

const difficultyLabels = {
    0.5: 'Extremely Easy',
    1: 'Very Easy',
    1.5: 'Easy',
    2: 'A Little Easy',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'A Little Hard',
    4.0: 'Hard',
    4.5: 'Very Hard',
    5: 'Extremely Hard',
  };

  const qualityLabels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

const RateCard = ({card, index, save, previewCard, cardIdToIndex}) => {

    const classes = useStyles()
    const [flipped, setFlipped] = useState(false);

    const [difficulty, setDifficulty] = useState(0)
    const [hoverDifficulty, setHoverDifficulty] = useState(-1);
    

    const [relevance, setRelevance] = useState(0)
    const [saveDate, setSaveDate] = useState("");

    const [duplicateCardIds, setDuplicateCardIds] = useState([])
    const [openMarkAsDuplicated, setOpenMarkAsDuplicated] = useState(false)
    const loading = useSelector(state => state.loadingReducer.loading)


    const [quality, setQuality] = useState(0)
    const [hoverQuality, setHoverQuality] = useState(-1);
    const dispatch = useDispatch() 

    const rating = useSelector(state => state.ratingReducer.ratings.find(rating => rating.card_id == card.id))
    
    

    useEffect(() => {
        console.log("fml")
        dispatch(getRating(card.id))     
    }, [])


    useEffect(() => {
        if (rating){
            setDifficulty(rating.difficulty)    
            setQuality(rating.quality_rating)
            setSaveDate(rating.savedatestring)
            console.log("hiiieeer")
            console.log(rating)
            setDuplicateCardIds(rating.duplicates)
        }
    }, [rating])

    useEffect(() => {
        if(save){
            submitRating()
        }
    }, [save])

    const markAsDuplicate = () => {
        setOpenMarkAsDuplicated(true)
    }

    const submitRating = () => {

        if (difficulty && quality){
            console.log("rate this card")
            const rating = {
                difficulty,
                quality,
                duplicateCardIds,
                cardId: card.id
            }                  
            dispatch(saveRating({rating, cardNumber: index}))
            }
        else {
        }
    }

    return(
        <Box className={openMarkAsDuplicated ? classes.marked : ""} style={{padding: "20px 10px"}}>
        <Grid className={classes.container} container spacing={2} >
                <MarkAsDuplicatedDialog 
                    open={openMarkAsDuplicated} 
                    onClose={()=>setOpenMarkAsDuplicated(false)}
                    duplicateCards={duplicateCardIds} 
                    setDuplicateCards={setDuplicateCardIds}
                    flashcard={card}
                      />
                
                <Grid item xs={1}>       
                        <Typography variant="subtitle2">#</Typography>
                        <Typography variant="body2">{index}</Typography>
                </Grid>
                <Grid item xs={4}>       
                        <Typography variant="subtitle2">Question</Typography>
                        <Typography variant="body2">                      
                                <DivHTMLSanatized text={card.front} style={{overflow: "hidden"}}/>
                        </Typography>
                </Grid>
                
                <Grid item xs={4} >       
                        <Typography variant="subtitle2">{flipped ? "Answer" : "Reveal Answer"}</Typography>
                        {flipped ? 
                            <Typography className={classes.body} variant="body2"> {flipped ?     
                                <DivHTMLSanatized text={card.back} style={{overflow: "hidden"}}/>
                                : "" }</Typography>
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

                        <Tooltip title={difficultyLabels[hoverDifficulty]} placement="right"> 
                            <Rating 
                                value={difficulty/2}
                                precision={0.5}
                                size="small"
                                onChange={(event, newValue) => {
                                    setDifficulty(2*newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHoverDifficulty(newHover);
                                }}
                            />
                        </Tooltip>


                        {/* {difficulty/2 !== null && <Box ml={2}>{difficultyLabels[hovedDifficulty !== -1 ? hovedDifficulty : difficulty/2]}</Box>}  */}
                        
                        <Typography variant="body2">Relevance and Quality</Typography> 
                        <Tooltip title={qualityLabels[hoverQuality]} placement="right"> 
                            <Rating 
                                value={quality/2}
                                precision={0.5}
                                size="small"
                                onChange={(event, newValue) => {
                                    setQuality(2*newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHoverQuality(newHover);
                                }}
                            />
                        </Tooltip>

                        {/* <Typography variant="body2">Overall quality</Typography> 
                        <Rating 
                            value={quality}
                            precision={0.5}
                            size="small"
                            onChange={(event, newValue) => {
                                setQuality(newValue);
                            }}
                        /> */}  
                        <Typography variant="body2">Duplicate Card{duplicateCardIds.length >= 2 ? "s" : ""}: </Typography> 
                        <Box  style={{minHeight: "30px", minWidth: "30px"}}>
                        <Typography variant="body2" color="textSecondary">{duplicateCardIds.map(d => <b>#{cardIdToIndex(d)}{", "}</b>)} </Typography> 
                        </Box>
                            

                         <Button className={classes.duplicateButton} onClick={markAsDuplicate} variant="contained" color="primary" fullWidth endIcon={<MoodBadIcon />} >                           
                            Mark as duplicate
                        </Button>


                </Grid>

                <Grid item xs={9} >
                    <Typography variant="caption" color="textSecondary" >{saveDate ? "Last saved "+saveDate : ""} </Typography> 
                </Grid>
                <Grid item xs={3} >
                        <Button fullWidth variant="outlined" color="secondary" onClick = {() => previewCard(card)} endIcon={<VisibilityIcon /> }>
                            Full Card View
                        </Button>
                </Grid>
                        
                {/* <Grid item xs={2} style={{textAlign: "center"}}>     
                    <Typography variant="subtitle2">Save Rating</Typography>  
                    <IconButton size="small" color="primary" onClick={submitRating}>
                        {loading  ? <Loading color="primary" size="24px"  /> : <SaveIcon size="small"/>} 
                    </IconButton> 
                </Grid> */}
        </Grid>
        </Box>
    )
}

export default RateCard
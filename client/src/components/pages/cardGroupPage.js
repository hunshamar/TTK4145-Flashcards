
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadCardGroupUserFlashcards } from '../../store/actions/cardActions';
import CardView from '../submodules/cardview';
import { deleteCardgroup, loadCardgroup } from '../../store/actions/cardgroupActions';
import { Button, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import CreateCardDialog from '../dialogs/createCardDialog';
import {PageWrapper} from "../../static/wrappers"
import authReducer from '../../store/reducers/authReducer';
import loadingReducer from '../../store/reducers/loadingReducer';
import Loading from '../notifications/loading';
import userReducer from '../../store/reducers/userReducer';
import { Redirect } from 'react-router-dom';
import { dateJSONToString } from '../../utils/datehandling';
import Progress from '../submodules/progress';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    addButton: {
        backgroundColor: theme.palette.button.success.main,
        color: "white",
        border: "none",
        align: "center",
        '&:hover': {
            background: theme.palette.button.success.dark,
          }
    },
    delButton: {
        backgroundColor: theme.palette.button.error.main,
        color: "white",
        border: "none",
        align: "center",
        '&:hover': {
            background: theme.palette.button.error.dark,
          }
    },
 
}))


const CardGroupPage = props => {
    console.log("prop")
    console.log(props.match.params)

    const classes = useStyles()

    const isAdmin = useSelector(state => state.authReducer.isAdmin)

    const cards = useSelector(state => state.cardReducer.cards)
    const cardgroup = useSelector(state => state.cardgroupReducer.cardgroups[0])
    const user = useSelector(state => state.authReducer.loggedInUser)
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const loading = useSelector(state => state.loadingReducer.loading)

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = (value) => {
        setOpen(false);
      };

    const  history = useHistory()
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete cardgroup with all cards?")){ 
            dispatch(deleteCardgroup(cardgroup))
            history.push("/addcards")
        }

    }

    console.log("cardgr.:")
    console.log(cardgroup)
    
    useEffect(() => {
        console.log("stuff and things") 
        console.log(cardgroup)
        dispatch(loadCardGroupUserFlashcards(props.match.params.id))       
        dispatch(loadCardgroup(props.match.params.id))
    }, [dispatch, props.match.params.id])   
 
    if (loading){
        return (
            <PageWrapper>
                <Loading />
            </PageWrapper>    
        )
    }
    else return(
        <PageWrapper>
            <CreateCardDialog open={open} onClose={handleClose} cardgroupId={props.match.params.id} />           

            {cardgroup ? 
            <Grid container spacing={6}>
                <Grid item xs={8}>
                    <Typography variant="h4">Add Flashcards to {cardgroup.title}</Typography>
                    <Typography variant="body2">{cardgroup.numberOfCardsDue} cards are due {dateJSONToString(cardgroup.dueDate)}
                     </Typography>

                    <div style={{marginTop: "40px"}}>
                     <CardView cards={cards}/>
                     </div>
                </Grid>

                
                
                <Grid item xs={4}>
                    <Button fullWidth style={{height: "80px"}} className={classes.addButton} variant="outlined" onClick={handleClickOpen}>
                    + Add Flashcard
                    </Button> 

                    <Progress x={cards.length} y={cardgroup.numberOfCardsDue} body="You've created" style={{margin: "40px 0px"}} />


                    {isAdmin ? 
                    <Button fullWidth style={{height: "80px"}} className={classes.delButton} variant="outlined" onClick={handleDelete}>
                        Delete cardgroup and all cards
                    </Button> : <div></div>}
                </Grid>
                <Grid item xs={7}>
                    
                </Grid>

            </Grid> : <div>suo</div> }




            


            

        </PageWrapper>
    )

  
}

export default CardGroupPage
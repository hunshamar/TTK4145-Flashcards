
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadCards } from '../store/actions/cardActions';
import CardView from './submodules/cardview';
import { loadCardgroup } from '../store/actions/cardgroupActions';
import cardgroupReducer from '../store/reducers/cardgroupReducer';
import { Button, Divider, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import CreateCardDialog from './dialogs/createCardDialog';

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
    progressBar: {
        "& .MuiLinearProgress-barColorPrimary" : {
            backgroundColor: theme.palette.button.success.main
        }
    }
}))


const CardGroupPage = props => {

    const classes = useStyles()

    

    const cards = useSelector(state => state.cardReducer.cards)
    const cardgroup = useSelector(state => state.cardgroupReducer.cardgroups[0])
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const percentage = Math.round(100*(cards.length / cardgroup.numberOfCardsDue))


    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = (value) => {
        setOpen(false);
      };

    console.log("cardgr.:")
    console.log(cardgroup)
    
    useEffect(() => {
        console.log("stuff and things")
        dispatch(loadCards(props.match.params.id))       
        dispatch(loadCardgroup(props.match.params.id))
    }, [])   

    const date = cardgroup.dueDate
    let a = new Date(date.year, date.month-1, date.date, date.hour, date.minute)
    console.log("aa", a)


    return(
        <div>
            <CreateCardDialog open={open} onClose={handleClose} cardgroupId={props.match.params.id} />


            

            <Grid container spacing={6}>
                <Grid item xs={8}>
                    <Typography variant="h3">{cardgroup.title}</Typography>
                    <Typography variant="body1">{cardgroup.numberOfCardsDue} cards are due 
                     {" "+a.toString()}
                     </Typography>

                    <div style={{marginTop: "60px"}}>
                     <CardView cards={cards}/>
                     </div>
                </Grid>
                
                
                <Grid item xs={4}>
                    <Button fullWidth style={{height: "80px"}} className={classes.addButton} variant="outlined" onClick={handleClickOpen}>
                    + Add Flashcard
                    </Button> 
                    <Grid container style={{margin: "30px 0", border: "0px solid black"}}>
                        <Grid item xs={8}>
                            <Typography variant="body1">You've created</Typography>
                            <Typography variant="body1">{cards.length} of {cardgroup.numberOfCardsDue}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                           <Typography variant="h4">{percentage}%</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <LinearProgress className={classes.progressBar} variant="determinate" value={percentage} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={7}>
                    
                </Grid>

            </Grid>




            


            

        </div>
    )

  
}

export default CardGroupPage
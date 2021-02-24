import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import GroupView from "../submodules/groupview";
import { loadCardgroups } from "../../store/actions/cardgroupActions";
import {Typography, Button, Grid, makeStyles} from '@material-ui/core';
import {PageWrapper} from "../../static/wrappers"
import CreateCardGroup from "../dialogs/createCardGroup";
import { adminOnly } from "../../store/actions/authActions";
import authReducer from '../../store/reducers/authReducer';

const useStyles = makeStyles(theme => ({
    addButton: {
        backgroundColor: theme.palette.button.success.main,
        color: "white",
        border: "none",
        align: "center",
        '&:hover': {
            background: theme.palette.button.success.dark,
          }

    }
}))



const Home = () => {

    const classes = useStyles()
    const dispatch = useDispatch();
   
    const cardgroups = useSelector(state => state.cardgroupReducer.cardgroups)
    const isAdmin = useSelector(state => state.authReducer.isAdmin)
    
    useEffect(() => {
        dispatch(loadCardgroups())
    }, [dispatch])   

    useEffect(() => {
        console.log("cardgroups changed...")
    }, [cardgroups])   

    const [open, setOpen] = React.useState(false);
    // const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
    };


  



    return (
        // <div style={{maxWidth: "600px", marginTop: "65px", marginLeft: "auto", marginRight: "auto"}}>
        <PageWrapper>

        <Grid container spacing={2}>
            <Grid item xs={8}  >
                <Typography variant="h4" gutterBottom >
                    Cardgroups    
                </Typography>
            </Grid>
            <Grid item xs={4}>
                {isAdmin ?                 
                <Button fullWidth className={classes.addButton} variant="outlined" onClick={handleClickOpen}>
                    + Create group
                </Button> :
                <div></div>}
            </Grid> 
            <Grid item xs={12}>
                <GroupView cardgroups={cardgroups}/>
            </Grid> 
        </Grid>
    
        
    <CreateCardGroup open={open} onClose={handleClose} />
    </PageWrapper>
        
    )
}

export default Home
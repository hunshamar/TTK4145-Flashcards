import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from 'axios';
import { Redirect } from "react-router-dom"
import authReducer from '../store/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { signInCallack, checkLogInStatus } from '../store/actions/authActions';
import GroupView from "./submodules/groupview";
import { loadCardgroups } from "../store/actions/cardgroupActions";
import cardgroupReducer from '../store/reducers/cardgroupReducer';

import {Divider, Typography, Button, Grid, IconButton, makeStyles} from '@material-ui/core';

import {wrapper} from "../static/wrappers"
import CreateCardGroup from "./dialogs/createCardGroup";

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
    
    // fetch("/api/login/callback",
    // { credentials: 'include' }).then(response => {
    //     return response.text()
    // }).then(data => {
    // })



    const [userInfo, setUserInfo] = useState({})
    const [numberOfCards, setNumberOfCards] = useState(3)
    const [redirectToNewPage, setredirectToNewPage] = useState(false)


    // useEffect(async () => {

    //     axios.get("/api/login/callback", { withCredentials: true })
    //     .then(response => {
    //         let user_token = response.data
    //         localStorage.setItem("user_token", user_token)
    //         showUserInformation()
    //     })
    // }, [])

    const loggedIn = useSelector(state => state.authReducer.loggedIn)
    const loggedInuser = useSelector(state => state.authReducer.loggedInUser)
    const dispatch = useDispatch();
   


    const submitCardForm = e => {
        e.preventDefault()
        setredirectToNewPage(true)
    }

    const cardgroups = useSelector(state => state.cardgroupReducer.cardgroups)
    
    useEffect(() => {
        dispatch(loadCardgroups())
    }, [])   

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
  

    if (redirectToNewPage) {
        return (
            <Redirect to={{
                pathname: "/cardCreator",
                state: { numberOfCards: numberOfCards }
            }} />
        )
    }

    return (
        <div>

        <Grid container spacing={2}>
            <Grid item xs={8}  >
                <Typography variant="h4" gutterBottom >
                    Cardgroups    
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Button fullWidth className={classes.addButton} variant="outlined" onClick={handleClickOpen}>
                    + Create group
                </Button> 
            </Grid> 
            <Grid item xs={12}>
                <GroupView cardgroups={cardgroups}/>
            </Grid> 
        </Grid>
    
        
    <CreateCardGroup open={open} onClose={handleClose} />
        </div>
    )
}

export default Home
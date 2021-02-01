
import React, {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import  { Redirect, Link, NavLink } from 'react-router-dom'

import axios from 'axios';
import {AppBar, Tabs, Tab, Avatar} from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { useDispatch, useSelector } from "react-redux";
import { checkLogInStatus, signInCallack, signOut } from '../../store/actions/authActions';

const Navbar = props => {

    const [name, setName] = useState("")
    const [redirectLogIn, setRedirectLogin] = useState(false)

        

    const loggedIn = useSelector(state => state.authReducer.loggedIn)
    const dispatch = useDispatch();      

    // useEffect(() => {
    //     dispatch(checkLogInStatus())
    //     console.log("is logged", loggedIn)
    // }, [loggedIn])   

    // useEffect(() => {
    //     dispatch(signInCallack())
    //     console.log("is logged", loggedIn)
    // }, [loggedIn])   


    // useEffect(() => {

    //     axios.get("http://localhost:5000/api/getcurrentuser", {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("user_token")}`
    //         }
    //     }).then(res => {
    //         console.log(res.data.name)
    //         console.log(res.data.email)
    //         console.log(res.data.username)
    //         setName(res.data.name)
    //     })})

    const logOut = () => {
        console.log("logging out yes!!!")
        dispatch(signOut())
        setRedirectLogin(true)
    }

 

    return(
        <AppBar position="static">
                    <Toolbar>
        <Typography variant="h6" style={{flexGrow: 0}}>
        Flashcardstuff
        </Typography>

        <List style={{textColor: "white", display: "flex"}}>
            <ListItem>
                <NavLink style={{color: "white", whiteSpace: "nowrap"}} to="/"> {loggedIn ? "Home" : "Log in"}</NavLink>
            </ListItem>
            <ListItem>
                <NavLink style={{color: "white"}} to="/showCards"> Cards</NavLink>
            </ListItem>
            <ListItem>
                <NavLink style={{color: "white", whiteSpace: "nowrap"}} to="/createCard"> Create card</NavLink>
            </ListItem>
        </List>


            <div style={{marginLeft: "auto"}}>
                
                {loggedIn ? 
                    <div>
                        <Button style={{color: "white"}} onClick={logOut}><Link style={{color: "white"}} to="/">Log Out</Link></Button> 
                    </div>
                    :                    
                    <span>not logged in </span> }
            </div>
        </Toolbar>
        </AppBar>
    )



}



export default Navbar
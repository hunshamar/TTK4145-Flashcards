
import React, {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import  { Redirect, Link } from 'react-router-dom'

import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



const Navbar = props => {

    const [name, setName] = useState("")
    const [redirectLogIn, setRedirectLogin] = useState(false)

    useEffect(() => {

        axios.get("http://localhost:5000/api/getcurrentuser", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("user_token")}`
            }
        }).then(res => {
            console.log(res.data.name)
            console.log(res.data.email)
            console.log(res.data.username)
            setName(res.data.name)
        })})

    const LogOut = () => {
        console.log("logging out")
        setRedirectLogin(true)
    }

    if (redirectLogIn) {
        setRedirectLogin(false)
        return( 
          <Redirect to={{
            pathname: "/"
          }}/>  
        )
      }

    return(
        <AppBar position="static">
                    <Toolbar>
        <IconButton edge="start"  color="inherit" aria-label="menu">
        <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{flexGrow: 1}}>
        Flashcardstuff
        </Typography>
        
            {name ? "Logged in user: " + name : "not logged in"}

            <Button href="/" color="inherit" style={{marginLeft: "100px"}}> LOG OUT</Button>
        </Toolbar>
        </AppBar>
    )


    if (props.loggedin){
        return(
            <div> logged in {name}</div>
        )
    }
    else{
        return(
            <div> Not logged in </div>
        )
    }


}



export default Navbar

import React, {useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import  { Redirect, NavLink, Link } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {AppBar, Menu, MenuItem} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useDispatch, useSelector } from "react-redux";
import { signOut } from '../../store/actions/authActions';
import { NavBarWrapper } from "../../static/wrappers";


const useStyles = makeStyles(theme => ({ 
    link: {
        color: theme.palette.textColor,
        textDecoration: "none"
    },
    navbar: {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        textColor: "white",
    }
}));



const UserMenu  = (props) => {
    const classes = useStyles()

    const user = useSelector(state => state.authReducer.loggedInUser)
    const dispatch = useDispatch();    

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const logOut = () => {
        console.log("out")
        dispatch(signOut())
        handleClose();
    }

    const handleMode = () => {
        props.setDarkMode()
    }

    console.log(user)
    if (!user.username){
        console.log("true")    

        return(
            <Redirect 
                to="/"
            /> 
        )
    }
    
    if (user.username) {return(
        <div>
        <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <AccountCircleIcon />
            
            <div style={{marginLeft: "5px"}}> 
                {user.username}
            </div>
            <ExpandMoreIcon />
        </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
            <Link to={"/userprofile/"+user.username} className={classes.link}  >
                <MenuItem onClick={handleClose}>
                    <PersonIcon /> My Profile
                </MenuItem>
            </Link>
            <MenuItem onClick={handleMode}>            
                  <Brightness4Icon />
                  Toggle Dark Mode
            </MenuItem>

            <MenuItem onClick={logOut}>
                <ExitToAppIcon /> Logout
                </MenuItem>
      </Menu>


        </div>
    )}
    else return (
        <NavLink style={{color: "white", whiteSpace: "nowrap"}} to="/"> Log in</NavLink>
    )
    
}

const Navbar = props => {

    const classes = useStyles();
    const [redirectLogIn, setRedirectLogin] = useState(false)       
    const loggedIn = useSelector(state => state.authReducer.loggedIn)
    const isAdmin = useSelector(state => state.authReducer.isAdmin)

    
    if (redirectLogIn && !loggedIn) {
        setRedirectLogin(false)
        return( 
          <Redirect to={{
            pathname: "/"
          }}/>  
        )
      }

    else return(

        <AppBar position="static" style={{}}>
       

        <NavBarWrapper className={classes.navbar}>
                    <Toolbar style={{padding: 0}}>
                        
        <Typography variant="h6" style={{flexGrow: 0}}>
        TTK4145 Flashcards
        </Typography>
        


        <List style={{textColor: "white", display: "flex"}}>
            

            {loggedIn ?  

            <React.Fragment>
                <ListItem>
                    <NavLink style={{color: "white", whiteSpace: "nowrap"}} to="/"> {loggedIn ? "Home" : "Log in"}</NavLink>
                </ListItem>
                {isAdmin ? 
                <ListItem>
                    <NavLink style={{color: "white", whiteSpace: "nowrap"}} to="/adminpage"> Admin Page</NavLink>
                </ListItem> : <div></div> }
            </React.Fragment>
            :
            <div></div>
            }

        </List>


            <div style={{marginLeft: "auto"}}>                
                <UserMenu setDarkMode={props.setDarkMode}></UserMenu>
            </div>
        </Toolbar>
        </NavBarWrapper>
         </AppBar>
    )
}

export default Navbar
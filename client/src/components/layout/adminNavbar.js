
import React, {useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import  { Redirect, NavLink, Link } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {AppBar, ButtonGroup, Menu, MenuItem} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useDispatch, useSelector } from "react-redux";
import { signOut } from '../../store/actions/authActions';
import { NavBarWrapper } from "../../static/wrappers";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";


const useStyles = makeStyles(theme => ({ 
    navlink: {
        color: theme.palette.textColor,
        textDecoration: "none"
    },
    button: {
        width: "200px",
        height: "50px",
    }
}));





const AdminNavbar = props => {

    const classes = useStyles()
    
    const [alignment, setAlignment] = React.useState(1);


    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
      };

    return( 
        <NavBarWrapper style={{marginTop: "20px"}}>

            <Typography variant="h4" style={{flexGrow: 0}}>
        Amin Page
        </Typography>

                    <Toolbar style={{padding: 0}}>                        
           
                    <ToggleButtonGroup
                    fullWidth
      value={alignment}
      exclusive
      onChange={handleAlignment}    
      aria-label="text alignment"
    >
            <ToggleButton component={Link} value={1} to="/adminpage/users" className={classes.button} variant="outlined"> Users </ToggleButton>
            <ToggleButton component={Link} value={2} to="/adminpage/deliverystatus" className={classes.button} variant="outlined"> Delivery status </ToggleButton>
            <ToggleButton component={Link} value={3} to="/adminpage/page3" className={classes.button} variant="outlined"> Page3 </ToggleButton>
            

            </ToggleButtonGroup>  
        
        </Toolbar>
        </NavBarWrapper>
    )
}

export default AdminNavbar
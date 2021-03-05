
import React, {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import  { Redirect, NavLink, Link, useHistory } from 'react-router-dom'
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
import { NavBarWrapper, PageWrapper } from "../../static/wrappers";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";


const useStyles = makeStyles(theme => ({ 
    navlink: {
        color: theme.palette.textColor,
        textDecoration: "none"
    },
    button: {
        width: "250px",
        height: "50px",
    }
})); 


const AdminNavbar = props => {

    const classes = useStyles()    
    const [alignment, setAlignment] = React.useState(0);
    const history = useHistory() 
    const urls=[
        {
            url: "/adminpage/users",
            label: "Admin Page"
        },
        {
            url: "/adminpage/deliverystatus",
            label: "Delivery Status"
        },
        {
            url: "/adminpage/allcards",
            label: "All Cards"
        },
    ]

    useEffect(() => {
        setAlignment(urls.findIndex(x => x.url === history.location.pathname))
    }, [history.location.pathname])


    
    return( 
        <PageWrapper>

            <Typography variant="h4" style={{flexGrow: 0}}>
                Amin Page
            </Typography>

            <Toolbar style={{padding: 0}}>                        
                <ToggleButtonGroup
                    fullWidth
                    value={alignment}
                    exclusive  
                    aria-label="text alignment"
                >
                    {urls.map((url, index) => 
                        <ToggleButton component={Link} value={index} to={url.url} className={classes.button} variant="outlined">{url.label}</ToggleButton> 
                    )}        
                </ToggleButtonGroup>  
            </Toolbar>
        </PageWrapper>
    )
}

export default AdminNavbar
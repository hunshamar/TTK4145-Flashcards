
import React, {useEffect} from "react"
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Home from "./components/home"
import Login from "./components/login"
import AllCards from './components/allCards';
// import CreateCardgroup from "./components/createCardgroup"
import logInFunc from './components/loginfunc';
import { checkLogInStatus } from "./store/actions/authActions";
import { useDispatch, useSelector } from 'react-redux';
import CardGroupPage from './components/cardGroupPage';
import { makeStyles } from "@material-ui/core";
import UserProfile from "./components/userProfile.js";

const useStyles = makeStyles(theme => ({
    // pages: {
    //     paddingLeft: "auto",
    //     paddingRight: "auto",
    //     alignItems: "center",
    //     display: "flex",
    //     paddingTop: theme.values.siteTopMargin        
    // }

})); 

const Routes = () => {

    const classes = useStyles()
    const loggedIn = useSelector(state => state.authReducer.loggedIn)
    const dispatch = useDispatch();     
    
    useEffect(() => {
        dispatch(checkLogInStatus())
        console.log("is logged", loggedIn)
    }, [loggedIn])   

    // get log in status

    return(
        <div className={classes.pages}>
            <Switch>
                <Route path="/" exact component={loggedIn ? Home : Login}/>
                <Route path="/loginfunc" exact component={logInFunc}/>

                {loggedIn ? 
                <React.Fragment>
                    <Route path="/allcards" exact component={AllCards} />
                    <Route path="/cardgroup/:id" exact component={CardGroupPage} />
                    <Route path="/userprofile/:username" exact component={UserProfile} />
                </React.Fragment>
                :
                <Redirect to={{
                    pathname: "/"
                }} /> }  
            </Switch>
        </div>
    )
}

export default Routes
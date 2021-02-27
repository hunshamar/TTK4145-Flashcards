
import React, {useEffect} from "react"
import { BrowserRouter as Redirect, Route, Switch } from "react-router-dom";

import Home from "./components/pages/home"
import Login from "./components/pages/login"
import AllCards from './components/adminpages/allCards';
// import CreateCardgroup from "./components/createCardgroup"
import logInFunc from './components/loginfunc';
import { checkLogInStatus } from "./store/actions/authActions";
import { useDispatch, useSelector } from 'react-redux';
import CardGroupPage from './components/pages/cardGroupPage';
import { makeStyles } from "@material-ui/core";
import UserProfile from "./components/pages/userProfile.js.js";
import AdminCardGroupPage from './components/adminpages/adminCardgroupPage';
import Users from "./components/adminpages/users";
import AdminNavbar from './components/layout/adminNavbar';
import AdminPage from "./components/adminpages/adminPage";
import DeliveryStatus from './components/adminpages/deliveryStatus';

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
    const isAdmin = useSelector(state => state.authReducer.isAdmin)
    const dispatch = useDispatch();     
    
    useEffect(() => {
        if (loggedIn){
            dispatch(checkLogInStatus())
            console.log("is logged", loggedIn)
            console.log("is admin", isAdmin)
        }
    }, [loggedIn, dispatch])   

    // get log in status

    return(
        <div className={classes.pages}>
            <Switch>
                <Route path="/" exact component={loggedIn ? Home : Login}/>
                <Route path="/loginfunc" exact component={logInFunc}/>
                <Route path="/cardgroup/:id" exact component={CardGroupPage} />

                {loggedIn ? 
                <React.Fragment>
                    <Route path="/userprofile/:username" exact component={UserProfile} />
                    {isAdmin ? 
                    <React.Fragment>
                        {/* <Route path="/adminpage" exact component={AdminPage} /> */}
                    
                        <Route
                            path="/adminpage"
                            render={({ match: { url } }) => (
                            <>
                                <AdminNavbar />    
                                <Route path={`${url}/`} component={AdminPage} exact />
                                <Route path={`${url}/users`} component={Users} />
                                <Route path={`${url}/deliverystatus`} component={DeliveryStatus} />
                                <Route path={`${url}/allcards`} component={AllCards} />
                            </>
                            )}
                        />
                    </React.Fragment>
                     :    
                    <React.Fragment>
                    </React.Fragment>}
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
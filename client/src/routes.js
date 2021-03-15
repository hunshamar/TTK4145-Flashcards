
import React, {useEffect} from "react"
import { BrowserRouter as Redirect, Route, Switch } from "react-router-dom";

import AddCards from "./components/pages/addCards"
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
import PeerReview from "./components/pages/peerreview";
import PeerReviewGroup from "./components/pages/peerReviewGroup";
import Study from "./components/pages/study";
import Home from './components/pages/home';
import HTMLGuide from "./components/pages/HTMLGuide";



const useStyles = makeStyles(theme => ({
    // pages: {
    //     paddingLeft: "auto",H
    //     paddingRight: "auto",
    //     alignItems: "center",
    //     display: "flex",
    //     paddingTop: theme.values.siteTopMargin        
    // }

})); 

const FML = () => {

    return (
        <div>FML</div>
    )
}

const Routes = () => {

    const classes = useStyles()
    const loggedIn = useSelector(state => state.authReducer.loggedIn)
    const isAdmin = useSelector(state => state.authReducer.isAdmin)
    const dispatch = useDispatch();     
    
    useEffect(() => {
        dispatch(checkLogInStatus())
        console.log("is logged", loggedIn)
        console.log("is admin", isAdmin)            
        
    }, [loggedIn, dispatch])   

    // get log in status

   

    return(
        <div className={classes.pages}>
            <Switch>
                <Route path="/" exact component={loggedIn ? Home : Login}/>
                <Route path="/loginfunc" exact component={logInFunc}/>
                <Route path="/htmlguide" exact component={ HTMLGuide} />

                {loggedIn ? 
                <React.Fragment>

                    <Route path="/addcards" exact component={AddCards}/>
                    <Route path="/cardgroup/:id" exact component={CardGroupPage} />
                    <Route path="/peerreview" exact component={PeerReview}/>
                    <Route path="/peerreview/:id" exact component={PeerReviewGroup}/>
                    <Route path="/study" exact component={Study}/>
                    <Route path="/about" exact component={ FML} />
                    <Route path="/userprofile/:username" exact component={UserProfile} />
                    {isAdmin ? 
                    <React.Fragment>
                        {/* <Route path="/adminpage" exact component={AdminPage} /> */}
                    
                        <Route
                            path="/adminpage"
                            render={({ match: { url } }) => (
                            <>
                                <AdminNavbar />    
                                <Route path={`${url}/`} exact component={AdminPage}  />
                                <Route path={`${url}/users`} exact component={Users} />
                                <Route path={`${url}/deliverystatus`} exact component={DeliveryStatus} />
                                <Route path={`${url}/allcards`} exact component={AllCards} />
                            </>
                            )}
                        />
                    </React.Fragment>
                     :    
                    <React.Fragment>
                    </React.Fragment>}
                </React.Fragment> : <div></div>}
            </Switch>
        </div>
    )
}

export default Routes
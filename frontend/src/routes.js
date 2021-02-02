
import React, {useEffect} from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/home"
import Login from "./components/login"
import CardCreator from "./components/cardCreator"
import ShowCards from './components/showCards';
import CreateCard from './components/createCard';
import CreateCardgroup from "./components/createCardgroup"
import logInFunc from './components/loginfunc';
import { checkLogInStatus } from "./store/actions/authActions";
import { useDispatch, useSelector } from 'react-redux';

const Routes = () => {

    const loggedIn = useSelector(state => state.authReducer.loggedIn)
    const dispatch = useDispatch();     
    
    useEffect(() => {
        dispatch(checkLogInStatus())
        console.log("is logged", loggedIn)
    }, [loggedIn])   

    // get log in status

    return(
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={loggedIn ? Home : Login}/>
                <Route path="/loginfunc" exact component={logInFunc}/>
                <Route path="/cardCreator" exact component={CardCreator}/>
                <Route path="/createCard" exact component={CreateCard}/>
                <Route path="/createCardgroup" exact component={CreateCardgroup}/>
                <Route path="/showCards" exact component={ShowCards} />
            </Switch>
        </React.Fragment>
    )
}

export default Routes
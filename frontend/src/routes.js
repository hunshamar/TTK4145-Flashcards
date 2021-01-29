
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/home"
import Login from "./components/login"
import CardCreator from "./components/cardCreator"
import ShowCards from './components/showCards';
import CreateCard from './components/createCard';
import logInFunc from './components/loginfunc';

const Routes = () => {




    return(
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/loginfunc" exact component={logInFunc}/>
                <Route path="/home/" exact component={Home}/>
                <Route path="/cardCreator" exact component={CardCreator}/>
                <Route path="/createCard" exact component={CreateCard}/>
                <Route path="/showCards" exact component={ShowCards} />
            </Switch>
        </React.Fragment>
    )
}

export default Routes
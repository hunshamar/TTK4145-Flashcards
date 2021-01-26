
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar"

import Home from "./components/home"
import Login from "./components/login"
import CardCreator from "./components/cardCreator"

const Routes = () => {




    return(
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/home/" exact component={Home}/>
                <Route path="/cardCreator" exact component={CardCreator}/>
            </Switch>
        </React.Fragment>
    )
}

export default Routes
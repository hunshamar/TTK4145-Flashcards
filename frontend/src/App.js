
import React from "react"
import Home from "./home"
import Login from "./login"
import Navbar from "./components/navbar"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



const App = () => {


    return(
    
    <Router>
    <Navbar loggedin={true} />
    <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/home/" exact component={Home}/>
    </Switch>
    </Router>
    )
}

export default App
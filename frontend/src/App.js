
import React from "react"
import Navbar from "./components/layout/navbar"
import Routes from "./routes"
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import theme from "./static/theme"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alerter from './components/notifications/alerter';



const App = () => {


    return(
        <MuiThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Navbar loggedin={true} />
      <Alerter /> 
    <Routes />   
    </Router>
    </MuiThemeProvider>

    )
}

export default App
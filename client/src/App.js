
import React, { useEffect } from "react"
import Navbar from "./components/layout/navbar"
import Routes from "./routes"
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {theme, darkTheme} from "./static/theme"
import { BrowserRouter as Router } from "react-router-dom";
import Alerter from './components/notifications/alerter';


const App = () => {

  const [darkMode, setDarkMode] = React.useState(false)

  useEffect(() => {    
    const darkMode = sessionStorage.getItem("dark-mode")
    console.log("init darkmode", darkMode)
    if (!darkMode){
      sessionStorage.setItem("dark-mode", "false")
    } 
    else if (darkMode === "true"){
      setDarkMode(true)
    }
  }, [])

  const toggleDarkMode = () => {
    const darkMode = sessionStorage.getItem("dark-mode")
    console.log(darkMode)
    if (darkMode === "true"){
      setDarkMode(false)
      sessionStorage.setItem("dark-mode", "false")
    }
    else if (darkMode === "false"){
      setDarkMode(true)
      sessionStorage.setItem("dark-mode", "true")
    }
  }

    return(
      <MuiThemeProvider theme={darkMode ? darkTheme : theme}>
        <CssBaseline />
        <Router>
          <Navbar loggedin={true} setDarkMode={toggleDarkMode}/>
          <Alerter /> 
          <Routes />   
        </Router>
        {/* <Feedback /> */}
    </MuiThemeProvider>

    )
}

export default App
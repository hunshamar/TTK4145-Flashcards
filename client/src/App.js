import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import Alerter from "./components/notifications/alerter";
import Routes from "./routes";
import { darkTheme, theme } from "./static/theme";

// console.log = function () {};

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
    const darkMode = sessionStorage.getItem("dark-mode");
    console.log("init darkmode", darkMode);
    if (!darkMode) {
      sessionStorage.setItem("dark-mode", "false");
    } else if (darkMode === "true") {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const darkMode = sessionStorage.getItem("dark-mode");
    console.log(darkMode);
    if (darkMode === "true") {
      setDarkMode(false);
      sessionStorage.setItem("dark-mode", "false");
    } else if (darkMode === "false") {
      setDarkMode(true);
      sessionStorage.setItem("dark-mode", "true");
    }
  };

  return (
    <MuiThemeProvider theme={darkMode ? darkTheme : theme}>
      <CssBaseline />
      <Router>
        <Navbar setDarkMode={toggleDarkMode} />
        <Alerter />
        <Routes />
        {/* <Footer /> */}
      </Router>
      {/* <Feedback /> */}
    </MuiThemeProvider>
  );
};

export default App;

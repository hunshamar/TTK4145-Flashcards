import { createMuiTheme } from '@material-ui/core/styles';



import blue from '@material-ui/core/colors/blue';
// import red from '@material-ui/core/colors/red';
// import yellow from '@material-ui/core/colors/yellow';
// import green from '@material-ui/core/colors/green';
import {grey} from '@material-ui/core/colors/';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    textColor: "#fff",

    primary: {
      main: "#171717"
    },
    secondary: {
      main: "#fff"
    },

    button: {
      main: blue[500],
      success: {
        main: "#078900",
        dark: "#0ab500"
      } 
    },
    hover: "f0f0f0",
  },
  values: {
    siteSideMargin: "25%",
    siteTopMargin: "75px"
  }  
  
});

export const theme = createMuiTheme({
  root: {
    // marginLeft: "100px"
  },

  palette: {

    primary: { 
        // light: will be calculated from palette.primary.main,
        main: "#00509e",
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: { 
      main: grey[500],
    },
    textColor: "#000",
    button: {
      main: blue[500],
      success: {
        main: "#078900",
        dark: "#0ab500"
      } 
    },
    hover: "f0f0f0",
  },
  values: {
    siteSideMargin: "25%",
    siteTopMargin: "75px"
  }

});



  


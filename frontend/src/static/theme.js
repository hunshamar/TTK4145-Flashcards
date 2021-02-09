import { createMuiTheme, rgbToHex } from '@material-ui/core/styles';



import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import {grey} from '@material-ui/core/colors/';



const theme = createMuiTheme({
  palette: {
    background: {
        default: "#f8f8f8"
    },
    primary: { 
        // light: will be calculated from palette.primary.main,
        main: "#00509e"
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: { 
      main: grey[500],
    },
    hover: grey[300],
  },
});


  

export default theme

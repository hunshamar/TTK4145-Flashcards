import { createMuiTheme } from '@material-ui/core/styles';



import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';


const theme = createMuiTheme({
  palette: {
    background: {
        default: "#f8f8f8"
    },
    primary: {
        light: blue[500],
        main: red[500],
        dark: yellow[500],
        contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: yellow[500],
      dark: '#ba000d',
      contrastText: '#000',
    },
    myColor: green[500]
  },
});


  

export default theme

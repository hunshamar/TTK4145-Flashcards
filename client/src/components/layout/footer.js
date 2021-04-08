import { AppBar, makeStyles } from "@material-ui/core";
import { Toolbar } from "@material-ui/core/";
import { NavBarWrapper } from "../../static/wrappers";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    minHeight: "100px",
    flexDirection: "column",
  },
  navbar: {
    backgroundColor: "grey",
    color: "white",
    textColor: "white",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.navbar}>
      <NavBarWrapper className={classes.navbar}>
        <Toolbar position="static">This is the footer</Toolbar>
      </NavBarWrapper>
    </AppBar>
  );
};

export default Footer;

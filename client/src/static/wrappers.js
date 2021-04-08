import { Box, makeStyles, withStyles } from "@material-ui/core";

export const siteWidth = "775px";

export const wrappers = makeStyles((theme) => ({
  pageWrapper: {
    marginLeft: "100px",
    marginRight: "200px",
  },
}));

export const PageWrapper = withStyles({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "200px",
    maxWidth: siteWidth,
    minWidth: siteWidth,
    marginTop: "50px",
  },
})(Box);

export const AdminNavbarWrapper = withStyles({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: siteWidth,
    minWidth: siteWidth,
    marginTop: "50px",
  },
})(Box);

export const NavBarWrapper = withStyles({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: siteWidth,
    minWidth: siteWidth,
  },
})(Box);

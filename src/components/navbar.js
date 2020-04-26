import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";

const styles = {
  root: {
    flex: 1,
  },
  anchorStyle: {
    textDecoration: "none",
    color: "white",
    marginRight: "20px",
    fontSize: "13px",
    fontWeight: "bold",
  },
};

const NavBar = ({ classes }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Typography>
              <Link to="/home" className={classes.anchorStyle}>
                HOME
              </Link>
            </Typography>
            <Typography>
              <Link to="/designs" className={classes.anchorStyle}>
                DESIGNS
              </Link>
            </Typography>
            <Typography>
              <Link to="/illustrations" className={classes.anchorStyle}>
                ILLUSTRATIONS
              </Link>
            </Typography>
            <Typography>
              <Link to="/about" className={classes.anchorStyle}>
                ABOUT
              </Link>
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(NavBar);

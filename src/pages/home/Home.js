import React, { useState } from "react";

import Fade from "react-reveal/Fade";
import Text from "../../Text.js";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import GoogleSignin from "../../helpers/googlesignin.js";

import firebase from "firebase/app";
import "firebase/auth";
import "./Home.css";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const insideStyles = {
  color: "white",
  fontSize: 50,
  padding: 20,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

export default function Home() {
  const [loggedin, setLoggedin] = useState(false);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const login = () => {
    GoogleSignin();
    setLoggedin(true);
  };

  const logout = () => {
    handleMenuClose();
    firebase.auth().signOut();
    cookies.remove("fuid");
    setLoggedin(false);
  };

  const profile = (
    <Menu
      disableScrollLock={true}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className="home">
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Material-UI
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {!loggedin ? (
                <Button variant="contained" color="inherit" onClick={login}>
                  Sign in with Google
                </Button>
              ) : (
                <div>
                  <IconButton edge="end" aria-haspopup="true" color="inherit">
                    <AccountCircle onClick={handleProfileMenuOpen} />
                  </IconButton>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>

        {profile}
      </div>

      <div className="background">
        <Text />
      </div>
      <div style={{ height: 500 }}>
        <div style={insideStyles}>
          <Fade top>SBHS Computer Science Club</Fade>
        </div>
      </div>

      <div className="paragraph white home">
        Join the Computer Science Club and learn anything you want! Explore your
        creative nature by designing and programming interactive websites from
        the ground up, and learn the beauty of the open-source community. Expand
        your programming skills and learn the basics of application development
        applicable to any other computer science-related course or project. All
        while gaining career and college readiness!
      </div>
      <p>HI</p>
      <p>HI</p>
      <p>HI</p>
      <p>HI</p>
      <p>HI</p>
      <p>HI</p>
      <p>HI</p>
      <p>HI</p>
      <p>HI</p>
      <p>HI</p>
      <p>HI</p>
      <p>HI</p>
      <p>HI</p>
      <p>HI</p>
    </div>
  );
}

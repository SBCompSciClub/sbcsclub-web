import React, { useState } from "react";





import Officer from "../../components/Officer.js";
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

import THREEJS from "../../components/three.js"
import HomeContent from "../../components/HomeContent.js"
import "../../components/mouseTrail/mouseTrail.js"

import Cookies from "universal-cookie";
const cookies = new Cookies();


const fadeStyles = {
  fontSize: 40,
  fontWeight: 600,
  fontFamily: "Open Sans",
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

let names = ["Mr. Schiff", "Hitesh Ale", "Rishi Paladugu", "Yash Nishikant"];
let roles = [
  "Supervisor",
  "Senior Officer",
  "Senior Officer",
  "Game Dev Workshop Lead",
];
let link =
  "https://www.notion.so/image/https%3A%2F%2Fwww.notion.so%2Fimages%2Fpage-cover%2Fmet_william_morris_1878.jpg?table=block&id=3a72551f-8de8-4cca-a75f-1268cccb3374&width=3840&userId=&cache=v2";

const listItems = names.map((number, i) => (
  <Officer name={number} role={roles[i]} img={link} />
));





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
        {/*<AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              SBHS Computer Science Club
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
              </AppBar>*/}

        {profile}
      </div>

      <THREEJS/>
      <HomeContent/>


      {/*
      <div style={{ height: 1000 }}></div>

      <Fade bottom delay={800}>
        <div
          className="white"
          style={{
            border: "1px solid black",
            boxShadow: "0px 3px 10px black",
            width: "100%",
            height: "400px",
          }}
        >
          <div className="centerParent">
            <Fade bottom distance="100px">
              <div style={fadeStyles}>SBHS Computer Science Club</div>
            </Fade>
          </div>
          <Fade bottom delay={50} distance="100px">
            <div
              className="paragraph home centerParent"
              style={{ position: "relative", top: "20%" }}
            >
              Join the Computer Science Club and learn anything you want!
              Explore your creative nature by designing and programming
              interactive websites from the ground up, and learn the beauty of
              the open-source community. Expand your programming skills and
              learn the basics of application development applicable to any
              other computer science-related course or project. All while
              gaining career and college readiness!
            </div>
          </Fade>
        </div>
      </Fade>

      <div style={{ height: 500 }}></div>
      <div
        className="white"
        style={{
          border: "1px solid black",
          boxShadow: "0px 3px 10px black",
          width: "100%",
          height: "400px",
        }}
      >
        <div className="centerParent">Officers</div>
        <div className="home centerParent" style={{ marginLeft: "200px" }}>
          <div className="row">{listItems}</div>
        </div>
      </div>
      */}
    </div>
  );
}

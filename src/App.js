import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import Text from "./Text.js";

const insideStyles = {
  color: "white",
  fontSize: 50,
  padding: 20,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};

/*
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div style={{ height: 500 }}>
          <div style={insideStyles}>
            <Fade top>SBHS Computer Science Club</Fade>
          </div>
        </div>

        <div class="paragraph">
          Join the Computer Science Club and learn anything you want! Explore
          your creative nature by designing and programming interactive websites
          from the ground up, and learn the beauty of the open-source community.
          Expand your programming skills and learn the basics of application
          development applicable to any other computer science-related course or
          project. All while gaining career and college readiness!
        </div>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
      </div>
    );
  }
}
*/

class App extends React.Component {
  render() {
    return <Text />;
  }
}
export default App;

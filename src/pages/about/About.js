import React, { Component } from "react";

//components
import Officer from "../../components/Officer.js";

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
class About extends Component {
  render() {
    return (
      <div style={{ marginLeft: "200px" }} className="App">
        <h1 className="title">Officers</h1>
        <div className="row">{listItems}</div>
      </div>
    );
  }
}

export default About;

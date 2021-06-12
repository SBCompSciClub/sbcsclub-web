import React, { Component } from "react";
import "./Credit.css";

//components

import Tip from "../../components/Tip.js";

let creditTip =
  "It is recommended you attend as many of the meetings as soon as possible to ensure you meet the 50% attendance requirement as later meeting dates may be cancelled or rescheduled at any time.";

class Credit extends Component {
  render() {
    return (
      <div className="App indent">
        <h1 className="title">Credit Requirements</h1>
        <ol>
          <li>
            <span className="credit-item">Attend 50% of the meetings</span>
          </li>
          <li>
            <span className="credit-item">
              Pay to Participate ($25 membership fee)
            </span>
          </li>
          <li>
            <span className="credit-item">
              Submit Pay to Participate Receipt
            </span>
          </li>
          <li>
            <span className="credit-item">$10 Club Dues</span>
          </li>
        </ol>
        <Tip text={creditTip} />
        <div style={{ marginTop: "20px", width: "50%" }}>
          Any pay to participate questions? Contact{" "}
          <a href="mailto:SBHS.PTP@sbparents.org">SBHS.PTP@sbparents.org</a>
          &nbsp;and be sure to include contact information.
        </div>
      </div>
    );
  }
}

export default Credit;

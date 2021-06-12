import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

export default class Officer extends Component {
  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={this.props.img} />
        <Card.Body>
          <Card.Title>{this.props.name}</Card.Title>
          <Card.Text>{this.props.role}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

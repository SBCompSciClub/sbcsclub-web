import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import firebase from "firebase/app";
import "firebase/auth";
import "./Admin.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const grid = {
  paddingTop: 20,
  width: "60%",
  display: "flex",
  alignItems: "center",
};
const section = {
  height: "100%",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      hint: props.hint,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value, hint: this.state.hint });
  }
  render() {
    return (
      <input
        style={{
          fontSize: "16px",
          padding: "7px",
          borderRadius: "3px",
          border: "1px solid #cfcfcf",
        }}
        placeholder={this.state.hint}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

class SubInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      hint: props.hint,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value, hint: this.state.hint });
  }
  render() {
    return (
      <input
        style={{
          fontSize: "12px",
          padding: "5px",
          borderRadius: "3px",
          border: "1px solid #cfcfcf",
        }}
        placeholder={this.state.hint}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
class Admin extends Component {
  constructor() {
    super();

    this.state = { workshops: [] };
  }
  componentDidMount() {
    this.fetchWorkshops = this.fetchWorkshops.bind(this);
    this.fetchWorkshops();
  }
  fetchWorkshops = () => {
    firebase
      .database()
      .ref("workshops")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          let workshops = snapshot.val();
          this.setState({ workshops: workshops });
        }
      });
  };
  updateWorkshops = () => {
    firebase.database().ref("workshops").set(this.state.workshops);
  };

  newEvent = () => {
    let workshops = this.state.workshops;
    workshops.push({ created: false });
    this.setState({ workshops: workshops });
  };
  saveEvent = () => {
    let workshops = this.state.workshops;
    let len = workshops.length - 1;
    workshops[len] = {
      name: this.name.state.value,
      lead: this.lead.state.value,
      created: true,
    };

    this.setState(workshops);
    this.updateWorkshops();
  };

  clearEvent = () => {
    let workshops = this.state.workshops;
    workshops.pop();
    this.setState({ workshops: workshops });
  };

  removeWorkshop = (i) => {
    let workshops = this.state.workshops;
    workshops.splice(i, 1);
    this.setState({ workshops: workshops });
    this.updateWorkshops();
  };

  render() {
    return (
      <div className="outer-admin">
        <Grid container spacing={3} style={grid}>
          {this.state.workshops.map((val, i) => {
            if (val.created) {
              return (
                <Grid item xs={3} key={i}>
                  <Card key={i}>
                    <CardHeader
                      action={
                        <IconButton onClick={() => this.removeWorkshop(i)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                      title={val.name}
                    />
                    <CardContent key={i}>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        gutterBottom
                        key={`${i}.2`}
                      >
                        {val.lead}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            } else {
              return (
                <Grid item xs={3} key={i}>
                  <Card key={i}>
                    <CardContent key={i}>
                      <Input
                        hint="Workshop Name"
                        ref={(c) => {
                          this.name = c;
                        }}
                      />
                      <SubInput
                        hint="Name"
                        ref={(c) => {
                          this.lead = c;
                        }}
                      />
                    </CardContent>
                    <CardActions disableSpacing>
                      <Button onClick={this.saveEvent} size="small">
                        Add
                      </Button>
                      <Button onClick={this.clearEvent} size="small">
                        Clear
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            }
          })}
          <Grid item>
            <Card style={section}>
              <CardActions>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={this.newEvent}
                >
                  <AddCircleIcon fontSize="large" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default class App extends Component {
  constructor() {
    super();
    this.state = { admin: 0 };
  }
  render() {
    if (this.state.admin === 0) {
      let id = cookies.get("fuid");
      if (id) {
        firebase
          .database()
          .ref("members")
          .child(id)
          .once("value")
          .then((snapshot) => {
            let user = snapshot.val();

            if (user) {
              firebase
                .database()
                .ref("admins")
                .once("value")
                .then((snapshot) => {
                  let emailsList = snapshot.val();
                  if (emailsList.includes(user.email)) {
                    this.setState({ admin: 1 });
                  } else {
                    this.setState({ admin: 2 });
                  }
                });
            }
          });
      } else {
        this.setState({ admin: 2 });
      }
    }
    if (this.state.admin === 1) {
      return <Admin />;
    } else if (this.state.admin === 2) {
      return <Redirect to="/" />;
    } else {
      return <div>Loading...</div>;
    }
  }
}

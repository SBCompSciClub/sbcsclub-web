import "./App.css";
import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//pages
import Credit from "./pages/clubcredit/Credit.js";
import Home from "./pages/home/Home.js";
import About from "./pages/about/About.js";
import Workshops from "./pages/workshops/Workshops.js";
import Admin from "./pages/admin/Admin.js";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/clubcredit">
            <Credit />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/workshops">
            <Workshops />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

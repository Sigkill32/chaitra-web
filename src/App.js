import React, { Component } from "react";
import Home from "./components/home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Designs from "./components/Designs";
import About from "./components/about";
import NotFound from "./components/notFound";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/experiments" component={Designs} />
            <Route path="/about" component={About} />
            <Route path="/not-found" component={NotFound} />
            <Redirect path="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

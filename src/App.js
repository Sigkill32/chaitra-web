import React, { Component } from "react";
import Home from "./components/home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Experiments from "./components/expriments";
import About from "./components/about";
import NotFound from "./components/notFound";
import DesignDetails from "./components/designDetails";
import Blobs from "./components/Apps/blobs";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/experiments" component={Experiments} />
            <Route path="/about" component={About} />
            <Route path="/design" component={DesignDetails} />
            <Route path="/blobs" component={Blobs} />
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

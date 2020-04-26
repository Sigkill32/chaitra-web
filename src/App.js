import React, { Component } from "react";
import Home from "./components/home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Designs from "./components/Designs";
import Illustration from "./components/illustration";
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
            <Route path="/designs" component={Designs} />
            <Route path="/illustrations" component={Illustration} />
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

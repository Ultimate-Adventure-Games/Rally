import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import HuntPage from "./HuntPage";
import HuntsListPage from "./HuntsListPage";

import '../styles/styles.css'

class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <>
        {/* <div className="app"></div> */}
        <Switch>
          <Route path="/hunts" component={HuntsListPage} />
          <Route path="/hunt/:id" component={HuntPage} />
          <Route path="/" component={Home} />
        </Switch>
      </>
    )
  }
}

export default App;
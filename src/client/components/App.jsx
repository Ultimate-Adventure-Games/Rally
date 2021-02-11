import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import HuntPage from "./HuntPage";
import HuntsListPage from "./HuntsListPage";
import Signup from "./Signup";
import CreateHunt from "./CreateHunt";
import CreateEvent from "./CreateEvent";
import { AppContext } from './ContextProvider';
import Login from './Login'
import '../styles/styles.css'
import 'normalize.css';



class App extends Component {
  constructor(props) {
    super(props);


  this.setCurrentUser = user => {
    this.setState(state => ({
      user: user,
    }))
  };

  this.setHunts = hunts => {
    this.setState(state => ({
      huntList: hunts,
    }))
  }

  this.setPotentialHunts = potentialHunts => {
    this.setState(state => ({
      potentialHuntList: potentialHunts,
    }))
  }

  this.setRunningHunts = runningHunts => {
    this.setState(state => ({
      runningHustList: runningHunts,
    }))
  }

  this.setCompletedHunts = completedHunts => {
    this.setState(state => ({
      completedHuntList: completedHunts,
    }))
  }

  this.setUserLat = lat => {
    this.setState(state => ({
      userLat: lat,
    }))
  }

  this.setUserLng = lng => {
    this.setState(state => ({
      userLng: lng,
    }))
  }


  this.state = {
    user: {},
    // FIXME hardcoded for now (Alcatraz, SF)
    userLat: 37.8270,
    userLng: -122.4230,
    hunts: {},
    completedHunts: [],
    setCurrentUser: this.setCurrentUser,
    setHunts: this.setHunts,
    setCompletedHunts: this.setCompletedHunts,
    setUserLat: this.setUserLat,
    setUserLng: this.setUserLng,
  };
}

  render() {
    return (
        <div className="app">
        <AppContext.Provider value={this.state}>
          <Switch>
            <Route path="/hunts" component={HuntsListPage} />
            <Route path="/signup" component={Signup} />
            <Route path="/hunt/:id" component={HuntPage} />
            <Route path="/createhunt" component={CreateHunt} />
            <Route path="/createevent" component={CreateEvent} />
            <Route path="/" component={Login} />
          </Switch>
        </AppContext.Provider>
      </div>
    )
  }
}

export default App;
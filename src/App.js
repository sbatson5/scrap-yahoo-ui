import React, { Component } from 'react';
import './App.css';
import NewManager from './routes/new-manager';
import ViewManager from './routes/view-manager';
import CreateMatchup from './routes/create-matchup';
import ViewSeason from './routes/view-season';
import Index from './routes/index';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <Route path="/" exact component={Index} />
          <Route path="/new-manager" exact component={NewManager} />
          <Route path="/view-manager/:id" component={ViewManager} />
          <Route path="/view-season/:id" component={ViewSeason} />
          <Route path="/create-matchup" component={CreateMatchup} />
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import NewManager from './routes/new-manager';
import ViewManager from './routes/view-manager';
import CreateMatchup from './routes/create-matchup';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/new-manager" exact component={NewManager} />
          <Route path="/view-manager/:id" component={ViewManager} />
          <Route path="/create-matchup" component={CreateMatchup} />
        </div>
      </Router>
    );
  }
}

export default App;

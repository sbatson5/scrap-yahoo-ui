import React, { Component } from 'react';
import './App.css';
import Manager from './components/manager';
import NewManager from './components/new-manager';
import ViewManager from './components/view-manager';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/new-manager" exact component={NewManager} />
          <Route path="/view-manager/:id" component={ViewManager} />
        </div>
      </Router>
    );
  }
}

export default App;

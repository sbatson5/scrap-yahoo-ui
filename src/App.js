import React, { Component } from 'react';
import './App.css';
import Manager from './components/manager';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Manager />
        </header>
      </div>
    );
  }
}

export default App;

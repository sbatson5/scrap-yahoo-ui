import React, { Component } from 'react';
import './App.css';
import Example from './components/example';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Example />
        </header>
      </div>
    );
  }
}

export default App;

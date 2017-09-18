import React, { Component } from 'react';
import './App.css';
import Survey from './components/survey/Survey';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={process.env.PUBLIC_URL + 'square-100.png'} className="App-logo" alt="logo" />
          <h2>Tap Research - Code Test</h2>
        </div>
        <p className="App-intro">
          <Survey />
        </p>
      </div>
    );
  }
}

export default App;

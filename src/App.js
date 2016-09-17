import React, { Component } from 'react';

// Import Components
import Dashboard from './Dashboard'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <div>
          <Dashboard />
        </div>
    );
  }
}


export default App;

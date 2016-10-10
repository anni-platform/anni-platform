import React, { Component } from 'react';
import style from './stylus/index.styl';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return(
      <div>
        <nav>
          <Link to="/">Dashboard</Link>
        </nav>
        {this.props.children}
      </div>
    );
  }
}


export default App;

import React, { Component } from 'react';
import './stylus/index.styl';
import { Link } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

const store = createStore(reducer)

class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <div>
          <nav>
          <Link to="/">Dashboard</Link>
          </nav>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}


export default App;

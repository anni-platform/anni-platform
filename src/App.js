import React, { Component } from 'react';
import Navigation from './components/Navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import './stylus/components/Navigation';
const store = createStore(reducer);


class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <div>
          <Navigation />
          {this.props.children}
        </div>
      </Provider>
    );
  }
}


export default App;

import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(<App />, root);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(<NextApp />, root);
  });
}

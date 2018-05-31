import React from 'react';
import App from 'App';
import Navigation from './Navigation';
import renderer from 'react-test-renderer';

describe('Navigation Component', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <App>
        <Navigation />
      </App>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

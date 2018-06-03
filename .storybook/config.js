import { configure } from '@storybook/react';

const req = require.context('../src', true, /\.stories\.js$/)
console.log(req.keys());
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
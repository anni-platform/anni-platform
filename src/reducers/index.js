import { combineReducers } from 'redux';
import projects from './projects';
import auth from './auth';

const anniApp = combineReducers({
  auth,
  projects
});

export default anniApp

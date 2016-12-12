import { combineReducers } from 'redux';
import projects from './projects';
import auth from './auth';
import files from './files';

const anniApp = combineReducers({
  auth,
  projects,
  files
});

export default anniApp

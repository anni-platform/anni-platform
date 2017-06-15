import { uploadFile } from 'adapters';
import { stateToJsonFile } from 'utils/fileStorage';
import deepEqual from 'deep-equal';
import { FILE_DATABASE_DIRECTORY } from 'constants/file';
import constants from 'constants';
const { DEFAULT_STATE } = constants;

// See Abramov tutorial: https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
const STATE = 'state';
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STATE);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

let saving = false;
let oldState = null;
export const saveState = (newState) => {
  if (!oldState) {
    oldState = newState;
  }
  if (newState === DEFAULT_STATE) {
    return;
  }
  const oldProjects = oldState.projects.toJS ? oldState.projects.toJS() : oldState.projects;
  const newProjects = newState.projects.toJS ? newState.projects.toJS() : newState.projects;
  const oldFiles = oldState.files.toJS ? oldState.files.toJS() : oldState.files;
  const newFiles = newState.files.toJS ? newState.files.toJS() : newState.files;
  try {
    const projectsChanged = !deepEqual(oldProjects, newProjects);
    const filesChanged = !deepEqual(oldFiles, newFiles);
    const stateHasChanged = !saving && (projectsChanged || filesChanged);

    if (stateHasChanged) {
      oldState = newState;
      const serializedNewState = JSON.stringify(newState);
      localStorage.setItem(STATE, serializedNewState);
      saving = true;
      uploadFile(FILE_DATABASE_DIRECTORY, stateToJsonFile(newState, 'state.json')).then(() => { saving = false });
      return;
    }

  } catch (err) {
    console.log(err);
    // Ignore write errors.
  }
};

import { uploadFile, removeFolder } from 'adapters';
import { stateToJsonFile } from 'utils/fileStorage';
import deepEqual from 'deep-equal';
import { FILE_DATABASE_DIRECTORY } from 'constants/file';

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
export const saveState = (newState) => {
  try {
    const oldState = JSON.parse(localStorage.getItem(STATE));
    const projectsChanged = !deepEqual(oldState.projects, newState.projects.toJS());
    const filesChanged = !deepEqual(oldState.files, newState.files.toJS());
    if (!saving && (projectsChanged || filesChanged)) {
      console.log("writing new state to JSON file database");
      const serializedNewState = JSON.stringify(newState);
      localStorage.setItem(STATE, serializedNewState);
      saving = true;
      removeFolder(`/${FILE_DATABASE_DIRECTORY}/state.json`).then(() => {
        uploadFile(FILE_DATABASE_DIRECTORY, stateToJsonFile(newState, 'state.json'));
        saving = false;
      });
      
      return;
    }
    
  } catch (err) {
    // Ignore write errors.
  }
};

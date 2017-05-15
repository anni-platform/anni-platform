import { searchFiles, uploadFile, removeFolder } from 'adapters';
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
export const saveState = (oldState, newState) => {
  const oldProjects = oldState.projects.toJS ? oldState.projects.toJS() : oldState.projects;
  const newProjects = newState.projects.toJS ? newState.projects.toJS() : newState.projects;
  const oldFiles = oldState.files.toJS ? oldState.files.toJS() : oldState.files;
  const newFiles = newState.files.toJS ? newState.files.toJS() : newState.files;
  try {
    const projectsChanged = !deepEqual(oldProjects, newProjects);
    const filesChanged = !deepEqual(oldFiles, newFiles);
    if (!saving && (projectsChanged || filesChanged)) {
      const serializedNewState = JSON.stringify(newState);
      localStorage.setItem(STATE, serializedNewState);
      saving = true;
      console.log("uploading new state to file db");
      const writeStateFile = () => {
        uploadFile(FILE_DATABASE_DIRECTORY, stateToJsonFile(newState, 'state.json'));
        saving = false;
      }
      searchFiles(`/${FILE_DATABASE_DIRECTORY}/`, 'state.json').then(results => {
        if (results.matches.length) {
          removeFolder(`/${FILE_DATABASE_DIRECTORY}/state.json`).then(writeStateFile);
          return;
        }
        writeStateFile();
      });
      return;
    }
    
  } catch (err) {
    console.log(err);
    // Ignore write errors.
  }
};

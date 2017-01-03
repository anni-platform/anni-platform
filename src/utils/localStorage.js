import { uploadFile } from 'adapters';
import { stateToJsonFile } from 'utils/fileStorage';
import deepEqual from 'deep-equal';

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

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    const _state = localStorage.getItem(STATE);
    if (!state || !deepEqual(_state, state)) {
      localStorage.setItem(STATE, serializedState);
      uploadFile(`db/state-${new Date().getTime()}`, stateToJsonFile(state));
    }
  } catch (err) {
    console.log(err);
    // Ignore write errors.
  }
};

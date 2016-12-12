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
    localStorage.setItem(STATE, serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

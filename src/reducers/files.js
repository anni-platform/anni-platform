import constants from 'constants';
import Immutable, { List, Map } from 'immutable';
const { ADD_FILE, ADD_FILE_TO_COLLECTION, DELETE_FILE, REMOVE_FILE_FROM_COLLECTION } = constants.file;
const { REMOVE_PROJECT } = constants.project;

import { getCollectionKey } from 'utils';

export const initialState = Map({
  archive: Map({}),
  collections: Map({})
});

const archive = (state = initialState.get("archive"), action) => {
  switch (action.type) {
    case ADD_FILE:
      return state.update(action.file.name, (value) => value = action.file);
    case DELETE_FILE:
      return state.delete(action.name);
    default:
      return state
  }
}

const collection = (state = List([]), action) => {
  const { id } = action;
  const collectionEntry = { id };
  switch (action.type) {
    case ADD_FILE_TO_COLLECTION:
      if (state.filter(item => item.id === id).size > 0) {
        // file is a duplicate
        return state;
      }
      return state.push(collectionEntry);
    case REMOVE_FILE_FROM_COLLECTION:
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
}

const collections = (state = initialState.get("collections" ), action) => {
  const collectionKey = getCollectionKey(action);
  switch (action.type) {
    case ADD_FILE_TO_COLLECTION:
      return state.setIn([collectionKey], collection(state.get(collectionKey), action));
    case REMOVE_FILE_FROM_COLLECTION:
      return state.setIn([action.collectionKey], collection(state.get(action.collectionKey), action));
    case REMOVE_PROJECT:
      return state.filter((v, k) => {
        return k.indexOf(action.path) === -1;
      });
    default:
      return state
  }
}

const files = (state = initialState, action) => {
  if (!state.isMap || !state.isMap()) {
    state = Immutable.fromJS(state);
  }
  switch (action.type) {
    default:
      return Map({
        archive: archive(state.get("archive"), action),
        collections: collections(state.get("collections"), action)
      });
  }
}

export default files;

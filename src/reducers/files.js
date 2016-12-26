import constants from 'constants';
const { ADD_FILE, ADD_FILE_TO_COLLECTION, DELETE_FILE } = constants.file;
const { REMOVE_PROJECT } = constants.project;
// import filter from 'lodash.filter';

import { getCollectionKey } from 'utils';

export const initialState = {
  archive: {},
  collections: {}
}

const archive = (state = initialState.archive, action) => {
  let archive = Object.assign({}, state);
  switch (action.type) {
    case ADD_FILE:
      // merge with an already existing file or add the new one
      return {...state, [action.file.name]: state[action.file.name] ? Object.assign(
        {}, state[action.file.name], action.file) : action.file};
    case DELETE_FILE:
      delete archive[action.name];
      return archive;
    default:
      return state
  }
}

const collection = (state = [], action) => {
  const index = state.findIndex(item => item.id === action.id);
  switch (action.type) {
    case ADD_FILE_TO_COLLECTION:
      if (index > -1) {
        // file is a duplicate
        return state;
      }
      return [ ...state, { id: action.id } ];
    default:
      return state;
  }
}

const collections = (state = initialState.collection, action) => {
  const collectionKey = getCollectionKey(action);
  const _collections = Object.assign({}, state);
  const collectionKeys = Object.keys(state);
  switch (action.type) {
    case ADD_FILE_TO_COLLECTION:
      return {
        ...state,
        [collectionKey]: collection(state[collectionKey], action)
      }
    case REMOVE_PROJECT:
      collectionKeys.forEach(k => {
        if (k.indexOf(action.path) > -1) {
          delete _collections[k];
        }
      });
      return _collections;
    default:
      return state
  }
}

const files = (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        archive: archive(state.archive, action),
        collections: collections(state.collections, action)
      }
  }
}

export default files;

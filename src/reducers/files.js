import constants from 'constants';
const { ADD_FILE } = constants.file;
const { REMOVE_PROJECT } = constants.project;

const initialState = {
  archive: [],
  collections: {}
}

const archive = (state = initialState.archive, action) => {
  switch (action.type) {
    case ADD_FILE:
      return [...state, action.file];
    default:
      return state
  }
}

const collections = (state = initialState.collection, action) => {
  const { path, collectionId } = action;
  const collectionKey = `${path}_${collectionId}`;
  const collection = state[collectionKey] ? [...state[collectionKey], action.file] : [action.file];
  const _collections = Object.assign({}, state);
  switch (action.type) {
    case ADD_FILE:
      return {
        ...state,
        [collectionKey]: collection
      };
    case REMOVE_PROJECT:
      const collectionKeys = Object.keys(state);
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

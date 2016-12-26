import constants from 'constants';
const { ADD_FILE, ADD_FILE_TO_COLLECTION } = constants.file;
const { REMOVE_PROJECT } = constants.project;

export function getCollectionKey(action) {
  return `${action.path}_${action.collectionId}`;
}

export const initialState = {
  archive: {},
  collections: {}
}

const archive = (state = initialState.archive, action) => {
  switch (action.type) {
    case ADD_FILE:
      // merge with an already existing file or add the new one
      return {...state, [action.file.name]: state[action.file.name] ? Object.assign(
        {}, state[action.file.name], action.file) : action.file};
    default:
      return state
  }
}

const collection = (state = [], action) => {
  switch (action.type) {
    case ADD_FILE_TO_COLLECTION:
      return [ ...state, { id: action.id } ];
    default:
      return state;
  }
}

const collections = (state = initialState.collection, action) => {
  const collectionKey = getCollectionKey(action);
  const _collections = Object.assign({}, state);
  switch (action.type) {
    case ADD_FILE_TO_COLLECTION:
      return {
        ...state,
        [collectionKey]: collection(state[collectionKey], action)
      }
    case REMOVE_PROJECT:
      Object.keys(state).forEach(k => {
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

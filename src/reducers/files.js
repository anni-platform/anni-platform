import constants from 'constants/index';
import { getCollectionKey } from 'utils';
import Immutable, { List, Map } from 'immutable';
import { FOLDER_FILES_FETCH_SUCCEEDED } from 'constants/folders';
const {
  ADD_FILE,
  ADD_FILE_TO_COLLECTION,
  DELETE_FILE,
  REMOVE_FILE_FROM_COLLECTION,
  UPDATE_COLLECTION,
  UPDATE_COLLECTION_ITEM,
  REMOVE_COLLECTION_ITEM,
} = constants.file;
const { REMOVE_PROJECT } = constants.project;

export const initialState = Map({
  archive: Map({}),
  collections: Map({}),
  projects: Map({}),
});

const archive = (state = initialState.get('archive'), action) => {
  switch (action.type) {
    case ADD_FILE:
      return state.update(action.file.name, value => (value = action.file));
    case DELETE_FILE:
      return state.delete(action.name);
    default:
      return state;
  }
};

const collection = (state = List([]), action) => {
  if (!List.isList(state)) {
    state = List(state.map(i => Map(i)));
  }
  const { id } = action;
  const collectionEntry = Map({ id });
  switch (action.type) {
    case ADD_FILE_TO_COLLECTION:
      if (state.filter(item => item.get('id') === id).size > 0) {
        // file is a duplicate
        return state;
      }
      return state.push(collectionEntry);
    case REMOVE_FILE_FROM_COLLECTION:
      return state.filter(item => item.get('id') !== action.id);
    case UPDATE_COLLECTION_ITEM:
      return state.set(
        action.index,
        state.get(action.index).merge(Map(action.content))
      );
    case REMOVE_COLLECTION_ITEM:
      return state.delete(action.index);
    default:
      return state;
  }
};

const collections = (state = initialState.get('collections'), action) => {
  const collectionKey = getCollectionKey(action);
  switch (action.type) {
    case ADD_FILE_TO_COLLECTION:
      return state.setIn(
        [collectionKey],
        collection(state.get(collectionKey), action)
      );
    case UPDATE_COLLECTION_ITEM:
      return state.setIn(
        [action.collectionKey],
        collection(state.get(action.collectionKey), action)
      );
    case REMOVE_FILE_FROM_COLLECTION:
      return state.setIn(
        [action.collectionKey],
        collection(state.get(action.collectionKey), action)
      );
    case REMOVE_PROJECT:
      return state.filter((v, k) => {
        return k.indexOf(action.path) === -1;
      });
    case UPDATE_COLLECTION:
      return state.setIn([action.collectionKey], action.collection);
    case REMOVE_COLLECTION_ITEM:
      return state.setIn(
        [action.collectionKey],
        collection(state.get(action.collectionKey), action)
      );
    default:
      return state;
  }
};

const projects = (state = initialState.get('projects'), action) => {
  switch (action.type) {
    case FOLDER_FILES_FETCH_SUCCEEDED:
      return state.setIn([action.projectPath], action.folder);
    default:
      return state;
  }
};

const files = (state = initialState, action) => {
  if (!state.isMap || !state.isMap()) {
    state = Immutable.fromJS(state);
  }
  switch (action.type) {
    default:
      return Map({
        archive: archive(state.get('archive'), action),
        collections: collections(state.get('collections'), action),
        projects: projects(state.get('projects'), action),
      });
  }
};

export default files;

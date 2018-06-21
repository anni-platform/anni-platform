import constants from 'constants/index';
import { createActions, handleActions, combineActions } from 'redux-actions';
import { getCollectionKey } from 'utils';
import Immutable, { List, Map } from 'immutable';
import {
  FOLDER_FILES_FETCH_SUCCEEDED,
  SHARED_LINKS_FETCH_SUCCEEDED,
} from 'constants/folders';
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
  shareLinks: Map({}),
});

export const initialStateNative = {
  archive: {},
  collections: {},
  projects: {},
  shareLinks: {},
};

export const { addFile, deleteFile } = createActions({
  ADD_FILE: file => ({ file }),
  DELETE_FILE: file => ({ file }),
});

export const archive = handleActions(
  {
    [addFile]: (state, { payload }) => {
      const { file } = payload;
      return {
        ...state,
        [file.id]: {
          ...state[file.id],
          ...file,
        },
      };
    },
    [deleteFile]: (state, { payload }) => {
      const { file } = payload;
      const { id } = file || {};
      if (state[id]) {
        return Object.keys(state)
          .filter(k => k !== id)
          .reduce(
            (acc, k) => ({
              ...acc,
              [k]: state[k],
            }),
            {}
          );
      }
      return state;
    },
  },
  // new Map([
  //   [
  //     addFile,
  //     (state, { file }) => ({
  //       ...state,
  //       [file.id]: {
  //         ...state[file.id],
  //         ...file,
  //       },
  //     }),
  //   ],
  //   [
  //     deleteFile,
  //     (state, { file }) => {
  //       const { id } = file || {};
  //       if (state[id]) {
  //         return Object.keys(state)
  //           .filter(k => k !== id)
  //           .reduce(
  //             (acc, k) => ({
  //               ...acc,
  //               [k]: state[k],
  //             }),
  //             {}
  //           );
  //       }
  //       return state;
  //     },
  //   ],
  // ]),
  initialStateNative.archive
);

// const archive = (state = initialStateNative.archive, action) => {
//   const { file } = action;
//   const { id } = file || {};
//   switch (action.type) {
//     case ADD_FILE:
//       return {
//         ...state,
//         [id]: {
//           ...state[id],
//           ...file,
//         },
//       };
//       // return state.update(action.file.id, value => (value = action.file));
//     case SHARED_LINKS_FETCH_SUCCEEDED:
//       return state.withMutations(m =>
//         action.links.forEach(({ path, url }) => {
//           m.set([path, 'url'], url.replace(/.$/, '1'));
//         })
//       );
//     case DELETE_FILE:
//       return state;
//     default:
//       return state;
//   }
// };

const collection = (state = List([]), action) => {
  if (!List.isList(state)) {
    state = List(state.map(i => Map(i)));
  }
  const { id } = action.file;
  const collectionEntry = Map({ id });
  switch (action.type) {
    case ADD_FILE:
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
    // case ADD_FILE:
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

const shareLinks = (state = initialState.get('shareLinks'), action) => {
  switch (action.type) {
    case SHARED_LINKS_FETCH_SUCCEEDED:
      const { links } = action || {};
      const linkDictionary = links.reduce(
        (acc, { url, path }) => ({
          ...acc,
          [path]: url.replace(/.$/, '1'),
        }),
        {}
      );
      return Map(linkDictionary);
    default:
      return state;
  }
};

const projects = (state = initialState.get('projects'), action) => {
  switch (action.type) {
    case FOLDER_FILES_FETCH_SUCCEEDED:
      return Map(state).setIn([action.projectPath], action.folder);
    default:
      return state;
  }
};

/**
 * archive: { id: file } hash map of all known files
 * collections: { id: []file.id } has map of arrays of file ids
 * shareLinks
 */
const files = (state = initialStateNative, action) => {
  switch (action.type) {
    default:
      return {
        archive: archive(state.archive, action),
        collections: collections(state.collections, action),
        projects: projects(state.projects, action),
        shareLinks: shareLinks(state.shareLinks, action),
      };
  }
};

export default files;

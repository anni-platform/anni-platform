import {
  call,
  put,
  takeLatest,
  all,
  takeEvery,
  select,
} from 'redux-saga/effects';

import { getFolder, getSharedLinks } from 'adapters';
import * as actionTypes from 'constants/folders';
import * as fileActionTypes from 'constants/file';
import { requestFolderFiles } from 'actions';
import { createSelector } from 'reselect';

// const getFiles = createSelector(
//   // state => state,
//   // state => state.files.toJS(),
//   // (state, { archive, shareLinks }) => {
//   //   console.log('state', state);
//   //   console.log('getFiles selector', archive, shareLinks);
//   //   return null;
//   // }
//   state => state,
//   s => console.log(s)
// );
const getKnownFiles = createSelector(
  // getFiles,
  state => state,
  s => console.log('getKnownFiles', s)
);

// 1. getFolderFiles
// 2. get each file path as array
// 3. pull file from shared links cache if available
// 4. fetch share link for new files
// 5. combine list into single

function* fetchFilesInFolder(action) {
  try {
    const existingFiles = yield select(state => state.files.toJS().shareLinks);
    const folder = yield call(getFolder, action.payload.path);
    console.log('folder', folder);
    const files = yield all(
      folder.entries
        .filter(e => e['.tag'] === 'folder')
        .map(e => call(getFolder, e.path_display))
    );


    const folderFilePaths = folder.entries.map(e => e.path_display);

    const existingFileKeys = Object.keys(existingFiles).filter(path =>
      folderFilePaths.includes(path)
    );
    const urls = existingFileKeys.map(k => existingFiles[k]);

    yield all(
      existingFileKeys.map(k =>
        put({
          type: fileActionTypes.ADD_FILE_TO_COLLECTION,
          collectionKey: action.payload.path,
        })
      )
    );

    const newFiles = folder.entries.filter(
      e => !existingFileKeys.includes(e.path_display)
    );
    console.log('newFiles', newFiles);

    yield put({
      type: actionTypes.FOLDER_FILES_FETCH_SUCCEEDED,
      folder: {
        ...folder,
        files: folder.entries.map(({ name }, index) => ({
          [name]: files[index].entries,
        })),
      },
      projectPath: action.path,
    });
  } catch (e) {
    yield put({
      type: actionTypes.FOLDER_FILES_FETCH_FAILED,
      message: e.message,
    });
  }
}

function* fetchSharedLinks(action) {
  try {
    const { links } = yield call(getSharedLinks);
    yield put({
      type: actionTypes.SHARED_LINKS_FETCH_SUCCEEDED,
      links,
    });
  } catch (e) {
    yield put({
      type: actionTypes.SHARED_LINKS_FETCH_FAILED,
      message: e.message,
    });
  }
}

function* folder() {
  yield takeLatest(requestFolderFiles, fetchFilesInFolder);
}

function* sharedLinks() {
  yield takeLatest(actionTypes.SHARED_LINKS_REQUESTED, fetchSharedLinks);
}

// function* watchAndLog() {
//   yield takeEvery('*', function* logger(action) {
//     const state = yield select();

//     console.log('action', action);
//     console.log(
//       'state after',
//       Object.entries(state).reduce((acc, [key, value]) => ({
//           ...acc,
//           [key]: value.toJS(),
//         }),
//         {}
//       )
//     );
//   });
// }

function* rootSaga() {
  yield all([
    ...folder(),
    ...sharedLinks(),
    // ...watchAndLog()
  ]);
}

export default rootSaga;

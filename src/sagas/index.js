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

// 1. getFolderFiles
// 2. get each file path as array
// 3. pull file from shared links cache if available
// 4. fetch share link for new files
// 5. combine list into single

function* fetchFilesInFolder(action) {
  try {
    const folder = yield call(getFolder, action.path);
    const files = yield all(
      folder.entries.map(e => call(getFolder, e.path_display))
    );
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
  yield takeLatest(
    actionTypes.FOLDER_FILES_FETCH_REQUESTED,
    fetchFilesInFolder
  );
}

function* sharedLinks() {
  yield takeLatest(actionTypes.SHARED_LINKS_REQUESTED, fetchSharedLinks);
}

function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    const state = yield select();

    console.log('action', action);
    console.log('state after', state);
  });
}

function* rootSaga() {
  yield all([...folder(), ...sharedLinks(), ...watchAndLog()]);
}

export default rootSaga;

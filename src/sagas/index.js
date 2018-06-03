import { call, put, takeLatest, all } from 'redux-saga/effects';

import { getFolder, getLink, getFolderMeta, getSharedLinks } from 'adapters';
import * as actionTypes from 'constants/folders';

const TOTAL_FILES_LIMIT = 100;

function* fetchFilesInFolder(action) {
  try {
    const folder = yield call(getFolder, action.path);
    const files = yield all(
      folder.entries.map(e => call(getFolder, e.path_display))
    );
    const [first] = folder.entries;
    console.log('files', files, first.path_display);
    const firstSharingLinks = yield call(getSharedLinks);
    console.log(firstSharingLinks);
    
    // const entries = files.reduce((acc, { entries }) => [...acc, ...entries.map(e => e)], []);
    // const paths = entries.map(({ path_display }) => path_display);
    // console.log(paths);
    // const getEntryLinks = paths.map(p => call(getLink, p))
    // console.log(getEntryLinks);
    // const fileLinks = yield all(getEntryLinks);
    // console.log(fileLinks);
    
    // const filesMeta = yield call(getFolderMeta, entries.map(({ id }) => id).slice(0, TOTAL_FILES_LIMIT));
    // console.log(filesMeta);
    yield put({
      type: actionTypes.FOLDER_FILES_FETCH_SUCCEEDED,
      folder: {
        ...folder,
        files: folder.entries.map(({ name }, index) =>
          ({ [name]: files[index].entries })
        ),
      },
      projectPath: action.path,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: actionTypes.FOLDER_FILES_FETCH_FAILED,
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

function* rootSaga() {
  yield all([...folder()]);
}

export default rootSaga;

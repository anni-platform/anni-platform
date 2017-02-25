import reducer, { initialState } from './files';
import { getCollectionKey } from 'utils';
import constants from 'constants';
const { ADD_FILE, ADD_FILE_TO_COLLECTION } = constants.file;
const { REMOVE_PROJECT } = constants.project;
import{ Map, List } from 'immutable';

describe('files reducer', () => {
  let path = 'test';

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle ADD_FILE', () => {
    let file = {
      name: 'test.jpg'
    };

    expect(
      reducer(initialState, {
        type: ADD_FILE,
        file,
        path
      }).get("archive").toJS()).toEqual({
        [file.name]: file
      }
    );
  });

  it('should handle ADD_FILE with preview and then update the preview file with url', () => {
    let preview = {
      name: 'test.jpg',
      preview: 'localhost'
    };
    let state = initialState.setIn(["archive", preview.name], preview);

    expect(
      reducer(initialState, {
        type: ADD_FILE,
        file: preview,
      }).toJS()).toEqual(state.toJS());
    let savedToDropbox = {
      url: 'remotehost'
    }
    expect(
      reducer(state, {
        type: ADD_FILE,
        file: Object.assign({}, preview, savedToDropbox)
      }).getIn(["archive", preview.name])).toEqual(
        Object.assign({}, preview, savedToDropbox));
  });

  it('should add a unique file to a collection', () => {
    const fileKey = 'a';
    let path = 'project';
    let collectionId = 'moodboard';
    let collectionKey = getCollectionKey({path, collectionId});
    let uniqueFileState = initialState.setIn(["collections", collectionKey], List([ { id: fileKey} ]));
    const addFileAction = {
      type: ADD_FILE_TO_COLLECTION,
      id: fileKey,
      path,
      collectionId
    };
    expect(
      reducer(uniqueFileState, addFileAction)
      .getIn(["collections", collectionKey])
      .filter(item => item.id === fileKey).size
    ).toEqual(1);
  });

  it('should clean up collections when a project is deleted', () => {
    let path = 'project';
    let collectionId = 'bert';
    let bert = getCollectionKey({path, collectionId});
    collectionId = 'ernie';
    let ernie = getCollectionKey({path, collectionId});
    let collectionsToRemove = initialState.setIn(["collections"], Map({
      [bert]: List(),
      [ernie]: List()
    }));
    expect(
      reducer(collectionsToRemove, {
        type: REMOVE_PROJECT,
        path
      })
      .get("collections")
      .filter((v, k) => {
        return k.indexOf(path) > -1;
      }).size
    ).toEqual(0);
  });
});

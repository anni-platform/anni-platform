import reducer, { initialState, getCollectionKey } from './files';
import constants from 'constants';
const { ADD_FILE, ADD_FILE_TO_COLLECTION } = constants.file;

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
      })).toEqual(Object.assign({}, initialState, {
        archive: { [file.name]: file }
      })
    )
  });

  it('should handle ADD_FILE with preview and then update the preview file with url', () => {
    let preview = {
      name: 'test.jpg',
      preview: 'localhost'
    };
    let state = Object.assign({}, initialState, {
      archive: { [preview.name]: preview }
    });
    expect(
      reducer(initialState, {
        type: ADD_FILE,
        file: preview,
      })).toEqual(state);
    let savedToDropbox = {
      url: 'remotehost'
    }
    expect(
      reducer(state, {
        type: ADD_FILE,
        file: Object.assign({}, preview, savedToDropbox)
      })).toEqual(Object.assign({}, state, {
        archive: { [preview.name]: Object.assign({}, preview, savedToDropbox) }
      }));
  });

  it('should add a file to a collection', () => {
    const fileKey = 'a';
    const state = Object.assign({}, initialState, {
      archive: {
        [fileKey]: {
          url: 'remoteurl'
        }
      }
    });
    let path = 'project';
    let collectionId = 'moodboard';
    let collectionKey = getCollectionKey({path, collectionId});
    expect(
      reducer(state,
      {
        type: ADD_FILE_TO_COLLECTION,
        id: fileKey,
        path,
        collectionId
      }
    )).toEqual(Object.assign({}, state, {
      collections: {
        [collectionKey] : [{ id: fileKey }]
      }
    }))
  });
});
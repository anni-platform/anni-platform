import reducer, {
  initialState,
  initialStateNative,
  addFile,
  deleteFile,
  archive,
} from './files';
import { getCollectionKey } from 'utils';
import { ADD_FILE, DELETE_FILE, ADD_FILE_TO_COLLECTION } from 'constants/file';

describe('files reducer', () => {
  let path = 'test';

  it('should return the initial state by default', () => {
    expect(reducer(undefined, {})).toEqual(initialStateNative);
  });

  describe('archive', () => {
    const fileA = {
      id: '1a',
      path_display: '/blah.jpg',
    };
    const fileB = {
      id: '1b',
      path_display: '/blah2.jpg',
    };

    it('stores files by their id', () => {
      const result = reducer(undefined, addFile(fileA));

      expect(result.archive[fileA.id]).toEqual(fileA);
    });

    it('updates an existing file if it is already known', () => {
      const fileWithURL = {
        ...fileA,
        url: 'url-to-file',
      };

      const result = reducer(
        {
          archive: {
            [fileA.id]: fileA,
          },
        },
        addFile(fileWithURL)
      );

      expect(result.archive[fileA.id]).toEqual(fileWithURL);
    });

    it('deletes a file', () => {
      const result = reducer(
        {
          archive: {
            [fileA.id]: fileA,
            [fileB.id]: fileB,
          },
        },
        deleteFile(fileA)
      );
      expect(result.archive).toEqual({
        [fileB.id]: fileB,
      });
    });
  });

  // it('should handle ADD_FILE', () => {
  //   let file = {
  //     name: 'test.jpg',
  //   };

  //   expect(
  //     reducer(initialState, {
  //       type: ADD_FILE,
  //       file,
  //       path,
  //     })
  //       .get('archive')
  //       .toJS()
  //   ).toEqual({
  //     [file.name]: file,
  //   });
  // });

  // it('should handle ADD_FILE with preview and then update the preview file with url', () => {
  //   let preview = {
  //     name: 'test.jpg',
  //     preview: 'localhost',
  //   };
  //   let state = initialState.setIn(['archive', preview.name], preview);

  //   expect(
  //     reducer(initialState, {
  //       type: ADD_FILE,
  //       file: preview,
  //     }).toJS()
  //   ).toEqual(state.toJS());
  //   let savedToDropbox = {
  //     url: 'remotehost',
  //   };
  //   expect(
  //     reducer(state, {
  //       type: ADD_FILE,
  //       file: Object.assign({}, preview, savedToDropbox),
  //     }).getIn(['archive', preview.name])
  //   ).toEqual(Object.assign({}, preview, savedToDropbox));
  // });

  // it('should add a unique file to a collection', () => {
  //   const fileKey = 'a';
  //   let path = 'project';
  //   let collectionId = 'moodboard';
  //   let collectionKey = getCollectionKey({ path, collectionId });
  //   let uniqueFileState = initialState.setIn(
  //     ['collections', collectionKey],
  //     List([{ id: fileKey }])
  //   );
  //   const addFileAction = {
  //     type: ADD_FILE_TO_COLLECTION,
  //     id: fileKey,
  //     path,
  //     collectionId,
  //   };
  //   expect(
  //     reducer(uniqueFileState, addFileAction)
  //       .getIn(['collections', collectionKey])
  //       .filter(item => item.id === fileKey).size
  //   ).toEqual(1);
  // });

  // it('should clean up collections when a project is deleted', () => {
  //   let path = 'project';
  //   let collectionId = 'bert';
  //   let bert = getCollectionKey({ path, collectionId });
  //   collectionId = 'ernie';
  //   let ernie = getCollectionKey({ path, collectionId });
  //   let collectionsToRemove = initialState.setIn(
  //     ['collections'],
  //     Map({
  //       [bert]: List(),
  //       [ernie]: List(),
  //     })
  //   );
  //   expect(
  //     reducer(collectionsToRemove, {
  //       type: REMOVE_PROJECT,
  //       path,
  //     })
  //       .get('collections')
  //       .filter((v, k) => {
  //         return k.indexOf(path) > -1;
  //       }).size
  //   ).toEqual(0);
  // });
});

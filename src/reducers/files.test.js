import _ from 'lodash';
import reducer, {
  initialState,
  initialStateNative,
  addFile,
  deleteFile,
  removeFileFromCollection,
  archive,
} from './files';
import { getCollectionKey } from 'utils';
import { ADD_FILE, DELETE_FILE, ADD_FILE_TO_COLLECTION } from 'constants/file';

describe('files reducer', () => {
  let path = 'test';

  it('should return the initial state by default', () => {
    expect(reducer(undefined, {})).toEqual(initialStateNative);
  });

  const fileA = {
    id: '1a',
    path_display: '/blah.jpg',
  };
  const fileB = {
    id: '1b',
    path_display: '/blah2.jpg',
  };

  describe('archive', () => {
    it('stores files by their id', () => {
      const result = reducer(undefined, addFile(fileA));

      expect(result.archive[fileA.id]).toEqual(fileA);
    });

    it('updates an existing file', () => {
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

  describe('collections', () => {
    it('does nothing if no collectionId is provided', () => {
      const result = reducer(undefined, addFile({ ...fileA }));
      expect(result.collections).toEqual({});
    });

    it('stores collection items as objects', () => {
      const collectionId = 'pizza';
      const result = reducer(undefined, addFile({ ...fileA, collectionId }));
      const item = result.collections[collectionId][0];
      expect(_.isPlainObject(item)).toBeTruthy();
      expect(item).toHaveProperty('id', fileA.id);
    });

    it('creates a new collection if the collectionId is not known', () => {
      const collectionId = 'pizza';
      const result = reducer(undefined, addFile({ ...fileA, collectionId }));
      expect(result.collections[collectionId]).toEqual([{ id: fileA.id }]);
    });

    it('adds a file to an existing collection', () => {
      const collectionId = 'pizza';
      const result = reducer(
        { collections: { [collectionId]: [{ id: fileA.id }] } },
        addFile({ ...fileB, collectionId })
      );
      expect(result.collections[collectionId]).toEqual([
        { id: fileA.id },
        { id: fileB.id },
      ]);
    });

    it('removes a file from a collection', () => {
      const collectionId = 'pizza';
      const result = reducer(
        {
          collections: {
            [collectionId]: [{ id: fileA.id }, { id: fileB.id }],
          },
        },
        removeFileFromCollection({ ...fileA, collectionId })
      );
      expect(result.collections[collectionId]).toEqual([{ id: fileB.id }]);
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

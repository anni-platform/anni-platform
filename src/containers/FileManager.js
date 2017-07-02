import React, { Component } from "react";
import { connect } from "react-redux";
import { uploadFile, getLink } from "adapters";
// import { Map } from 'immutable';
import {
  deleteFile,
  addFile,
  addFileToCollection,
  updateCollection,
  updateCollectionItem,
  removeCollectionItem
} from "actions";
import AuthManager from "./AuthManager";
import { getCollectionKey } from "utils";

const getImageInfo = src => {
  return new Promise((done, fail) => {
    const img = new Image();
    img.onload = e => {
      done({
        width: img.width,
        height: img.height
      });
    };
    img.src = src;
  });
};

export default function FileManager(WrappedComponent) {
  class Manager extends Component {
    constructor() {
      super();
      this.state = {
        deletedFileIds: []
      };
    }
    uploadFiles = (files, path, collectionId) => {
      this.props.validateAuthentication();
      files.forEach(file => this.addFile(file, path, collectionId));
      return new Promise((resolve, reject) => {
        Promise.all(
          files.map(file => uploadFile(path, file))
        ).then(uploadedFiles => {
          Promise.all(
            uploadedFiles.map(file => getLink(file.path_display))
          ).then(linkedFiles => {
            const processedFiles = uploadedFiles.map((f, i) => {
              const fileMeta = linkedFiles[i];
              fileMeta.url = fileMeta.url.replace(/.$/, "1");
              return { ...f, ...fileMeta };
            });
            processedFiles.forEach(file => {
              if (this.state.deletedFileIds.indexOf(file.name) === -1) {
                this.addFile(file, path, collectionId)
              }    
            });
          });
        });
      });
    }
    addFile = (file, path, collectionId) => {
      if (
        this.props.files.get("archive").has(file.name) &&
        this.props.files.get("archive").get(file.name).url
      ) {
        // TODO: prevent double upload to dropbox if file name matches
        this.props.dispatch(addFileToCollection(file.name, path, collectionId));
      } else {
        const addImage = () => {
          this.props.dispatch(addFile(file, path));
          this.props.dispatch(
            addFileToCollection(file.name, path, collectionId)
          );
        };
        if (file.url) {
          getImageInfo(file.url).then(({ width, height }) => {
            file.width = width;
            file.height = height;
            addImage();
          });
        } else {
          addImage();
        }
      }
    }
    getCollectionFiles = (options) => {
      const key = getCollectionKey(options);
      const files = this.props.files.toJS();
      return files.collections[key]
        ? files.collections[key].map(file => {
            const { id } = file;
            return Object.assign({}, files.archive[id], file);
          })
        : [];
    }

    reorderCollection = (collectionKeyOptions, collection) => {
      this.props.dispatch(
        updateCollection(getCollectionKey(collectionKeyOptions), collection)
      );
    }

    updateCollectionItem = (collectionKeyOptions, index, content) => {
      this.props.dispatch(
        updateCollectionItem(
          getCollectionKey(collectionKeyOptions),
          index,
          content
        )
      );
    }

    removeCollectionItem = (collectionKeyOptions, index, fileName) => {
      this.setState({
        deletedFileIds: this.state.deletedFileIds.concat([fileName])
      });
      this.props.dispatch(
        removeCollectionItem(
          getCollectionKey(collectionKeyOptions),
          index
        )
      );
    }

    removeFileIfUnused = (fileName) => {
      let fileFound = false;
      this.props.files.get("collections").valueSeq().forEach(collection => {
        if (collection.filter(i => i.id === fileName).length === 0) {
          fileFound = true;
        }
      });
      if (!fileFound) {
        this.props.dispatch(deleteFile(fileName));
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...{
            uploadFiles: this.uploadFiles,
            getCollectionFiles: this.getCollectionFiles,
            reorderCollection: this.reorderCollection,
            updateCollectionItem: this.updateCollectionItem,
            removeCollectionItem: this.removeCollectionItem
          }}
        />
      );
    }
  }
  return connect(state => state)(AuthManager(Manager));
}
